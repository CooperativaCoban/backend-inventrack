import { Router } from "express";
import { postGet, postPost, postPut, postDelete  } from "../controllers/post.js"
const router = Router();

//rutas
router.get('/', postGet);

router.post('/', postPost);

router.put('/:pk', postPut);

router.delete('/:pk', postDelete);


export {router as routerPost};