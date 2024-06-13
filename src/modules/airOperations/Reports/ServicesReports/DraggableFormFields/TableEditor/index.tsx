import { Button } from '@mui/material';

export const TableEditor = (props: any) => {
  const { handleCancel } = props;

  return (
    <>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel Table Editor
      </Button>
    </>
  );
};
