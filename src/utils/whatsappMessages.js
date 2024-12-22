export const welcomeMessageTemplate = ({ recipentNumber }) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipentNumber,
    type: "template",
    template: {
      name: "haram_water_welcome",
      language: {
        code: "ar",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: recipentNumber,
            },
          ],
        },
      ],
    },
  });
};
