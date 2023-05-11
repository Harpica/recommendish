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
        const vm = useMemo(() => {
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
        }, []);

        return (
            <>
                <nav className='sticky left-0 top-[20px]  z-10 flex min-h-fit flex-row items-center justify-between bg-inherit pb-3 pt-3 font-bold'>
                    <NavLink
                        to={ROUTES().main}
                        aria-label='go to the home page'
                        className='flex flex-row items-center gap-1 hover:cursor-pointer hover:opacity-40'
                    >
                        <IconLogo />
                        <p className='hidden text-xs md:block'>Recommendish</p>
                    </NavLink>
                    <Search />
                    <button
                        type='button'
                        aria-label='open menu'
                        className='transition-all hover:cursor-pointer hover:opacity-40 md:invisible md:hidden'
                        onClick={() => {
                            vm.toggleMenu();
                        }}
                    >
                        {vm.menuIsOpen ? <IconClose /> : <IconBurger />}
                    </button>
                    <ul
                        className={`${
                            vm.menuIsOpen ? 'visible flex' : 'invisible hidden'
                        } absolute right-0 top-[73px] w-full flex-row items-center justify-end gap-4 bg-inherit p-3 md:visible md:static md:flex md:w-fit md:justify-between`}
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
                                className='flex items-center justify-center hover:cursor-pointer hover:opacity-40'
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
                                className='uppercase hover:cursor-pointer hover:opacity-40'
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
                                        className='flex items-center justify-center hover:cursor-pointer hover:opacity-40'
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
                                                className='flex items-center justify-center hover:cursor-pointer hover:opacity-40'
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
                                            className='flex items-center justify-center hover:cursor-pointer hover:opacity-40'
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
                                    className='rounded-full border-[1px] border-current p-2 pl-5 pr-5 shadow-md hover:bg-amber-400'
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
