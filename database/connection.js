import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";
import { initRole } from "../models/index.js";
import { initUser } from "../models/index.js";
import { initCollaborator } from "../models/index.js";
import { initCountInventory } from "../models/index.js";
import { initComInventory } from "../models/index.js";
import { initThInventory } from "../models/index.js";



// Creación de una nueva instancia de Sequelize para la conexión a la base de datos
const db = new Sequelize(process.env.BD, process.env.USER, process.env.PASS, {
  host: process.env.HOST,
  dialect: "mysql",
   port: process.env.PORTA,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
  // logging: false;
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Inicialización de los modelos de la base de datos

const Role = initRole(db,DataTypes)
const User = initUser(db,DataTypes)
const Collaborator = initCollaborator(db,DataTypes)
const countInventory = initCountInventory(db,DataTypes)
const comInventory = initComInventory(db,DataTypes)
const thInventory = initThInventory(db,DataTypes)



//llave primaria de rol a llave foranea de usuario
User.belongsTo(Role, { foreignKey: "pk_role" }); // un usuario puede tener un rol
Role.hasMany(User, { foreignKey: "pk_role" }); // un rol puede tener varios usuarios

export { db };
