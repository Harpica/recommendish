import { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Search from './Search';
import Login from './Login';
import Avatar from './Avatar';
import { NavVM } from '../../viewModels/partials/Nav.VM';
import { ROUTES } from '../../utils/constants';
import { CurrentUser, Language, Theme } from '../../utils/types';
import IconDark from '../svgWrappers/IconDark';
import IconLight from '../svgWrappers/IconLight';
import IconLogOut from '../svgWrappers/IconLogOut';
import IconLogo from '../svgWrappers/IconLogo';
import IconBurger from '../svgWrappers/IconBurger';
import IconClose from '../svgWrappers/IconClose';
import IconReturn from '../svgWrappers/IconReturn';
import { Tooltip } from '@mui/material';
import ButtonNewRecommendation from '../UI/ButtonNewRecommendation';

interface NavProps {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
    currentUser: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
    adminUser: CurrentUser;
    setAdminUser: () => void;
}

const Nav: React.FC<NavProps> = observer(
    ({
        isAuth,
        setIsAuth,
        currentUser,
        adminUser,
        setCurrentUser,
        setAdminUser,
    }) => {
        const { t } = useTranslation();
        console.log('rendr');

        const vm = useMemo(() => {
            console.log('memo');
            return new NavVM(
                isAuth,
                setIsAuth,
                currentUser,
                setCurrentUser,
                adminUser,
                setAdminUser
            );
        }, [
            isAuth,
            setIsAuth,
            currentUser,
            setCurrentUser,
            adminUser,
            setAdminUser,
        ]);

        useEffect(() => {
            vm.setLanguage(currentUser.language);
            console.log('lng');
        }, []);

        return (
            <>
                <nav className='sticky top-[20px] left-0  bg-inherit pt-3 pb-3 min-h-fit flex flex-row justify-between items-center font-bold z-10'>
                    <NavLink
                        to={ROUTES().main}
                        aria-label='go to the home page'
                        className='flex flex-row gap-1 items-center hover:cursor-pointer hover:opacity-40'
                    >
                        <IconLogo />
                        <p className='hidden md:block text-xs'>Recommendish</p>
                    </NavLink>
                    <Search />
                    <button
                        type='button'
                        aria-label='open menu'
                        className='md:invisible md:hidden hover:cursor-pointer hover:opacity-40 transition-all'
                        onClick={() => {
                            vm.toggleMenu();
                        }}
                    >
                        {vm.menuIsOpen ? <IconClose /> : <IconBurger />}
                    </button>
                    <ul
                        className={`${
                            vm.menuIsOpen ? 'visible flex' : 'invisible hidden'
                        } absolute top-[73px] right-0 bg-inherit w-full md:w-fit md:static md:flex md:visible flex-row gap-4 justify-end md:justify-between items-center p-3`}
                    >
                        {isAuth && (
                            <li>
                                <ButtonNewRecommendation />
                            </li>
                        )}
                        <li>
                            <button
                                type='button'
                                aria-label='change theme'
                                className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                value={vm.theme === 'dark' ? 'light' : 'dark'}
                                onClick={(e) => {
                                    vm.changeTheme(
                                        e.currentTarget.value as Theme
                                    );
                                }}
                            >
                                {vm.theme === 'dark' ? (
                                    <IconDark />
                                ) : (
                                    <IconLight />
                                )}
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                aria-label='change language'
                                className='hover:cursor-pointer hover:opacity-40 uppercase'
                                value={vm.language === 'en' ? 'ru' : 'en'}
                                onClick={(e) => {
                                    vm.changeLanguage(
                                        e.currentTarget.value as Language
                                    );
                                }}
                            >
                                {vm.language === 'en' ? 'ru' : 'en'}
                            </button>
                        </li>

                        {isAuth ? (
                            <>
                                <li>
                                    <NavLink
                                        to={`${
                                            currentUser.role === 'admin'
                                                ? ROUTES().admin
                                                : ROUTES().profile
                                        }`}
                                        aria-label='profile'
                                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                    >
                                        <Avatar
                                            avatar={currentUser.avatar || ''}
                                        />
                                    </NavLink>
                                </li>
                                {vm.isAdminActsAsOtherUser && (
                                    <li>
                                        <Tooltip
                                            title={t('tooltip.returnToAdmin')}
                                            describeChild
                                        >
                                            <button
                                                className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                                type='button'
                                                onClick={() =>
                                                    vm.returnToAdminUser()
                                                }
                                            >
                                                <IconReturn />
                                            </button>
                                        </Tooltip>
                                    </li>
                                )}
                                <li>
                                    <Tooltip
                                        title={t('tooltip.logOut')}
                                        describeChild
                                    >
                                        <button
                                            className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                            type='button'
                                            onClick={() => vm.logOut()}
                                        >
                                            <IconLogOut />
                                        </button>
                                    </Tooltip>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    className='rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                                    type='button'
                                    aria-label='log in'
                                    onClick={(e) => {
                                        vm.openLoginPopup();
                                        e.currentTarget.blur();
                                    }}
                                >
                                    {t('partials.nav.logIn')}
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
                <Login
                    closePopup={vm.closeLoginPopup}
                    loginIsOpen={vm.loginIsOpen}
                    setCurrentUser={setCurrentUser}
                    setIsAuth={setIsAuth}
                />
            </>
        );
    }
);

export default Nav;
