//

import {
  markMessageAsRead,
  sendWhatsappMessage,
} from "../../services/whatsapp.service.js";
import {
  DonationAmount,
  DonationConfirmation,
  notifyForChoosePlace,
  paymentConfirmation,
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

  await markMessageAsRead({ messageId: id }).catch((err) => {
    next(new Error("Failed to mark message as read", { cause: 500, err }));
  });

  switch (type) {
    case "text":
      await sendWhatsappMessage({
        message: welcomeMessage({ recipentNumber: from }),
      }).catch((err) => {
        next(new Error(err.response.data, { cause: 500, err }));
      });
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
          userSessions[from] = {
            ...userSessions[from],
            donationDestination,
          };
          console.log(userSessions[from]);
          await sendWhatsappMessage({
            message: DonationAmount({ recipentNumber: from }),
          }).catch((err) => {
            next(new Error(err.response.data, { cause: 500, err }));
          });
          break;

        case "list_reply":
          const { id, title: donationAmountCartoons, description } = list_reply;
          userSessions[from] = {
            ...userSessions[from],
            donationAmountCartoons,
            donationPrice: parseInt(description),
          };
          if (!userSessions[from].donationDestination) {
            await sendWhatsappMessage({
              message: notifyForChoosePlace({ recipentNumber: from }),
            }).catch((err) => {
              next(new Error(err.response.data, { cause: 500, err }));
            });
            delete userSessions[from];
            return res.status(200).send("Message received");
          }
          await sendWhatsappMessage({
            message: paymentConfirmation({
              recipentNumber: from,
              price: userSessions[from].donationPrice,
              amount: userSessions[from].donationAmountCartoons,
              destination: userSessions[from].donationDestination,
            }),
          }).catch((err) => {
            next(new Error(err.response.data, { cause: 500, err }));
          });
          delete userSessions[from];
          break;
      }
  }

  res.status(200).send("Message received");
});
