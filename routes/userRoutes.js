const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  createUser
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",protect,allUsers);
router.post("/",registerUser);
router.post("/register",createUser);
router.post("/login", authUser);
module.exports = router;
