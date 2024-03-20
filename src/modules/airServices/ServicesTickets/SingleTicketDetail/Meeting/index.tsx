import { Alert, AlertTitle } from '@mui/material';

export const Meeting = () => {
  return (
    <Alert severity="info" variant="filled">
      <AlertTitle color="slateBlue.main">Premium Feature</AlertTitle>
      Please connect with the sales team to discuss in further
    </Alert>
  );
};
