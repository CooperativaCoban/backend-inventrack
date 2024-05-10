import { db } from "../database/connection.js";
import { Role } from "./Role.js";


(async () => {

    await Role.sync();
 /*    await Appoinment.sync({ force: true });
    await LivingPlace.sync();
    await Patient.sync();
    await User.sync();
    await UserPatient.sync();  */

    await db.sync({ force: true});
  
  console.log("Database migrated successfully");
})();
