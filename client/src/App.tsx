import Main from './views/pages/Main';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { useState, useMemo } from 'react';
import ProtectedRoute from './views/partials/ProtectedRoute';
import Nav from './views/partials/Nav';
import RecommendationPage from './views/pages/RecommendationPage';
import RecommendationFormPage from './views/pages/RecommendationFormPage';
import Profile from './views/pages/Profile';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/mui';
import Admin from './views/pages/Admin';
import { AppVM } from './viewModels/App.VM';
import { observer } from 'mobx-react-lite';
import { ROUTES } from './utils/constants';
import SearchResults from './views/pages/SearchResults';

const App: React.FC = observer(() => {
    console.log('app render');
    const vm = useMemo(() => {
        return new AppVM();
    }, []);
    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <StyledEngineProvider injectFirst>
                        <div className='h-full min-h-screen flex flex-col bg-slate-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 '>
                            <div className='bg-gradient-to-r w-full self-center rounded-b-full from-amber-300 to-fuchsia-700 sticky top-0 left-0 h-5 z-10'></div>
                            <div className='justify-center w-full grid grid-cols-[minmax(230px,_1280px)] grid-rows-[repeat(3,min-content)] gap-3 pl-3 pr-3 bg-inherit'>
                                <Nav
                                    isAuth={vm.isAuth}
                                    setIsAuth={vm.setIsAuth}
                                    currentUser={vm.currentUser}
                                    setCurrentUser={vm.setCurrentUser}
                                />
                                <Routes>
                                    <Route
                                        path={ROUTES.main}
                                        element={<Main />}
                                    />
                                    <Route
                                        path={ROUTES.search}
                                        element={<SearchResults />}
                                    />
                                    <Route
                                        path={ROUTES.recommendationById}
                                        element={
                                            <RecommendationPage
                                                currentUser={vm.currentUser}
                                            />
                                        }
                                    />
                                    <Route
                                        path={ROUTES.admin}
                                        element={
                                            <ProtectedRoute authKey={vm.isAuth}>
                                                <Admin user={vm.currentUser} />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.new}
                                        element={
                                            <ProtectedRoute authKey={vm.isAuth}>
                                                <RecommendationFormPage
                                                    user={vm.currentUser}
                                                    type='new'
                                                />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.edit}
                                        element={
                                            <ProtectedRoute authKey={vm.isAuth}>
                                                <RecommendationFormPage
                                                    user={vm.currentUser}
                                                    type='edit'
                                                />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.profile}
                                        element={
                                            <ProtectedRoute authKey={vm.isAuth}>
                                                <Profile
                                                    user={vm.currentUser}
                                                />
                                            </ProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </div>
                            <footer className='bg-gradient-to-r rounded-t-full from-amber-300 to-fuchsia-700 min-h-fit p-3 mt-auto'></footer>
                        </div>
                    </StyledEngineProvider>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
});

export default App;
