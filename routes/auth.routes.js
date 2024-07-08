/**
 * POST call to signup
 *
 */

const authController = require("../controllers/auth.controller");
const authMW = require("../middlewares/auth.middleware");
module.exports = (app) => {
  app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup);
};
