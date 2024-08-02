import { Router } from "express";
import{ countReportGet, countReportPost, countReportPut, countReportDelete } from "../controllers/countReport.js"

const router = Router();

//rutas
router.get('/', countReportGet);

router.post('/', countReportPost);

router.put('/:pk', countReportPut);

router.delete('/:pk', countReportDelete);


export {router as routerCountReport};