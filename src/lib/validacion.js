const request = require('superagent');
const host = "http://localhost:4000/api/"

let token, user, setRol;


export function getToken(req, res) {
    return new Promise((ok, fail) => {
        request.post(host + 'auth/signin', { json: true, })
            .send({ email: req.body.email, password: req.body.password })
            .end((error, result) => {
                if (error) {
                    fail(error)
                } else {
                    ok(token = result.body.token)
                }
            })
    })
}

export const setToken = () => {
    return token
}



export function signup(req, res) {
    return new Promise((ok, fail) => {
        request.post(host + 'auth/signup', { json: true, })
            .send({
                email: req.body.email,
                password: req.body.password,
                apellidos: req.body.apellidos,
                nombres: req.body.nombres,
                telefono: req.body.telefono
            })
            .end((error, result) => {
                if (error) {
                    fail(error)
                } else {
                    ok(token = result.body.token)
                }
            })
    })
}

export function getUser(req, res) {
    return new Promise((ok, fail) => {
        request.get(host + 'user', { json: true })
            .send({ email: req.body.email })
            .set('x-access-token', token)
            .set('Content-Type', 'application/json')
            .end((error, result) => {
                if (error) {
                    fail(error)
                } else {
                    ok(user = result.body)
                }

            })
    })
}

export const setUser = () => {
    return user
}




export function getRol() {
    let foundRole;
    user.forEach(element => {
        foundRole = element.roles
    })
    return new Promise((ok, fail) => {
        request.get(host + `user/${foundRole}`, { json: true })
            .set('x-access-token', token)
            .set('Content-Type', 'application/json')
            .end((err, role) => {
                if (err) {
                    fail(err)
                } else {
                    ok(setRol = role.body)
                }
            })

    })

}


export const setRole = () => {
    return setRol
}