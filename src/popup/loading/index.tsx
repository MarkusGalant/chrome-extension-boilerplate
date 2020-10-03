import React from 'react';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

const Loading: React.FC = ({}) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <CircularProgress className={classes.progress} />
    </Paper>
  );
};

export default Loading;
