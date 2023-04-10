import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();
    const _apiBace = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=363cd7e9ae911929f0cbe2196c93c6b8';
    const _baseCharOffset = 210;
    const _baseComicsOffset = 500;

    const getAllCharacters = async (offset = _baseCharOffset) => {

        const result = await request(`${_apiBace}characters?limit=9&offset=${offset}&${_apiKey}`);
        // console.log(result.data.results.map(this._transformCharacter))
        return  result.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {

        const result = await request(`${_apiBace}characters/${id}?${_apiKey}`);

        return _transformCharacter(result.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getComics = async (offset = _baseComicsOffset) => {
        const result = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&${_apiKey}`);

        return result.data.results.map(comics => _transformComics(comics))
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics}
}

export default useMarvelService;