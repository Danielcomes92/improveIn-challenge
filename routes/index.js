const { Router } = require('express')
const router = Router()
const validator = require('../config/valitador')
const passport = require('passport')
const userControllers = require('../controllers/userController')

const {signUp, signIn, loginForced} = userControllers


router.route('/user/signup')
.post(validator, signUp)
router.route('/user/signin')
.post(signIn)

router.route('/user/loginForced')
.get(passport.authenticate('jwt', {session:false}), loginForced)

module.exports = router