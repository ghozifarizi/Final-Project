const express = require("express");
const userHandler = require('../handlers/user_handler');
const roleHandler = require('../handlers/role_handler');
const itemHandler = require('../handlers/item_handler');
const customerHandler = require('../handlers/customer_handler');  
const transactionHandler = require('../handlers/transaction_handler');
const jwtAuth = require('../middlewares/jwt');
const { authenticatePassportJwt} = require('../middlewares/passport-jwt');



// Create a router
const router = express.Router();

// User routes
router.post("/user/login", userHandler.login);
router.post("/user/register", userHandler.register);
router.get("/user", userHandler.getList);
router.get("/user/:id", userHandler.getOneByUserId);
router.put("/user/:id", userHandler.updateOne);
router.delete("/user/:id", userHandler.deleteOne);

// Role routes
router.post("/role", roleHandler.create);
router.get("/role", roleHandler.getList);
router.put("/role/:id", roleHandler.updateOne);
router.delete("/role/:id", roleHandler.deleteOne);

// item routes
router.post("/item", itemHandler.create);
router.get("/item", itemHandler.getList);
router.put("/item/:id", itemHandler.updateOne);
router.delete("/item/:id", itemHandler.deleteOne);

// Customer routes
router.post("/customer", customerHandler.create);
router.get("/customer", customerHandler.getList);
router.get("/customer/:id", customerHandler.getOneByCustomerId);
router.put("/customer/:id", customerHandler.updateOne);
router.delete("/customer/:id", customerHandler.deleteOne);

// Transaction routes 
router.post("/transaction", jwtAuth, transactionHandler.create);
router.get("/transaction", transactionHandler.getList);
router.get("/transaction/:id", authenticatePassportJwt(), transactionHandler.getOneByOrderId);
router.put("/transaction/:id", authenticatePassportJwt(), transactionHandler.updateOne);
router.delete("/transaction/:id", authenticatePassportJwt(), transactionHandler.deleteOne);


module.exports = router;