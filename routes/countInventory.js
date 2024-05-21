import { Router } from "express";
import{ countInventoryGet, countInventoryPost, countInventoryPut, countInventoryDelete } from "../controllers/countInventory.js"

const router = Router();

//rutas
router.get('/', countInventoryGet);

router.post('/', countInventoryPost);

router.put('/:pk', countInventoryPut);

router.delete('/:pk', countInventoryDelete);


export {router as routerCountInventory};