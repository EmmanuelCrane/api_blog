import { Router } from "express";
import {
  getpost,
  createpost,
  updatepost,
  deletepost,
} from "../controllers/specialController";

const router = Router();

router.get("/getpost", getpost);
router.post("/createpost", createpost);
router.put("/updatepost/:id", updatepost);
router.delete("/deletepost/:id", deletepost);

export default router;