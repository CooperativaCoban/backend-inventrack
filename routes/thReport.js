import { Router } from "express";
import{ thReportGet, thReportPost, thReportPut, thReportDelete } from "../controllers/thReport.js"

const router = Router();

//rutas
router.get('/', thReportGet);

router.post('/', thReportPost);

router.put('/:pk', thReportPut);

router.delete('/:pk', thReportDelete);


export {router as routerThReport};