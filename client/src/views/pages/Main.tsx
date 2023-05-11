import { useMemo } from 'react';
import Card from '../partials/Card';
import TagCloud from '../partials/TagCloud';
import { MainVM } from '../../viewModels/pages/Main.VM';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

interface MainProps {}

const Main: React.FC<MainProps> = observer(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const vm = useMemo(() => new MainVM(navigate), [navigate]);
    return (
        <>
            <header className='flex w-full flex-col gap-3 font-bold'>
                <div className='flex w-full max-w-5xl flex-col self-center pb-3 pt-5 md:flex-row'>
                    <div>
                        <h1 className='text-4xl md:text-6xl '>Recommendish:</h1>
                        <p className='text-xl md:text-right'>
                            {t('pages.main.subtitle')}
                        </p>
                    </div>
                    <div className='ml-auto hidden text-4xl md:block'>
                        <p
                            className='cursor-pointer text-amber-500 transition-all hover:scale-105'
                            onClick={() => {
                                vm.handleGroupOnClick('Movie');
                            }}
                        >
                            {t('pages.main.group.movies')}
                        </p>
                        <p
                            className='cursor-pointer text-rose-500 transition-all hover:scale-105'
                            onClick={() => {
                                vm.handleGroupOnClick('Game');
                            }}
                        >
                            {t('pages.main.group.games')}
                        </p>
                        <p
                            className='cursor-pointer text-fuchsia-600 transition-all hover:scale-105'
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
                <section className='max-w-xl self-center p-3'>
                    <TagCloud />
                </section>
                <section>
                    <h2 className='mb-5 text-xl font-bold uppercase'>
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
                    <h2 className='mb-5 text-xl font-bold uppercase'>
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
