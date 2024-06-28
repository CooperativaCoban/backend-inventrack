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

/* //llave primaria de countInventory a llave foranea de countReport
countInventory.belongsTo(countReport, {foreignKey: "pk_countInventory"}) // un articulo puede tener un  reportes
countReport.hasMany(countInventory, {foreignKey: "pk_countInventory"} ) // un reporte puede tener varios articulos

//llave primaria de usuario a llave foranea de countreport
User.hasMany(countReport, {foreignKey: "pk_user"}) //un usuario puede tener varios reportes
countReport.belongsTo(User, {foreignKey: "pk_user"}) // un reporte puede tener un usuario

//llave primaria de colaborador a llave foranea de CountReport
Collaborator.hasMany(countReport, {foreignKey: "pk_collaborator"}) // un colaborador puede tener varios reportes
countReport.belongsTo(Collaborator, {foreignKey: "pk_collaborator"}) // un reporte puede tener un colaborador */

export { db };
