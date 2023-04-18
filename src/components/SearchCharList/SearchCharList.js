import { Link } from 'react-router-dom'

import './searchCharList.scss'

const SearchCharList = (data) => {
    const charList = () => {
        return  data.map(item => (
                <li className="single__char-list-item" key={item.id}>
                    <Link to={`/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="single__char-list-item-img"/>
                        <h2 className="single__char-item-list-name">{item.name}</h2>
                    </Link>
                    
                </li>
            )) 
    }
    
    return (
        <ul className="single__char-list">
            {charList()}
        </ul>
    )
}

export default SearchCharList;