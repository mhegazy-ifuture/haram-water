import { Router } from "express";
import { handleIncomingMessage, verifyWebhook } from "./whatsapp.controller.js";

const router = Router();
router.get("/", verifyWebhook);
router.post("/", handleIncomingMessage);
export default router;
