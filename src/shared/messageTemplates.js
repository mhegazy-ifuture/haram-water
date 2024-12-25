export const welcomeMessage = ({ recipentNumber }) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipentNumber,
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: `${recipentNumber} مرحبا بك!`,
      },
      body: {
        text: `مرحبا بك!
هذا هو تطبيق Haram Water للتبرع بمياه السقيا لضيوف بيت الله.هذا هو تطبيق Haram Water للتبرع بمياه السقيا لضيوف بيت الله. نسعى من خلال هذا التطبيق لتمكين المسلمين من المساهمة في تقديم خدمات مائية نوعية للحجاج والمعتمرين. فنحن ندرك أن كل قطرة ماء تُعطى تستحق التقدير، لأنها تعكس كرم الضيافة الإسلامية وتعين على أداء الشعائر بكل يسر وسهولة. 

مزايا التطبيق تشمل سهولة الاستخدام، حيث يمكن للمستخدمين التبرع من أي مكان وفي أي وقت، بالإضافة إلى خيارات التبرع المرنة التي تناسب جميع المستويات. يوفر التطبيق أيضًا تحديثات دورية حول كيفية تأثير تبرعاتهم على الحجاج والعمرة، مما يخلق إحساسًا بالترابط والمشاركة في هذا العمل الخيري العظيم.

انضموا إلينا في تعزيز ثقافة العطاء، ولنجعل من رحلتنا إلى بيت الله تجربة لا تُنسى للجميع، من خلال توفير مياه الشرب النقية لكل من يرتاد هذا المكان المقدس. كل تبرع، مهما كان صغيرًا، يمكن أن يحدث فارقًا كبيرًا في حياة الآخرين. لنكن جميعًا جزءًا من هذه المبادرة المباركة!`,
      },
      footer: {
        text: "اختار جهة التبرع",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "al-msajed-al-haram",
              title: "المسجد الحرام",
            },
          },
          {
            type: "reply",
            reply: {
              id: "al-msajed-al-nabawi",
              title: "المسجد النبوي",
            },
          },
        ],
      },
    },
  });
};

export const DonationAmount = ({ recipentNumber }) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipentNumber,
    type: "interactive",
    interactive: {
      type: "list",
      body: {
        text: "اختار الكمية",
      },
      action: {
        button: "تحديد الكمية",
        sections: [
          {
            title: "عدد الكراتين",
            rows: [
              { id: "1", title: "1 كرتونه", description: "10 ريال" },
              {
                id: "2",
                title: "2 كرتونات",
                description: "20 ريال",
              },
              {
                id: "3",
                title: "3 كرتونات",
                description: "30 ريال",
              },
              {
                id: "4",
                title: "4 كرتونات",
                description: "40 ريال",
              },
            ],
          },
        ],
      },
    },
  });
};

export const DonationConfirmation = ({ recipentNumber }) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipentNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "تأكيد التبرع",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "yes",
              title: "نعم",
            },
          },
          {
            type: "reply",
            reply: {
              id: "no",
              title: "لا",
            },
          },
        ],
      },
    },
  });
};

export const paymentConfirmation = ({
  recipentNumber,
  price,
  destination,
  amount,
}) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipentNumber,
    type: "text",
    text: {
      preview_url: true,
      body: `لقد تبرعت بمبلغ ${price} ريال لتوفير ${amount} كرتونة مياه السقيا للحجاج في ${destination}. شكرًا لك على مساهمتك في هذا العمل الخيري العظيم!`,
    },
  });
};
