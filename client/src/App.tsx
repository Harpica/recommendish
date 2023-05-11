import { useMemo } from 'react';
import { Routes, Route } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Main from './views/pages/Main';
import ProtectedRoute from './views/layouts/ProtectedRoute';
import Nav from './views/partials/Nav';
import RecommendationPage from './views/pages/RecommendationPage';
import RecommendationFormPage from './views/pages/RecommendationFormPage';
import Profile from './views/pages/Profile';
import Admin from './views/pages/Admin';
import { AppVM } from './viewModels/App.VM';
import { observer } from 'mobx-react-lite';
import { ROUTES } from './utils/constants';
import SearchResults from './views/pages/SearchResults';

const App: React.FC = observer(() => {
    const vm = useMemo(() => {
        return new AppVM();
    }, []);

    return (
        <div className='flex h-full min-h-screen flex-col bg-slate-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 '>
            <div className='sticky left-0 top-0 z-10 h-5 w-full self-center rounded-b-full bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-700'></div>
            <div className='grid w-full grid-cols-[minmax(230px,_1280px)] grid-rows-[repeat(3,min-content)] justify-center gap-3 bg-inherit pl-3 pr-3'>
                {vm.isLoading ? (
                    <div className='flex items-center justify-center'>
                        <CircularProgress />
                    </div>
                ) : (
                    <Nav
                        isAuth={vm.isAuth}
                        setIsAuth={vm.setIsAuth}
                        currentUser={vm.currentUser}
                        setCurrentUser={vm.setCurrentUser}
                        adminUser={vm.adminUser}
                        setAdminUser={vm.setAdminUser}
                    />
                )}
                <Routes>
                    <Route path={ROUTES().main} element={<Main />} />
                    <Route path={ROUTES().search} element={<SearchResults />} />
                    <Route
                        path={ROUTES().recommendationById}
                        element={
                            <RecommendationPage currentUser={vm.currentUser} />
                        }
                    />
                    <Route
                        path={ROUTES().admin}
                        element={
                            <ProtectedRoute authKey={vm.isAuth}>
                                <Admin
                                    user={vm.currentUser}
                                    setCurrentUser={vm.setCurrentUser}
                                    setAdminUser={vm.setAdminUser}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES().new}
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
                        path={ROUTES().edit}
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
                        path={ROUTES().profile}
                        element={
                            <ProtectedRoute authKey={vm.isAuth}>
                                <Profile user={vm.currentUser} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
            <footer className='mt-auto min-h-fit rounded-t-full bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-700 p-3'></footer>
        </div>
    );
});

export default App;
