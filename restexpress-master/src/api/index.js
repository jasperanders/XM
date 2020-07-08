import { Router } from "express";
import { env, mongo, port, ip, apiRoot } from "~/config";
import { doorman } from "~/services/auth/guard";
/* ENDPOINT_ROUTER_IMPORT */
import auth from "./auth";
import verification from "./verification";
import passwordReset from "./password-reset";
import user, { User } from "./user";
import message, { Message } from "./message";
import exam from "./exam";

const router = new Router();

/* ENDPOINT_ROUTER_EXPORT */
router.use("/auth", auth);
router.use("/verification", verification);
router.use("/users", user);
router.use("/messages", message);
router.use("/password-reset", passwordReset);
router.use("/exam", exam);

// Export the relevant models for swagger documentation
export const Models = [
  /* ENDPOINT_DOCS_EXPORT */
  User,
  Message,
];

// Export router for Express Server
export default router;
