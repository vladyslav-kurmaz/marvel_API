import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'comfirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state')
    }
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(500);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [newComicsEnded, setNewComicsEnded] = useState(false);

    const {clearError, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        clearError()
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('comfirmed'))
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
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })

        return comicsList;
    }


    const styled = process === ('loading' || 'waiting') && ! newComicsLoading ? {'display': 'flex', 'justifyContent': 'center'} : null;
    
    return (
        <div className="comics__list">
            <ul className="comics__grid" style={styled}>

                {setContent(process, () => renderComics(comics), newComicsLoading)}
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