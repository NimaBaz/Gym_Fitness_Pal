const UserController = require('../controllers/users.controllers')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {

    /*
    ! CREATE
    */
    app.post(`/api/register`, UserController.register)
    app.post(`/api/login`, UserController.login)

    /*
    ! READ ONE
    */
    app.get(`/api/logout`, UserController.logout)
    app.get(`/api/user`, UserController.getUser)

    /*
    ! READ ALL
   */
    app.get(`/api/users`, authenticate, UserController.getAllUsers)

    /*
    ! UPDATE
    */
    app.put("/api/users/update/:id", UserController.updateUser)

    /*
    ! DELETE
    */
    app.delete("/api/users/delete/:id", UserController.deleteUser)

}