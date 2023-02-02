import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface SuccessProps {
  blurb: string,
  width: number,
}

export function SuccessAlert({ blurb, width }: SuccessProps) {
  return (
    <Stack sx={{ width, mt:1 }} spacing={2}>
      <Alert severity="success">{blurb}</Alert>
    </Stack>
  );
};

export function InfoAlert({ blurb, width }: SuccessProps) {
  return (
    <Stack sx={{ width, mt:1 }} spacing={2}>
      <Alert severity="info">{blurb}</Alert>
    </Stack>
  );
};

export function NoQueriesAlert() {
  return (
    <Stack sx={{ width: 300  }} spacing={2}>
      <Alert severity="warning">No queries match this description</Alert>
    </Stack>
  );
};

export function QueryDeletedAlert() {
  return (
    <Stack sx={{ width: 300, mt:1  }} spacing={2}>
      <Alert severity="error">Query has been deleted</Alert>
    </Stack>
  );
};

