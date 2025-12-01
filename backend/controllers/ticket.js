
import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.js";

// Create Ticket Controller-------------------------------->
export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString(),
        });

        // Fire Inngest event
        await inngest.send({
            name: "ticket/created",
            data: {
                ticketId: newTicket._id.toString(),
                title,
                description,
                createdBy: req.user._id.toString(),
            },
        });

        return res.status(201).json({
            message: "Ticket created and processing started",
            ticket: newTicket,
        });
    } catch (error) {
        console.error("Error creating ticket", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get ALL tickets (Admin/Moderator/User) ---------------->
export const getTickets = async (req, res) => {
    try {
        const user = req.user;
        let tickets = [];

        if (user.role !== "user") {
            tickets = await Ticket.find({})
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 })
                .lean(); // IMPORTANT to avoid circular JSON
        } else {
            tickets = await Ticket.find({ createdBy: user._id })
                .select("title description status createdAt priority helpfulNotes")
                .sort({ createdAt: -1 })
                .lean(); 
        }

        return res.status(200).json({ tickets });
    } catch (error) {
        console.error("Error fetching tickets", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get single ticket (Admin/Moderator/User) ------------->
export const getTicket = async (req, res) => {
    try {
        const user = req.user;
        let ticket;

        if (user.role !== "user") {
            ticket = await Ticket.findById(req.params.id)
                .populate("assignedTo", ["email", "_id"])
                .lean(); 
        } else {
            ticket = await Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id,
            })
                .select("title description status createdAt priority helpfulNotes assignedTo")
                .lean(); 
        }

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res.status(200).json({ ticket });
    } catch (error) {
        console.error("Error fetching ticket:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
