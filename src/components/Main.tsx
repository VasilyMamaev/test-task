import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import DocsList from './DocsList/DocsList';
import ToolsBar from './ToolsBar/ToolsBar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    height: '100vh',
    maxHeight: '100vh',
    overflowY: 'hidden',
  },
}));

const Main: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square>
      <ToolsBar />
      <DocsList />
    </Paper>
  );
};

export default Main;
