import { useMemo } from 'react';
import Card from '../partials/Card';
import TagCloud from '../partials/TagCloud';
import { MainVM } from '../../viewModels/pages/Main.VM';
import { useNavigate } from 'react-router';
import { api } from '../../utils/HTTP/Api';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

interface MainProps {}

const Main: React.FC<MainProps> = observer(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const vm = useMemo(() => new MainVM(navigate, api), [navigate]);
    return (
        <>
            <header className='flex flex-col gap-3 w-full font-bold'>
                <div className='pt-5 pb-3 flex flex-col md:flex-row max-w-5xl w-full self-center'>
                    <div>
                        <h1 className='text-4xl md:text-6xl '>Recommendish:</h1>
                        <p className='text-xl md:text-right'>
                            {t('pages.main.subtitle')}
                        </p>
                    </div>
                    <div className='hidden md:block text-4xl ml-auto'>
                        <p
                            className='text-amber-500 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                vm.handleGroupOnClick('Movie');
                            }}
                        >
                            {t('pages.main.group.movies')}
                        </p>
                        <p
                            className='text-rose-500 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                vm.handleGroupOnClick('Game');
                            }}
                        >
                            {t('pages.main.group.games')}
                        </p>
                        <p
                            className='text-fuchsia-600 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                vm.handleGroupOnClick('Book');
                            }}
                        >
                            {t('pages.main.group.books')}
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
                        {t('pages.main.popular')}
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
                        {t('pages.main.recent')}
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
