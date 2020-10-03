import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import blue from '@material-ui/core/colors/blue';

import Popup from './popup';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Popup />
  </ThemeProvider>,
  document.getElementById('app')
);
