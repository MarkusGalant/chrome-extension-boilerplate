import React, { useCallback, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Close from '@material-ui/icons/Close';

import { login } from './../auth';
import { useStyles } from './styles';

type LoginProps = {
  visible: boolean;
  onClose: (isAuth: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ visible, onClose }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

  const handleLogin = useCallback(async () => {
    const auth = await login(email, password);

    if (auth && rememberMe) {
      chrome.storage.local.set({ email, password });
    }

    if (!auth) {
      setError('Invalid Email or Password');
    }
    onClose(true);
  }, [email, onClose, password, rememberMe]);

  const changeEmail = useCallback(
    (e: React.ChangeEvent<{ value: string }>) => {
      setEmail(e.target.value);
      setError('');
    },
    [setEmail]
  );

  const changePassword = useCallback(
    (e: React.ChangeEvent<{ value: string }>) => {
      setPassword(e.target.value);
      setError('');
    },
    [setPassword]
  );

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Paper elevation={0} className={classes.root}>
        <Box paddingX={4}>
          <Box marginY={4}>
            <h1>Welcome InterestsExplorer</h1>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              name="email"
              color="primary"
              variant="outlined"
              label="Email"
              value={email}
              error={!!error}
              onChange={changeEmail}
            />
          </Box>
          <Box height={80}>
            <TextField
              fullWidth
              name="password"
              color="primary"
              variant="outlined"
              type="password"
              label="Passwrord"
              value={password}
              error={!!error}
              helperText={error}
              onChange={changePassword}
            />
          </Box>
          <Box mb={1}>
            <FormControlLabel
              control={
                <Checkbox
                  name="remember-me"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />
          </Box>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
        <IconButton
          component="span"
          className={classes.close}
          onClick={() => onClose(false)}
        >
          <Close />
        </IconButton>
      </Paper>
    </Slide>
  );
};

export default Login;
