import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
import actsRouter from "./routes/acts";
import usersRouter from "./routes/users";
import tokensRouter from "./routes/tokens";
import picturesRouter from "./routes/pictures";
import JWT, { JwtPayload } from "jsonwebtoken";

config({ path: "./config.env" });
const app: Express = express();
// Middleware for enabling cross-origin resource sharing
app.use(cors());
// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for checking and verifying tokens
const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  const authHeader = req.get("Authorization");
  if (authHeader) {
    // Extracting the token from the Authorization header
    token = authHeader.slice(7);
  }
  if (token) {
    // Verifying the token and extracting its payload
    const payload = JWT.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // Attaching the user_id extracted from the token payload to the request object
    req.body.user_id = payload.user_id;
    next();
  } else {
    res.status(400).json({ message: "Auth error" });
  }
};

// App routes
// Use tokenChecker middleware for the "acts" and "pictures" routes
app.use("/acts", tokenChecker, actsRouter);
app.use("/users", usersRouter);
app.use("/tokens", tokensRouter);
app.use("/pictures", tokenChecker, picturesRouter);

export { app };
