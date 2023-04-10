import {useState, useEffect, useCallback } from 'react';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(500);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [newComicsEnded, setNewComicsEnded] = useState(false);

    const {loading, error, clearError, getComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        clearError()
        getComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;

        if (newComics.length < 8) {
           ended = true;
        }

        setComics(comics => [...comics, ...newComics])
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
        setNewComicsEnded(ended);

    }

    const renderComics = (comics) => {
        const comicsList = comics.map(({id, name, price, thumbnail}, i) => {
            return (
                
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{`${price}$`}</div>
                    </a>
                </li>
            )
        })

        return comicsList;
    }

    const comicsList = renderComics(comics);
    const spiner = loading && !newComicsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const styled = (loading || error) ? {'display': 'flex', 'justifyContent': 'center'} : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid" style={spiner ? styled : null}>
                {errorMessage}
                {spiner}
                {comicsList}
            </ul>
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newComicsLoading}
                    style={{'display': newComicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;