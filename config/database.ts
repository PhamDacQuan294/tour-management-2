import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // Tên database
  process.env.DATABASE_USERNAME, // Username đăng nhập
  process.env.DATABASE_PASSWORD, // Mật khẩu
  {
    host: process.env.DATABASE_HOST, // Link hosting database
    port: 3306,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect Success!");
  })
  .catch((error) => {
    console.error("Connect Error: ", error);
  });

export default sequelize;