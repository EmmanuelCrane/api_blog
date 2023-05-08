import { Router } from "express";
import { singIn, singUp} from "../controllers/userController";

const router = Router();

router.post('/signup', singUp);
router.post('/signin', singIn);

export default router;