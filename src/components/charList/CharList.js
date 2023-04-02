import React, { Component } from 'react';
import PropTypes from 'prop-types'; 


import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }


    marvelServis = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onCharactersLoaded = (newChars) => {
        let ended = false;

        if (newChars.length < 9) {
            ended = true;
        }

        this.setState(({characters, offset}) => ({
                characters: [...characters, ...newChars],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }))
    }

    onError = () => {
        this.setState({
                loading: false,
                error: true
            }
        );
    }

    onRequest = (offset) => {
        this.onCharLoading();
        this.marvelServis
            .getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }

    onCharLoading() {
        this.setState({
            newItemLoading: true
        })
    }

    addNewCharacters = () => {
        let offset = this.state.offset + 9;

        this.onRequest(offset)

        this.setState({
            offset: offset 
        })

    }


    charRef = [];    

    setCharRef = (el) => {
        console.log(el);
        this.charRef.push(el);
    }

    onFocusItem = (id) => {

       this.charRef.forEach(elem => elem.classList.remove('char__item_selected'));
       this.charRef[id].classList.add('char__item_selected');
       this.charRef[id].focus();
    }

    renderItems = (arr) => {
        const items =  arr.map((item, i) => {

            let style = item.thumbnail.indexOf('image_not_available.jpg') > -1 ? {'objectFit': 'unset'} : {'objectFit': 'cover'};
    
            return (
                <li className="char__item" 
                    ref={this.setCharRef}
                    tabIndex={0}
                    key={item.id} 
                    onClick={() => {
                        this.props.selectChar(item.id);
                        this.onFocusItem(i)
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.selectChar(item.id);
                            this.focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} style={style} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {characters, loading, error, offset, newItemLoading, charEnded} = this.state;
        const items = this.renderItems(characters);
        const spiner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? items : null;
        const styled = (loading || error) ? {'display': 'flex', 'justifyContent': 'center'} : null;

        return (
            <div className="char__list">
                <ul className="char__grid" style={styled}>
                    {errorMessage}
                    {spiner}
                    {content}

                </ul>
                <button className="button button__main button__long"
                        onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired
}

export default CharList;