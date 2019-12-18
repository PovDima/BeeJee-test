import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import muiTheme from './assets/muiTheme';
import configureStore from './store/configureStore.js';

const theme = createMuiTheme(muiTheme);
const store = configureStore();

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <AppContainer>
                    <Component />
                </AppContainer>
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root')
    );
}

export function mountApp() {
    const NextApp = require('./App.js').default;

    render(NextApp);
}

mountApp();

if (module.hot) {
    module.hot.accept('./App.js', () => mountApp());
}

