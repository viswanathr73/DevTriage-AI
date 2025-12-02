
import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: parseInt(process.env.MAILTRAP_SMTP_PORT),
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"DevTriage AI" <no-reply@devtriage.ai>',
      to: to,
      subject,
      text,
    });

    console.log(" Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(" Email failed:", error.message);
    return { success: false, error: error.message };
  }
};