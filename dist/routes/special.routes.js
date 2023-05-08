"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialController_1 = require("../controllers/specialController");
const router = (0, express_1.Router)();
router.get("/getpost", specialController_1.getpost);
router.post("/createpost", specialController_1.createpost);
router.put("/updatepost/:id", specialController_1.updatepost);
router.delete("/deletepost/:id", specialController_1.deletepost);
exports.default = router;
