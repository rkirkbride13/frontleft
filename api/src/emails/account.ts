import sgMail from "@sendgrid/mail";
import { config } from "dotenv";
// Load environment variables from .env file
config({ path: ".env" });
// Set the SendGrid API key from the environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
// Define a function for sending a welcome email to a new user
const sendWelcomeEmail = (email: string, name: string) => {
  // Use the SendGrid mail API to send an email
  sgMail.send({
    to: email,
    from: process.env.ADMIN_EMAIL!,
    subject: "👾 Thanks for signing up 👾",
    text: `Welcome to frontleft, ${name}!\n\nTo use the app\n - Log in\n - Fill in fields for each artist/DJ\n - Note that date and time should be exact\n - Save them\n - Click the link for each day to see clashfinder\n\nI hope you enjoy it and let me know what you think.`,
  });
};

export default sendWelcomeEmail;
