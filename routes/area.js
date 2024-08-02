import { Router } from "express";
import { areaGet, areaPost, areaPut, areaDelete  } from "../controllers/area.js"
const router = Router();

//rutas
router.get('/', areaGet);

router.post('/', areaPost);

router.put('/:pk', areaPut);

router.delete('/:pk', areaDelete);


export {router as routerArea};