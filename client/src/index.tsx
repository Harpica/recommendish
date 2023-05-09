import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/mui';
import i18n from './localization/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <I18nextProvider i18n={i18n}>
                    <StyledEngineProvider injectFirst>
                        <App />
                    </StyledEngineProvider>
                </I18nextProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
