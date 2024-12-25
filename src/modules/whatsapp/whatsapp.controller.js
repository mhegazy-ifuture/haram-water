//

import {
  markMessageAsRead,
  sendWhatsappMessage,
} from "../../services/whatsapp.service.js";
import {
  DonationAmount,
  DonationConfirmation,
  welcomeMessage,
} from "../../shared/messageTemplates.js";
import { asyncHandler } from "../../utils/errorHandling.js";

// =================== user sessions ===================
const userSessions = {};
// ==================== verifyWebhook ====================
export const verifyWebhook = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { "hub.verify_token": verifyToken, "hub.challenge": challenge } = query;
  const accessToken = "RTQWWTVHBDS32145698741258963";

  if (challenge && verifyToken && verifyToken === accessToken) {
    res.status(200).send(challenge);
  } else {
    next(new Error("Failed to verify token", { cause: 500 }));
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

  const [{ from, id, type }] = messages;

  markMessageAsRead({ messageId: id }).catch((err) =>
    next(new Error(err, { cause: 500 }))
  );

  switch (type) {
    case "text":
      sendWhatsappMessage({
        message: welcomeMessage({ recipentNumber: from }),
      }).catch((err) => next(new Error(err, { cause: 500 })));
      break;

    case "interactive":
      const {
        type: interactiveType,
        button_reply,
        list_reply,
      } = messages[0].interactive;

      switch (interactiveType) {
        case "button_reply":
          const { id: buttonReplyId, title: donationDestination } =
            button_reply;
          userSessions[from] = { donationDestination };

          sendWhatsappMessage({
            message: DonationAmount({ recipentNumber: from }),
          }).catch((err) => next(new Error(err, { cause: 500 })));
          break;

        case "list_reply":
          const { id, title: donationAmountCartoons, description } = list_reply;
          userSessions[from] = {
            donationAmountCartoons,
            donationPrice: parseInt(description),
          };

          sendWhatsappMessage({
            message: DonationConfirmation({ recipentNumber: from }),
          }).catch((err) => next(new Error(err, { cause: 500 })));
          break;
      }
  }
});
