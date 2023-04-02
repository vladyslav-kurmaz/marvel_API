import { Component } from 'react';
import PropTypes from 'prop-types'; 

import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = { 
        char: null,
        loading: false,
        error: false,
    }

    marvelServis = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        } 
    }

    updateChar = () => {
        const {charId} = this.props;
 
        if (!charId) {
            return 
        }

        this.onCharLoading()

        this.marvelServis
            .getCharacter(charId)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    onCharacterLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
            })
    }

    onCharLoading = () => {
        this.setState({
                loading: true
            });
    }

    onError = () => {
        this.setState({
                loading: false,
                error: true
            }
        );
    }

    render() {
        const {char, loading, error} = this.state
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const spiner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        
        return (
            <div className="char__info">
                {skeleton}
                {spiner}
                {errorMessage}
                {content}      
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, thumbnail, description, wiki, homepage, comics} = char;

    let style = thumbnail.indexOf('image_not_available.jpg') > -1 ? {'objectFit': 'unset'} : {'objectFit': 'cover'};

    const tenComics = comics.length === 0 ?  [{name: 'This char don\'t have comics'}] : comics.splice(0, 10);

    return (
        <>
            <div className="char__basics">
            <img src={thumbnail} alt={name} style={style}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
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
                                {item.name}
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