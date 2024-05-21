import { Router } from "express";
import{ thInventoryGet, thInventoryPost, thInventoryPut, thInventoryDelete } from "../controllers/thInventory.js"

const router = Router();

//rutas
router.get('/', thInventoryGet);

router.post('/', thInventoryPost);

router.put('/:pk', thInventoryPut);

router.delete('/:pk', thInventoryDelete);


export {router as routerThInventory};