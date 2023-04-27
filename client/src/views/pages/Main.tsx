import { useMemo } from 'react';
import Card from '../partials/Card';
import TagCloud from '../partials/TagCloud';
import { MainVM } from '../../viewModels/pages/Main.VM';
import { useNavigate } from 'react-router';
import { api } from '../../utils/HTTP/Api';
import { observer } from 'mobx-react-lite';
// import { setRecommendationProp } from '../../utils/types';

interface MainProps {}

const Main: React.FC<MainProps> = observer(({}) => {
    const navigate = useNavigate();
    const vm = useMemo(() => new MainVM(navigate, api), []);
    return (
        <>
            <header className='flex flex-col gap-3 w-full font-bold'>
                <div className='pt-5 pb-3 flex flex-col md:flex-row max-w-5xl w-full self-center'>
                    <div>
                        <h1 className='text-4xl md:text-6xl '>Recommendish:</h1>
                        <p className='text-xl md:text-right'>
                            Share your thoughts on
                        </p>
                    </div>
                    <div className='hidden md:block text-4xl ml-auto'>
                        <p
                            className='text-amber-500 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                vm.handleGroupOnClick('Movie');
                            }}
                        >
                            Movies
                        </p>
                        <p
                            className='text-rose-500 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                vm.handleGroupOnClick('Game');
                            }}
                        >
                            Games
                        </p>
                        <p
                            className='text-fuchsia-600 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                vm.handleGroupOnClick('Book');
                            }}
                        >
                            Books
                        </p>
                    </div>
                </div>
            </header>
            <main className='flex flex-col gap-8'>
                <section className='self-center p-3 max-w-xl'>
                    <TagCloud />
                </section>
                <section>
                    <h2 className='font-bold text-xl mb-5 uppercase'>
                        Popular recommendations
                    </h2>
                    <ul className='flex flex-col gap-4'>
                        {vm.popularRecommendations.map((recommendation, i) => (
                            <li key={'popular' + i}>
                                <Card recommendation={recommendation} />
                            </li>
                        ))}
                    </ul>
                </section>
                <section className='mb-5'>
                    <h2 className='font-bold text-xl mb-5 uppercase'>
                        Recent recommendations
                    </h2>
                    <ul className='flex flex-col gap-4'>
                        {vm.recentRecommendations.map((recommendation, i) => (
                            <li key={'recent' + i}>
                                <Card recommendation={recommendation} />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
});

export default Main;
