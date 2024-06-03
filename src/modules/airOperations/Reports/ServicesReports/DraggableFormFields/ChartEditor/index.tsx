import { Button } from '@mui/material';

export const ChartEditor = (props: any) => {
  const { handleCancel } = props;

  return (
    <>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel Chart Editor
      </Button>
    </>
  );
};
