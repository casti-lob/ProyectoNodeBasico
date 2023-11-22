const express = require("express")
const router = express.Router();

//Importamos Controller
const{getMuseum,getMuseums,addMuseum,deleteMuseum,updateMuseum}= require('../controllers/museum')

//Validaciones
const{check}= require('express-validator')
const{validateFields}= require('../middlewares/validate-fields')

router
.route('/')
.get(getMuseums)
.post([
    check('name','El nombre del museo es obligatorio').trim().not().isEmpty(),
    check('name','La longitud del nombre del usuario no puede ser menor de 3 ').isLength({min:2}),
    check('country','El pais del museo es obligatorio').trim().not().isEmpty(),
    check('country','La longitud del pais del usuario no puede ser menor de 4 ').isLength({min:4}),
    check('price', 'El precio no puede ser menor que 1 ').isInt({min:1}),
    check('category','La categoria del museo es obligatorio').trim().not().isEmpty(),
    check('category','La longitud de la categoria del usuario no puede ser menor de 5 ').isLength({min:5}),
    validateFields
],addMuseum)
//validar numero check().isInt({min:0,max:13})
router
.route('/:id')
.get([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],getMuseum)
.delete([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],deleteMuseum)
.put([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('name','El nombre del museo es obligatorio').trim().not().isEmpty(),
    check('name','La longitud del nombre del usuario no puede ser menor de 3 ').isLength({min:2}),
    check('country','El pais del museo es obligatorio').trim().not().isEmpty(),
    check('country','La longitud del pais del usuario no puede ser menor de 4 ').isLength({min:4}),
    check('price', 'El precio no puede ser menor que 1 ').isInt({min:1}),
    check('category','La categoria del museo es obligatorio').trim().not().isEmpty(),
    check('category','La longitud de la categoria del usuario no puede ser menor de 5 ').isLength({min:5}),
    validateFields
],updateMuseum)

module.exports = router