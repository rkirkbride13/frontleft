import JWT from "jsonwebtoken";
import Token from "../../models/tokens";
import dotenv from "dotenv";
// Load environment variables from a .env file
dotenv.config();

describe("Token", () => {
  it("returns a token containing the user_id", () => {
    // Use Jest's fake timers to set the current time to a specific value
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2023, 2, 3, 11, 37, 0)));
    // Define the user_id and generate a token
    const user_id: string = "123abc";
    const token = Token.jsonwebtoken(user_id);
    // Verify that the token payload contains the correct user_id and timestamp
    const payload = JWT.verify(token, process.env.JWT_SECRET!);
    expect(payload).toEqual({ iat: 1677843420, user_id: "123abc" });
  });
});
