import { Router } from "express";
import{ collaboratorGet, collaboratorPost, collaboratorPut, collaboratorDelete } from "../controllers/collaborator.js"

const router = Router();

//rutas
router.get('/', collaboratorGet);

router.post('/', collaboratorPost);

router.put('/:pk', collaboratorPut);

router.delete('/:pk', collaboratorDelete);


export {router as routerCollaborator};