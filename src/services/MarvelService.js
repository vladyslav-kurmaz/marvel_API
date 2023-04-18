import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=363cd7e9ae911929f0cbe2196c93c6b8';
    const _baseCharOffset = 210;
    const _baseComicsOffset = 500;

    const getAllCharacters = async (offset = _baseCharOffset) => {

        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // console.log(result.data.results.map(this._transformCharacter))
        return  result.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {

        const result = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(result.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const result = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

        return result.data.results.map(comics => _transformComics(comics))
    }

    const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            price: comics.prices[0].price ? 
                `${comics.prices[0].price}$`
                : 'not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages`
                : 'No information about the number of pages',
            language: comics.textObjects[0]?.language || 'en-us',
        }
    }

    const getSearchChar = async (temp) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${temp}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getSearchChar}
}

export default useMarvelService;