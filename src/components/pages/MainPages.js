import { Helmet } from "react-helmet";

import { useState } from "react"

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import FindChar from "../findChar/FindChar";

import decoration from '../../resources/img/vision.png';

const MainPages = () => {

    const [selectedChar, setSelectChar] = useState(null)

    const selectChar = (id) => {
        setSelectChar(id)
    }

    return (
        <>

            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <FindChar/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList selectChar={selectChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>      
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPages;