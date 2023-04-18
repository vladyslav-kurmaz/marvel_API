import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

// const SingleComicPage = () => {
//     const [comic, setComic] = useState('');
//     const {comicId} = useParams();
//     console.log(useParams());

//     const {error, loading, getComics, clearError} = useMarvelService();


//     useEffect(() => {
//         updateComic();
//     }, [comicId])

//     const updateComic = () => {
 
//         clearError()
//         getComics(comicId)
//             .then(onComicLoaded)
//     }

//     const onComicLoaded = (comic) => {
//         setComic(comic);
//     }

//     const spiner = loading ? <Spinner/> : null;
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const content = !(loading || error || !comic) ? <View comic={comic}/> : null;


//     return (
//         <>
//             {errorMessage}
//             {spiner}
//             {content}
//         </>
        
//     )
// }

const SingleComicPage = () => {
    const [data, setData] = useState('');
    const {comicId, charId} = useParams();

    const {error, loading, getComics, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        charId ? updateComic(() => getCharacter(charId)) : updateComic(() => getComics(comicId))
    }, [comicId, charId])

    const updateComic = (fc) => {
 
        clearError()
        fc()
            .then(onComicLoaded)
    }

    const onComicLoaded = (data) => {
        setData(data);
    }

    const spiner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <View link={charId} data={data}/> : null;


    return (
        <>
            {errorMessage}
            {spiner}
            {content}
        </>
        
    )
}


const View = ({link, data}) => {
    const {thumbnail, name, description, pageCount, language, price} = data;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language ? `Language: ${language}` : null}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={link ? '/' : '/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;