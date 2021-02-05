const express = require('express');
const router = express.Router();
import * as data from "../lib/validacion";
const request = require('superagent');
const host = "http://localhost:4000/api/"




router.get('/', async(req, res) => {
    const token = data.setToken()
    const user = data.setUser()



    user.forEach(element => {

        if (element.roles == '601393fd23846c55e0e32cff') {
            const roluser = element.roles
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

        } else if (element.roles == '601393fd23846c55e0e32cfe') {
            const roladmin = element.roles
            request.get(host + `admin/getNews/`, { json: true })
                .set('x-access-token', token)
                .set('Content-Type', 'application/json')
                .end((err, datas) => {
                    if (err) {
                        res.render('/user/view_error')

                    } else {

                        const result = datas.body
                        res.render('admin/noticias/view_noticias', { user, roladmin, token, result })
                    }
                })

        }
    })
});




router.post('/crearNews/:idUser', async(req, res) => {
    const idUser = req.params.idUser
    const token = data.setToken()
    request.post(host + `user/createNew/${idUser}`, { json: true, })
        .send({ titulo: req.body.titulo, contenido: req.body.descripcion })
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .end(res.redirect('/noticias/crearNews/'))
})


router.get('/crearNews/', async(req, res) => {
    const token = data.setToken()
    const user = data.setUser()
    user.forEach(element => {
        if (element.roles == '601393fd23846c55e0e32cff') {
            const roluser = element.roles
            res.render('admin/noticias/view_crearNews', { user, roluser, token })
        } else if (element.roles == '601393fd23846c55e0e32cfe') {
            const roladmin = element.roles
            res.render('admin/noticias/view_crearNews', { user, roladmin, token })
        }
    })
});



router.get('/getNews/', async(req, res) => {

    const token = data.setToken()
    const user = data.setUser()
    user.forEach(element => {
        if (element.roles == '601393fd23846c55e0e32cff') {
            const roluser = element.roles
            request.get(host + `user/getNews/${element._id}`, { json: true })
                .set('x-access-token', token)
                .set('Content-Type', 'application/json')
                .end((err, datas) => {
                    if (err) {
                        res.render('/user/view_error')
                    } else {

                        const result = datas.body
                        res.render('admin/noticias/view_myNews', { user, roluser, token, result })
                    }
                })

        } else if (element.roles == '601393fd23846c55e0e32cfe') {
            const roladmin = element.roles

            request.get(host + `user/getNews/${element._id}`, { json: true })
                .set('x-access-token', token)
                .set('Content-Type', 'application/json')
                .end((err, datas) => {
                    if (err) {
                        res.render('/user/view_error')
                    } else {

                        const result = datas.body
                        res.render('admin/noticias/view_myNews', { user, roladmin, token, result })
                    }
                })

        }
    })
});

router.get('/eliminarNews/:idNews', async(req, res) => {
    const { idNews } = req.params;

    const token = data.setToken()
    request.delete(host + `user/deleteNews/${idNews}`, { json: true })
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .end(res.redirect('/noticias/getNews/'))
});



router.post('/editNews/:idNews', async(req, res) => {


    const user = data.setUser()
    user.forEach(element => {

        const token = data.setToken()
        request.put(host + `user/editNew/${element._id}&${req.params.idNews}`, { json: true, })
            .send({
                titulo: req.body.titulo,
                contenido: req.body.contenido,
            })
            .set('x-access-token', token)
            .set('Content-Type', 'application/json')
            .end(res.redirect('/noticias/getNews/'))
    });
})
module.exports = router;