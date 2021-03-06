'use strict'

const userApi = require('../user-api')

/**
 * Abstraction of business logic.
 */
class Logic {
    constructor(storage = {}) {
        if (typeof storage !== 'object') throw Error(`${storage} is not an Object`)

        this.__storage__ = storage
    }

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname, email, password)
            .then(() => { })
    }

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__storage__.userId = id
                this.__storage__.userApiToken = token
            })
    }

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__storage__.userId
    }

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__storage__.userId = null
        this.__storage__.userApiToken = null
    }

    retrieveUser() {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(({ id, name, surname, username: email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id,
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    }

    // TODO updateUser and removeUser
}

module.exports = Logic