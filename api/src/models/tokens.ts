import JWT from "jsonwebtoken";
import { config } from "dotenv";
// Load environment variables from a .env file
config({ path: ".env" });
// Retrieve the JWT secret from the environment variables
const secret: string = process.env.JWT_SECRET!;
// Define a class for creating JSON Web Tokens
class Token {
  // A static method for generating a JWT token
  static jsonwebtoken(user_id: string) {
    // Use the JWT library to sign the token payload using the secret key
    return JWT.sign(
      { user_id: user_id, iat: Math.floor(Date.now() / 1000) },
      secret
    );
  }
}

export default Token;
