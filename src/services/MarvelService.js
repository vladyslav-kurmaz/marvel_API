

class MarvelService {
    _apiBace = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=363cd7e9ae911929f0cbe2196c93c6b8';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {

        const result = await this.getResource(`${this._apiBace}characters?limit=9&offset=${offset}&${this._apiKey}`);
        // console.log(result.data.results.map(this._transformCharacter))
        return  result.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {

        const result = await this.getResource(`${this._apiBace}characters/${id}?${this._apiKey}`);

        return this._transformCharacter(result.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;