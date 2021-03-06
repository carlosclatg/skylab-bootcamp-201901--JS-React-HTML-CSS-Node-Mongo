'use strict'

class HomePanel extends Panel {
    constructor() {
        super($(`<section class="home">
    <h2>Welcome, <span class="home__name"></span>!</h2>
    <button class="home__logout">Logout</button>
</section>`))

        const $container = this.$element

        const $title = $container.find('h2')

        const $userSpan = $title.find('span')
        this.__$userSpan__ = $userSpan

        this.__$logoutButton__ = $container.find('button')
    }

    set user(user) {
        this.__$userSpan__.text(user.name)
    }

    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback)
    }
}