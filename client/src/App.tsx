import Main from './views/pages/Main';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { useState } from 'react';
import ProtectedRoute from './views/partials/ProtectedRoute';
import Nav from './views/partials/Nav';
import SearchResults from './views/pages/SearchResults';
import Recommendation from './views/pages/Recommendation';
import NewRecommendation from './views/pages/NewRecommendation';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(true);
    return (
        <>
            <StyledEngineProvider injectFirst>
                <div className=' h-full min-h-screen flex flex-col bg-zinc-800 text-zinc-100 '>
                    <div className='bg-gradient-to-r w-full self-center rounded-b-full from-amber-300 to-fuchsia-700 sticky top-0 left-0 h-5 z-10'></div>
                    <div className='justify-center w-full grid grid-cols-[minmax(230px,_1280px)] grid-rows-[repeat(3,min-content)] gap-3 pl-3 pr-3 bg-inherit'>
                        <Nav />
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<Main />} />
                                <Route
                                    path='/search/:param'
                                    element={<SearchResults />}
                                />
                                <Route
                                    path='/:id'
                                    element={<Recommendation />}
                                />
                                <Route
                                    path='/new'
                                    element={
                                        <ProtectedRoute authKey={isAuth}>
                                            <NewRecommendation />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </div>
                    <footer className='bg-gradient-to-r rounded-t-full from-amber-300 to-fuchsia-700 min-h-fit p-3 mt-auto'></footer>
                </div>
            </StyledEngineProvider>
        </>
    );
}

export default App;
