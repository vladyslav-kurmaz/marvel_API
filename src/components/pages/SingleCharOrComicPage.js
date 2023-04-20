import { Helmet } from 'react-helmet';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const [data, setData] = useState('');
    const {comicId, charId} = useParams();

    const {process, setProcess, getComics, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        charId ? updateComic(() => getCharacter(charId)) : updateComic(() => getComics(comicId))
        // eslint-disable-next-line
    }, [comicId, charId])

    const updateComic = (fc) => {
 
        clearError()
        fc()
            .then(onComicLoaded)
            .then(() => setProcess('comfirmed'))
    }

    const onComicLoaded = (data) => {
        setData(data);
    }

    return (
        <>

            {setContent(process, View, data)}
        </>
        
    )
}


const View = ({link, data}) => {
    const navigation = useNavigate();
    const goBack = () => navigation(-1)
    const {thumbnail, name, description, pageCount, language, price} = data;
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`Info about ${name}`}/>
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language ? `Language: ${language}` : null}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={() =>  goBack()} className="single-comic__back">Back to all</button>
        </div>
    )
}

export default SingleComicPage;