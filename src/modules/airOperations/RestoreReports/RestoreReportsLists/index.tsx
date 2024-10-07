import { Box, Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRestoreReportsLists } from './useRestoreReportsLists';
import { TIME_TO_RESTORE_DELETED_RECORD } from '@/constants/strings';
import { RestoreReportsListsHeader } from '../RestoreReportsListsHeader';
import { RestoreReportsListsTableView } from '../RestoreReportsListTableView';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const RestoreReportsLists = () => {
  const { moveBack, router } = useRestoreReportsLists();

  if (!router?.isReady) return <SkeletonTable />;

  return (
    <>
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid`}
        borderColor="custom.off_white_three"
      >
        <Box px={2}>
          <PageTitledHeader
            title={
              <>
                <Typography
                  variant="pageTitle"
                  color="slateBlue.main"
                  component={'div'}
                >
                  Restore Reports
                </Typography>

                <Typography
                  variant="body4"
                  color="slateBlue.main"
                  component={'div'}
                >
                  {`Restore Reports deleted in the last ${TIME_TO_RESTORE_DELETED_RECORD?.REPORT_RESTORE_IN_DAYS} days`}
                </Typography>
              </>
            }
            canMovedBack
            moveBack={moveBack}
          />
          <RestoreReportsListsHeader />
        </Box>
        <br />
        <RestoreReportsListsTableView />
      </Box>
    </>
  );
};
