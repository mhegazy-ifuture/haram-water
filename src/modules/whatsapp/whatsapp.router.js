import { Router } from "express";
import { verifyWebhook } from "./whatsapp.controller";

const router = Router();
router.get("/", verifyWebhook);
router.post("/", verifyWebhook);
export default router;
