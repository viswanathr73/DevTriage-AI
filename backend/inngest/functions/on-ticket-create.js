import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import analyzeTicket from "../../utils/ai.js";

export const onTicketCreated = inngest.createFunction(
    { id: "on-ticket-created", retries: 2 },
    { event: "ticket/created" },
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;

            // Step 1: Fetch ticket
            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId);
                if (!ticketObject) throw new NonRetriableError("Ticket not found");
                console.log("📋 Ticket fetched:", ticketObject.title);
                return ticketObject;
            });

            // Step 2: Update initial status
            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
                console.log(" Ticket status set to TODO");
            });

            // Step 3: AI Processing
            const aiResponse = await step.run("ai-processing", async () => {
                console.log(" Starting AI analysis...");
                const analysis = await analyzeTicket(ticket);

                await Ticket.findByIdAndUpdate(ticket._id, {
                    priority: analysis.priority,
                    helpfulNotes: analysis.helpfulNotes,
                    status: "IN_PROGRESS",
                    relatedSkills: analysis.relatedSkills,
                });

                console.log("AI Analysis complete:", {
                    priority: analysis.priority,
                    skills: analysis.relatedSkills
                });

                return analysis;
            });

            // Step 4: Assign moderator with improved skill matching
            const moderator = await step.run("assign-moderator", async () => {
                const skills = aiResponse.relatedSkills || [];

                console.log(" Searching for moderator with skills:", skills);

                let assignedUser = null;

                if (skills.length > 0) {
                    // Try to find moderator with ANY matching skill (case-insensitive)
                    assignedUser = await User.findOne({
                        role: "moderator",
                        skills: {
                            $in: skills.map(skill => new RegExp(skill, "i"))
                        }
                    });

                    if (assignedUser) {
                        console.log("Moderator found:", assignedUser.email, "Skills:", assignedUser.skills);
                    }
                }

                // Fallback: Find any available moderator
                if (!assignedUser) {
                    console.log(" No skill-matched moderator found, searching for any moderator...");
                    assignedUser = await User.findOne({ role: "moderator" });
                }

                // Final fallback: Assign to admin
                if (!assignedUser) {
                    console.log(" No moderators available, assigning to admin...");
                    assignedUser = await User.findOne({ role: "admin" });
                }

                if (!assignedUser) {
                    console.error(" No moderators or admins found in database!");
                }

                // Update ticket with assignment
                await Ticket.findByIdAndUpdate(ticket._id, {
                    assignedTo: assignedUser?._id || null,
                });

                return assignedUser;
            });

            // Step 5: Send email notification
            await step.run("send-email-notification", async () => {
                if (moderator && moderator.email) {
                    console.log(" Sending email to:", moderator.email);

                    const emailResult = await sendMail({
                        to: moderator.email,
                        subject: `New Ticket Assigned: ${ticket.title}`,
                        text: `
                   Hello ${moderator.name || moderator.email},

                  A new support ticket has been assigned to you:

                   Title: ${ticket.title}
                  Priority: ${aiResponse.priority}
                Skills Required: ${aiResponse.relatedSkills?.join(", ") || "General"}

                Description: ${ticket.description}

                AI Analysis: ${aiResponse.helpfulNotes}

            Please review and respond to this ticket at your earliest convenience.

             Best regards,
            DevTriage AI System
                        `.trim()
                    });

                    if (emailResult.success) {
                        console.log(" Email sent successfully");
                    } else {
                        console.error(" Email failed:", emailResult.error);
                    }
                } else {
                    console.log("No moderator assigned, skipping email");
                }
            });

            console.log(" Ticket processing completed successfully");
            return { success: true };

        } catch (err) {
            console.error(" Error in ticket processing:", err.message);
            console.error(err.stack);
            return { success: false, error: err.message };
        }
    }
);