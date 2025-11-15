import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { systemConfig } from "./config/system";
import adminRoutes from "./routes/admin/index.route";

dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "./views");
app.set("view engine", "pug");

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Admin Routes
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});