import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, TextField, Divider, Button, Typography } from '@material-ui/core';

import Login from './login';
import Loading from './loading';

import { useStyles } from './styles';
import { isAuthorized } from './auth';

const Popup = () => {
  const [items, setItems] = useState<IParseItem[]>([]);
  const [working, setWorking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);

    chrome.storage.local.get(null, async (values) => {
      if (!!values.email && !!values.password) {
        const auth = await isAuthorized(values.email, values.password);

        setShowLogin(!auth);
      }

      setLoading(false);
    });
  }, [setWorking, setLoading]);

  useEffect(() => {
    chrome.storage.onChanged.addListener((values) => {
      if (values.working) {
        setWorking(Boolean(values.working.newValue));
      }
      if (values.items) {
        setItems(values.items.newValue);
      }
    });
  }, [setWorking, setItems]);

  const content = useMemo(() => items.map((it) => it.title).join('\n'), [
    items,
  ]);

  const handleCloseLogin = useCallback(() => {
    setShowLogin(false);
  }, []);

  const runOrStop = useCallback(() => {
    const runCommand = (command: string, args: unknown = null) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0].id)
          chrome.tabs.sendMessage(tabs[0].id, { command, args });
      });
    };

    if (!working) {
      chrome.storage.local.set({ items: [] });
      chrome.storage.local.set({ working: true });
      runCommand('start');
      return;
    }

    chrome.storage.local.set({ working: false });
    runCommand('stop');
  }, [working]);

  const openOverview = useCallback(() => {
    console.log('ss');
  }, []);

  return (
    <Box className={classes.root}>
      {loading && <Loading />}
      <Login visible={showLogin} onClose={handleCloseLogin} />
      <Box marginY={2}>
        <Typography align="center" variant="h6">
          Youtube parser
        </Typography>
      </Box>
      <Divider />
      <Box marginY={2}>
        <TextField
          fullWidth
          multiline
          rows={12}
          color="primary"
          variant="outlined"
          label="Video titles"
          value={content}
          InputProps={{ readOnly: true }}
        />
      </Box>
      <Box marginBottom={1}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          onClick={openOverview}
        >
          Overview
        </Button>
      </Box>
      <Box marginBottom={2}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={runOrStop}
        >
          {!working ? 'Run parsing' : 'Stop'}
        </Button>
      </Box>
    </Box>
  );
};

export default Popup;
