import { useState, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import SearchCharList from '../SearchCharList/SearchCharList';


import './FindChar.scss'

const FindChar = () => {

    const [data, setData] = useState([]);
    const [temp, setTemp] = useState('');
    const searchInput = useRef(null);

    const {loading, getSearchChar} = useMarvelService()



    const onChangeTemp = (e) => {
        setTemp(() => e.target.value)
        
        getSearchChar(e.target.value)
            .then(res => setData(res))
            .catch(() => setData([]))

        return data.length > 0 ? null : <div>No character found for this query</div>
    }

    const handleClick = () => {
        searchInput.current.focus();
    }

    

    return (
        <div className='find'>
            <input 
                ref={searchInput}
                type="text" 
                className="find__input" 
                value={temp}
                onChange={onChangeTemp} 
                placeholder="Find character by name"
                onClick={handleClick}
                onBlur={() => setData([])}
                />

            {temp && data?.length === 0 && !loading ? <div className='find__error'>No character found for this query</div> : null}
            {SearchCharList(data)}
        </div>
    )
}

export default FindChar;