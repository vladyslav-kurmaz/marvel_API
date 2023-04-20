import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);


    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
 
        clearError()

        if (!charId) {
            return 
        }

        getCharacter(charId)
            .then(onCharacterLoaded)
            .then(() => setProcess('comfirmed'))
    }

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    
    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {id, name, thumbnail, description, wiki, comics} = data;

    
    let style = thumbnail.indexOf('image_not_available.jpg') > -1 ? {'objectFit': 'unset'} : {'objectFit': 'cover'};

    const tenComics = comics.length === 0 ?  [{name: 'This char don\'t have comics'}] : comics.splice(0, 10);

    return (
        <>
            <div className="char__basics">
            <img src={thumbnail} alt={name} style={style}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <Link to={`/${id}`} className="button button__main">
                        <div className="inner">homepage</div>
                    </Link>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}    
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    tenComics.map((item, i) => { 
                        return (
                            <li className="char__comics-item" key={i}>
                                <Link to={`/comics${item.resourceURI !== undefined ? item.resourceURI.slice(item.resourceURI.lastIndexOf('/')) : null}`}>                                    
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;