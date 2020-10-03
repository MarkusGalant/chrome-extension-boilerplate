import React, { useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  ColDef,
  RowData,
  ValueFormatterParams,
} from '@material-ui/data-grid';
import { Box, Button, Link, Typography } from '@material-ui/core';
import { saveAs } from 'file-saver';

import { convertToCSV } from '../utils';

const columns: ColDef[] = [
  {
    field: 'title',
    headerName: 'Video name',
    // eslint-disable-next-line react/display-name
    renderCell: ({ data }: ValueFormatterParams) => (
      <Link target="_blank" href={data.link}>
        {data.title}
      </Link>
    ),
    width: 650,
  },
  { field: 'channel', headerName: 'Channel', width: 200 },
];

const Overview = () => {
  const [items, setItems] = useState([]);
  const [selection, setSelection] = useState<RowData[]>([]);

  useEffect(() => {
    chrome.storage.local.get(null, async (values) => {
      if (!!values.items) {
        setItems(
          values.items.map((it: IParseItem, index: number) => ({
            id: index,
            ...it,
          }))
        );
      }
    });
  }, [setItems]);

  const download = useCallback(() => {
    const filename = new Date().toISOString().slice(0, -14) + '.csv';
    const header: IParseItem = {
      title: 'Video name',
      channel: 'Channel',
      link: 'Link',
      img: '',
    };

    const csv = convertToCSV([header, ...items]);
    const blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8',
    });

    saveAs(blob, filename);
  }, [items]);

  return (
    <Box display="grid" justifyContent="center">
      <Box mt={1} mb={5}>
        <Typography variant="h4">Overview youtube scrap result</Typography>
      </Box>
      <Box width={900} height={400} overflow="hidden">
        <DataGrid
          checkboxSelection
          rows={items}
          columns={columns}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rows);
          }}
        />
      </Box>
      <Box mt={1} ml={1}>
        {!!selection.length ? (
          <Button color="primary" onClick={download}>
            Downlaod
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Overview;
