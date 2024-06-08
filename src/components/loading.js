import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loding() {
  return (
    <Stack spacing={1} style={{ margin: "auto" }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      {/* <Skeleton variant="circular" width={50} height={50} /> */}
      <Skeleton variant="rectangular" width={600} height={250} />
    </Stack>
  );
}