import { useMemo, useState } from 'react';
import Search from './Search';
import { NavVM } from '../../viewModels/Nav.VM';
import { root } from '../../utils/constants';
import { CurrentUser, Theme } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import Login from './Login';
import { api } from '../../utils/HTTP/Api';
import IconDark from '../sgvWrappers/IconDark';
import IconLight from '../sgvWrappers/IconLight';
import IconLogOut from '../sgvWrappers/IconLogOut';
import IconNew from '../sgvWrappers/IconNew';
import IconLogo from '../sgvWrappers/IconLogo';
import IconBurger from '../sgvWrappers/IconBurger';
import IconClose from '../sgvWrappers/IconClose';
import { NavLink } from 'react-router-dom';

interface NavProps {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
    currentUser: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
}

const Nav: React.FC<NavProps> = observer(
    ({ isAuth, setIsAuth, currentUser, setCurrentUser }) => {
        console.log('nav, isAuth, currentUser', isAuth, currentUser);
        const vm = useMemo(() => {
            console.log('new nav memo, current user theme', currentUser.theme);
            return new NavVM(
                api,
                isAuth,
                setIsAuth,
                currentUser,
                setCurrentUser
            );
        }, [currentUser._id, isAuth]);

        return (
            <>
                <nav className='sticky top-[20px] left-0  bg-inherit pt-3 pb-3 min-h-fit flex flex-row justify-between items-center font-bold z-10'>
                    <NavLink
                        to={'/'}
                        aria-label='go to the home page'
                        className='flex flex-row gap-1 items-center hover:cursor-pointer hover:opacity-40'
                    >
                        <IconLogo />
                        <p className='hidden md:block text-xs'>Recommendish</p>
                    </NavLink>
                    <Search />
                    <button
                        type='button'
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
                                <NavLink
                                    to={'/new'}
                                    aria-label='new recommendation'
                                    className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                >
                                    <IconNew />
                                </NavLink>
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
                                className='hover:cursor-pointer hover:opacity-40'
                            >
                                EN
                            </button>
                        </li>

                        {isAuth ? (
                            <>
                                <li>
                                    <NavLink
                                        to={'/profile'}
                                        aria-label='profile'
                                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                    >
                                        <div className='w-11 h-11 rounded-full bg-fuchsia-600'>
                                            <img />
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                                        type='button'
                                        aria-label='log out'
                                        onClick={() => vm.logOut()}
                                    >
                                        <IconLogOut />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    className='rounded-full p-2 pr-5 pl-5 border-inherit border-[1px] hover:bg-amber-400'
                                    type='button'
                                    aria-label='log in'
                                    onClick={() => vm.toggleLoginIsOpen()}
                                >
                                    Log In
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
                <Login
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setIsAuth={setIsAuth}
                    closePopup={vm.toggleLoginIsOpen}
                    loginIsOpen={vm.loginIsOpen}
                />
            </>
        );
    }
);

export default Nav;
