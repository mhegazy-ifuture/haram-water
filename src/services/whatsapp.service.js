import axios from "axios";

export const markMessageAsRead = async ({ messageId }) =>
  await axios.post(
    process.env.WHATSAPP_BASE_URL,
    {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      },
    }
  );

export const sendWhatsappMessage = async ({ message }) =>
  axios.post(process.env.WHATSAPP_BASE_URL, message, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    },
  });
