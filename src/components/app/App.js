import { lazy, Suspense } from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spiner/spiner";
// import SingleCharPage from "../pages/SingleCharPage";

// import { MainPages, Comics, SingleComicPage } from "../pages";

const Page404 = lazy(() => import('../pages/Page404'));
const MainPages = lazy(() => import('../pages/MainPages'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleCharOrComicPage = lazy(() => import('../pages/SingleCharOrComicPage'));
// Можна зробити клікабельними комімікси у персонажів а також якщо ми переходим на сторінку 404 зробити кнопку назад на ту де був користувач

const App = () => {
    // const location = useLocation();
    // const content = location === '/' ? <SingleCharPage/> : <SingleComicPage/>

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MainPages/>}/>
                                
                            <Route exact path='/comics' element={<ComicsPage/>}/>

                            <Route exact path='/:charId' element={<SingleCharOrComicPage/>}/>

                            <Route exact path='/comics/:comicId' element={<SingleCharOrComicPage/>}/>

                            <Route exact path='*' element={<Page404/>}/>

                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;