import sgMail from "@sendgrid/mail";
import { config } from "dotenv";
config({ path: ".env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const sendWelcomeEmail = (email: string, name: string) => {
  sgMail.send({
    to: email,
    from: process.env.ADMIN_EMAIL!,
    subject: "👾 Thanks for signing up 👾",
    text: `Welcome to frontleft, ${name}!\n\nTo use the app\n - log in\n - fill in fields for each artist/DJ\n - note that date and time should be exact\n - save them and click underlined days to see clashfinder\n\nI hope you enjoy it and let me know what you think.`,
  });
};

export default sendWelcomeEmail;
