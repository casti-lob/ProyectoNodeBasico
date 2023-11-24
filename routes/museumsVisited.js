const express = require("express")
const router = express.Router();

//Importamos Controller
const{getMuseumsV,addMuseumV,deleteMuseumV,getMuseumV,updateMuseumV}= require('../controllers/museumsVisited')

//Validaciones
const{check}= require('express-validator')
const{validateFields}= require('../middlewares/validate-fields');
const { existsUser, existsMuseum } = require("../helpers/db-validators");

router
.route('/')
.get(getMuseumsV)
.post([
    check('idUser','No es un id de Mongo válido').isMongoId(),
    check('idUser').custom(existsUser),
    check('idMuseum','No es un id de Mongo válido').isMongoId(),
    check('idMuseum').custom(existsMuseum),
    check('valuation','La nota tiene que estar entre 0 y 10').isInt({min:0,max:10}),
    check('comentary','El comentario tiene que estar entre 5 y 100 de longitud').isLength({min:5,max:100}),
    validateFields
],addMuseumV)
//validar numero check().isInt({min:0,max:13})
router
.route('/:id')
.get([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],getMuseumV)
.delete([
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
],deleteMuseumV)
.put([
    check('idUser','No es un id de Mongo válido').isMongoId(),
    check('idUser').custom(existsUser),
    check('idMuseum','No es un id de Mongo válido').isMongoId(),
    check('idMuseum').custom(existsMuseum),
    check('valuation','La nota tiene que estar entre 0 y 10').isInt({min:0,max:10}),
    check('comentary','El comentario tiene que estar entre 5 y 100 de longitud').isLength({min:5,max:100}),
    validateFields
],updateMuseumV)

module.exports = router