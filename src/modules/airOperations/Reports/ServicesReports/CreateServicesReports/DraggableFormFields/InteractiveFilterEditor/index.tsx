import { Button } from '@mui/material';

export const InteractiveFilterEditor = (props: any) => {
  const { handleCancel } = props;

  return (
    <>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel Interactive Filter Editor
      </Button>
    </>
  );
};
