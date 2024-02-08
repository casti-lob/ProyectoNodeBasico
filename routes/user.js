const express = require("express")
const router = express.Router();

//Importamos Controller
const{getUsers, addUsers, getUser, deleteUser, updateUser}= require('../controllers/user')

//Validaciones
const{check}= require('express-validator')
const{validateFields}= require('../middlewares/validate-fields');

const { existsEmail, existsUserName, rolValid, } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { hasRoles } = require("../middlewares/hasRole");


router
.route('/')
.get(getUsers)
.post([
    check('name','El nombre del usuario es obligatorio').trim().not().isEmpty(),
    check('name','La longitud del nombre del usuario no puede ser menor de 2 o mayor de 20').isLength({min:2, max:20}),
    check('userName','El nombre de usuario es requerido').trim().not().isEmpty(),
    check('age', 'Tienes que tener entre 4 y 100 años para aceptarte ').isInt({min:4,max:100}),
    check('email','El email es requerido').trim().not().isEmpty(),
    check('email','El email tiene que ser un email valido').isEmail(),
    check('password','La contraseña es requerida').trim().not().isEmpty(),
    //check('rol').custom(rolValid),
    check('email').custom(existsEmail),
    check('userName').custom(existsUserName),
    validateFields
],addUsers)
//validar numero check().isInt({min:0,max:13})
router
.route('/:id')
.get([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],getUser)
.delete([
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],deleteUser)
.put([
    validateJWT,
    hasRoles('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('name','El nombre del usuario es obligatorio').trim().not().isEmpty(),
    check('name','La longitud del nombre del usuario no puede ser menor de 2 o mayor de 20').isLength({min:2, max:20}),
    check('age', 'Tienes que tener entre 4 y 100 años para aceptarte ').isInt({min:4,max:100}),
    check('email','El email es requerido').trim().not().isEmpty(),
    check('password','La contraseña es requerida').trim().not().isEmpty(),
    validateFields
],updateUser)



module.exports = router