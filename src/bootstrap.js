import { whatsappRouter } from "./modules/index.js";
import { globalResponseHandler } from "./utils/errorHandling.js";
const bootstrap = (app, express) => {
  // Middleware setup
  app.use(express.json());

  // Define routes
  app.get("/", (req, res) => {
    res.send("Hello World from Bootstrap!");
  });
  // Add more routes or middleware here
  app.use("/webhook", whatsappRouter);

  app.use(globalResponseHandler);
};

export default bootstrap;
