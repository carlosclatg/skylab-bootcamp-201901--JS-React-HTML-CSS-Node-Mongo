'use strict'

import React, { Component } from 'react';
import { HashRouter, Route, withRouter} from 'react-router-dom';
import './index.sass';
import Search from '../Search';
import CharactersResults from '../CharactersResults'
import CharacterInfoResult from '../CharacterInfoResult'
import ComicInfoResult from '../ComicInfoResult'
import Favourites from '../Favourites'
import logic from '../Logic';

class Home extends Component {

    state = {characterId: null, comicId: null}

    handleSearch = query => this.props.history.push(`/home/search/${query}`)

    handleCharacterSelected = id => {
        this.setState({
            characterId: id
        }, () => this.props.history.push(`/home/search/character/${id}`))
    }

    handleComicSelected = id => {
        this.setState({
            comicId: id
        }, () => this.props.history.push(`/home/search/comic/${id}`))
    }

    handleToHome = () => { this.props.history.push('/home/search/')}

    handleToFavourites = (event) => { 
        event.preventDefault()
        this.props.history.push('/home/search/favourites/')}

    handleToUser = () => { this.props.history.push('/home/user/')}

    handleLogOut = () => { 
       console.log('log out')
    }
    
    handleItemChosen = id => {
        this.setState({
            characterId: id
        }, () => this.props.history.push(`/home/search/character/${id}`))
    }

    render() {

        const { handleSearch, handleCharacterSelected, handleComicSelected, handleToHome, handleToFavourites, handleToUser, handleLogOut, state: {getFavourites} } = this

        return <HashRouter>
        <section>
            <nav className="header level">
                <p className="level-item has-text-centered">
                    <a onClick={handleToHome} href="#" className="link is-info">Home</a>
                </p>
                <p className="level-item has-text-centered">
                    <a onClick={(event) =>  handleToFavourites(event)} href="#" className="link is-info">Favourites</a>
                </p>
                <p className="level-item has-text-centered">
                    <img src="http://assets.stickpng.com/thumbs/585f9333cb11b227491c3581.png" alt="" className="header__logo"/>
                </p>
                <p className="level-item has-text-centered">
                    <a onClick={handleToUser} href="#" className="link is-info">Reservations</a>
                </p>
                <p className="level-item has-text-centered">
                    <a onClick={handleLogOut} href="#" className="link is-info">Log out</a>
                </p>
            </nav>
            <Search onSearch={handleSearch}/>
            <Route exact path="/home/search/:query" render={props => <CharactersResults query={props.match.params.query} onCharacterSelected={handleCharacterSelected} />} />
            <Route exact path="/home/search/character/:id" render={props => <CharacterInfoResult id={props.match.params.id} onComicSelected={handleComicSelected} />} />
            <Route exact path="/home/search/comic/:id" render={props => <ComicInfoResult id={props.match.params.id} onCharacterSelected={handleCharacterSelected} />} />
            <Route exact path="/home/search/favourites/" render={props => <Favourites getFavourites={getFavourites} onClick={handleToFavourites} />} />
        </section>
    </HashRouter>
    }
}

export default withRouter(Home);