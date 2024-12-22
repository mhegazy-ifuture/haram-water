//

import { asyncHandler } from "../../utils/errorHandling.js";

// ==================== verifyWebhook ====================
export const verifyWebhook = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { "hub.verify_token": verifyToken, "hub.challenge": challenge } = query;
  const accessToken = "EAAJ123648548nfjnvj ";
  if (challenge && verifyToken && verifyToken === accessToken) {
    if (verifyToken === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      next(new Error("Invalid verify token", { cause: 500 }));
    }
  }
});

// ==================== handleIncomingMessage ====================
export const handleIncomingMessage = asyncHandler(async (req, res, next) => {
  const messages = req.body.entry?.[0]?.changes?.[0]?.value?.messages;
  if (!messages || !messages.length) {
    const { conversation_id } = req.body.entry?.[0]?.changes?.[0]?.value;
    return next(
      new Error("No messages found", { cause: 404, conversation_id })
    );
  }

  const { from, id, type } = messages[0];
  await markMessageAsRead({ messageId: id }).catch((err) =>
    next(new Error(err, { cause: 500 }))
  );
  sendWhatsappMessage({
    message: welcomeMessageTemplate({ recipentNumber: from }),
  }).catch((err) => next(new Error(err, { cause: 500 })));
});
