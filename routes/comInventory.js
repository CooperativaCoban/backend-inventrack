import { Router } from "express";
import{ comInventoryGet, comInventoryPost, comInventoryPut, comInventoryDelete } from "../controllers/comInventory.js"

const router = Router();

//rutas
router.get('/', comInventoryGet);

router.post('/', comInventoryPost);

router.put('/:pk', comInventoryPut);

router.delete('/:pk', comInventoryDelete);


export {router as routerComInventory};