import {Router} from 'express'
const router = Router();
import {fn as cont} from '../controller/movie.mjs'

router.get("/",cont.movieList)
router.get("/:id",cont.getMovie)
router.post("/",cont.postMovie);
router.put("/:id",cont.putMovie);
router.delete("/:id",cont.deleteMovie)

export {router}