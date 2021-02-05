const express = require('express');
const router = express.Router();
import * as data from "../lib/validacion";
const request = require('superagent');
const host = "http://localhost:4000/api/"


router.get('/', (req, res) => {
    const token = data.setToken()
    const user = data.setUser()
    user.forEach(element => {
        if (element.roles == '601393fd23846c55e0e32cff') {
            const roluser = element._id
            res.render('usuario/view_principal', { user, roluser, token })
        } else if (element.roles == '601393fd23846c55e0e32cfe') {
            const roladmin = element._id
            res.render('usuario/view_principal', { user, roladmin, token })

        }
    })




});

router.post('/modificar/:idUser', async(req, res) => {
    const { idUser } = req.params;
    const token = data.setToken()
    request.put(host + `user/${idUser}`, { json: true, })
        .send({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
        })
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .end(res.redirect('/user/'))
})



module.exports = router;