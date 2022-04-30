const express = require("express");
const AuthController = require("./controllers/authController");
const authGuard = require("./middleware/auth-guard");
const router = express.Router();



router.post('/signup', AuthController.createUser);
router.post('/login', AuthController.login);

router.use(authGuard);

router.get('/users', AuthController.getUsers);

module.exports = router;