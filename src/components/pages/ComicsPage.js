import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel Comics List</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/> 
        </>
    )
}

export default ComicsPage; 