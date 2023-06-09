import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; 

// import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return  newItemLoading ? <Component/> : <Spinner/>;
        case 'comfirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = (props) => {

    const [characters, setCharacters] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

   
    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onCharactersLoaded = (newChars) => {
        let ended = false;

        if (newChars.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newChars]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharactersLoaded)
            .then(() => setProcess('comfirmed'))

    }

    const charRef = useRef([]);    

    const onFocusItem = (id) => {
       charRef.current.forEach(elem => elem.classList.remove('char__item_selected'));
       charRef.current[id].classList.add('char__item_selected');
       charRef.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {

            let style = item.thumbnail.indexOf('image_not_available.jpg') > -1 ? {'objectFit': 'unset'} : {'objectFit': 'cover'};
    
            return (
                <li className="char__item" 
                    ref={el => charRef.current[i] = el}
                    tabIndex={0}
                    key={item.id} 
                    onClick={() => {
                        props.selectChar(item.id);
                        onFocusItem(i)
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.selectChar(item.id);
                            onFocusItem(i);
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


        const styled = process === 'wairing' || 'loading' ? {'display': 'flex', 'justifyContent': 'center'} : null;

        return (
            <div className="char__list">
                <ul className="char__grid" style={styled}>
                    {setContent(process, () => renderItems(characters), newItemLoading)}

                </ul>
                <button className="button button__main button__long"
                        onClick={() => onRequest(offset)}
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
    
}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired
}

export default CharList;