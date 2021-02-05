const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const request = require('superagent');
import { validJtw } from '../lib'




const host = "http://localhost:4000/api/"


router.get('/signup', (req, res) => {
    res.render('auth/registro')

});
router.get('/signin', (req, res) => {
    res.render('auth/login')

});


router.post('/signin', async(req, res) => {
    const token = await validJtw.getToken(req, res)
    const user = await validJtw.getUser(req, res)
    await validJtw.getRol()
    const rol = validJtw.setRole()

    rol.forEach(element => {
        if (element.name == 'usuario') {
            const roluser = element.name
            request.get(host + `admin/getNews/`, { json: true })
                .set('x-access-token', token)
                .set('Content-Type', 'application/json')
                .end((err, datas) => {
                    if (err) {
                        res.render('/user/view_error')
                    } else {
                        const result = datas.body
                        res.render('admin/noticias/view_noticias', { user, roluser, token, result })
                    }
                })
        } else if (element.name == 'admin') {
            const roladmin = element.name
            res.render('principal', { user, roladmin, token })
        }
    })
});


router.post('/signup', async(req, res) => {
    await validJtw.signup(req, res)
    const user = await validJtw.getUser(req, res)
    const token = await validJtw.getToken(req, res)
    await validJtw.getRol()
    const rol = validJtw.setRole()

    rol.forEach(element => {
        if (element.name == 'usuario') {
            const roluser = element.name
            request.get(host + `admin/getNews/`, { json: true })
                .set('x-access-token', token)
                .set('Content-Type', 'application/json')
                .end((err, datas) => {
                    if (err) {
                        res.render('/user/view_error')
                    } else {
                        const result = datas.body
                        req.flash('success', 'Registro exitoso');
                        res.render('admin/noticias/view_noticias', { user, roluser, token, result })
                    }
                })
        } else if (element.name == 'admin') {
            const roladmin = element.name
            res.render('principal', { user, roladmin, token })
        }
    })

});


module.exports = router;