const express = require("express");
const { singup , signin, signout } = require("../../controller/admin/auth");
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require("../../validators/auth");
const { requireSignin } = require('../../common-middleware') 
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, singup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signout', signout )



module.exports = router;