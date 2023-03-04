import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
import actsRouter from "./routes/acts";
import usersRouter from "./routes/users";
import tokensRouter from "./routes/tokens";
import JWT, { JwtPayload } from "jsonwebtoken";

config({ path: "./config.env" });
const app: Express = express();
app.use(cors());
app.use(express.json());

// token middleware
const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }
  
  if (token) {
    const payload = JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.body.user_id = payload.user_id
    next()
  } else {
    res.status(401).json({ message: "Auth error" })
  }
};
// const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   const authHeader = req.get("Authorization");

//   if (authHeader) {
//     token = authHeader.slice(7);
//   }

//   JWT.verify(token as string, process.env.JWT_SECRET as string, (error: any, payload: any) => {
//     if (error) {
//       console.log(error);
//       res.status(401).json({ message: "auth error" });
//     } else {
//       req.body.user_id = payload.user_id;
//       next();
//     }
//   });
// };

app.use("/acts", tokenChecker, actsRouter);
app.use("/users", usersRouter);
app.use("/tokens", tokensRouter);

export { app };
