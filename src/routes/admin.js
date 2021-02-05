const express = require('express');
const router = express.Router();
import * as data from "../lib/validacion";
const request = require('superagent');
const host = "http://localhost:4000/api/"


router.get('/user/', async(req, res) => {
    const token = data.setToken()
    const user = data.setUser()
    user.forEach(element => {
        if (element.roles == 'usuario') {
            const roluser = element._id
        } else if (element.roles == '601393fd23846c55e0e32cfe') {
            const roladmin = element._id
            request.get(host + `admin/`, { json: true })
                .set('x-access-token', token)
                .set('Content-Type', 'application/json')
                .end((err, datas) => {
                    if (err) {
                        res.render('/user/view_error')
                    } else {
                        const result = datas.body
                        res.render('admin/usuarios/view_users', { user, roladmin, token, result })
                    }
                })
        } else {
            res.render('principal')
        }
    })
});



router.get('/user/eliminar/:idUser', async(req, res) => {
    const { idUser } = req.params;
    const token = data.setToken()
    request.delete(host + `admin/${idUser}`, { json: true })
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .end(res.redirect('/admin/user/'))
});

router.post('/user/modificar/:idUser', async(req, res) => {
    const { idUser } = req.params;
    const token = data.setToken()
    request.put(host + `user/${idUser}`, { json: true, })
        .send({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            roles: req.body.roles
        })
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .end(res.redirect('/admin/user/'))
})


router.post('/crearUser/', async(req, res) => {
    const token = data.setToken()

    request.post(host + 'admin/', { json: true, })
        .send({ email: req.body.email, password: req.body.password, nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, roles: req.body.roles })
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .end(res.redirect('/admin/user/'))
})





module.exports = router;