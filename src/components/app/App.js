import React, { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import ComicsList from "../comicsList/ComicsList";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setSelectChar] = useState(null)

    const selectChar = (id) => {
        setSelectChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            {/* <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList selectChar={selectChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>      
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> */}
            <ComicsList/>
        </div>
    )
}

export default App;