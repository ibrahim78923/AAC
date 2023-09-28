import CustomNotistack from '@/components/CustomNotistack';
import SkeletonFormExample from '@/components/Skeletons/SkeletonForm/SkeletonForm.example';
import SkeletonTableExample from '@/components/Skeletons/SkeletonTable/SkeletonTable.example';
import HorizontalTabsExample from '@/components/Tabs/HorizontalTabs/HorizontalTabs.example';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

export const TestComponentsNoumanPage = () => {
  return (
    <>
      <HorizontalTabsExample />
      <br />
      <SkeletonTableExample />
      <br />
      <SkeletonFormExample />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() =>
          enqueueSnackbar(`Details Submitted Successfully`, {
            variant: 'success',
          })
        }
      >
        Show Alert
      </Button>
    </>
  );
};

export default TestComponentsNoumanPage;
