import { Router } from "express";
import{ comReportGet, comReportPost, comReportPut, comReportDelete } from "../controllers/comReport.js"

const router = Router();

//rutas
router.get('/', comReportGet);

router.post('/', comReportPost);

router.put('/:pk', comReportPut);

router.delete('/:pk', comReportDelete);


export {router as routerComReport};