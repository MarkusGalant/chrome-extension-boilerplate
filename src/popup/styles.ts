import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    width: theme.spacing(40),
    backgroundColor: theme.palette.common.white,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
