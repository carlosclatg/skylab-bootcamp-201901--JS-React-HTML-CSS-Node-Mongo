import React, { Component, Fragment } from "react";
import pokemonApi from "../../apipokemon";
import './index.sass'
import ItemResult from "../ItemResult";


class PokemonSearch extends Component {
  state = { pokemons: [], searchText: '', loading: true };

  componentDidMount() {
    pokemonApi.searchAllPokemons().then(pokemons => {
      this.setState({ pokemons, loading: false, searchText:this.props.searchText })
    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
    this.props.setSearchTextApp(event.target.value);

  };

  renderList = () => {
    const {props : {onPokemonDetail}} = this
    
    return <ul className='pokemon__ul'>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.state.searchText))
          .map(pokemon => <ItemResult stringPokemonId = {pokemon.url} pokemonName={pokemon.name} onGoToDetails={onPokemonDetail} />)
      }
    </ul>

    }

  render() {

    
    return (
      <div className='searchPanel'>
        {/* <img src={titleImage} alt="poke_title"></img> */}
        <h2 className='title__search'>Search Pokemon</h2>
        
          <input className="input__searchPokemon"
            onChange={this.handleChange}
            type="text"
            placeholder="Search your Pokemon by name"
            value={this.state.searchText}
          />
          {
            this.state.loading && <h1>LOADING</h1>
          }
          {
            this.props.searchText !== "" && this.renderList()
          }

      </div>
    );
  }
}

export default PokemonSearch;
