import { Router } from "express";
import exam from "./exam";
/* ENDPOINT_ROUTER_IMPORT */

const router = Router();

/* ENDPOINT_ROUTER_EXPORT */
router.use("/exam", exam);

// Export router for Express Server
export default router;
