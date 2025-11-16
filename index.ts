import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { systemConfig } from "./config/system";
import adminRoutes from "./routes/admin/index.route";
import path from "path";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000

app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser('KSOSAOQWPQWPQW'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Admin Routes
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});