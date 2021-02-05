const express = require('express');
const router = express.Router();
const request = require('superagent');
import { validJtw } from "../lib";
const host = "http://localhost:4000/api/"


router.get('/', (req, res) => {
    request.get(host + 'user/getInfo/', { json: true, })
        .end((error, result) => {
            if (error) {
                res.render('/user/view_error')
            } else {
                const data = result.body
                res.render("principal", { data })
            }
        })
});

router.get('/error', (req, res) => {
    res.render('user/view_error')
});

router.post('/', (req, res) => {
    request.post(host + 'user/', { json: true, })
        .send({
            nombre: req.body.nombre,
            contacto: req.body.contacto,
            descripcion: req.body.descripcion
        })
        .end((error, result) => {
            if (error) {
                res.render('/user/view_error')
            } else {
                res.redirect("/")
            }
        })
})


module.exports = router;