import { Button, Stack, Typography } from '@mui/material';
import Folders from './Folders';
import { PlusIcon } from '@/assets/icons';

const EmailFolder = () => {
  return (
    <>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between" px={1.5}>
        <Typography variant="h4">All Emails</Typography>
        <Button variant="contained" className="small" startIcon={<PlusIcon />}>
          Create New Folder
        </Button>
      </Stack>
      <Folders />
    </>
  );
};
export default EmailFolder;
