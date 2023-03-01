import express from "express";
import bodyParser from "body-parser";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
