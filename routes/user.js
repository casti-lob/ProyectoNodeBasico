const express = require("express")
const router = express.Router();

//Importamos Controller
const{getUsers, addUsers, getUser}= require('../controllers/user')

//Validaciones
const{check}= require('express-validator')
const{validateFields}= require('../middlewares/validate-fields')


router
.route('/')
.get(getUsers)
.post([
    check('name','El nombre del usuario es obligatorio').trim().not().isEmpty(),
    check('name','La longitud del nombre del usuario no puede ser menor de 2 o mayor de 20').isLength({min:2, max:20}),
    check('age', 'Tienes que tener entre 4 y 100 años para aceptarte ').isInt({min:4,max:100})

],addUsers)
//validar numero check().isInt({min:0,max:13})
router
.route('/:id')
.get([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],getUser)

module.exports = router