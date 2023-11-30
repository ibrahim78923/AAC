import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { overviewTableColumns, overviewListData } from './Overview.data';
import OverviewModel from './OverviewModal';
import OverviewBilling from './OverviewBilling';
import TanstackTable from '@/components/Table/TanstackTable';
import { useOverview } from './useOverview';
export const Overview = () => {
  const { openOverviewModal, setOpenOverviewModal, theme } = useOverview();
  return (
    <Box>
      {overviewData?.map((item) => (
        <Box key={uuidv4()}>
          <Typography variant="h5" py={'0.625rem'}>
            {item?.heading}
          </Typography>
          <Box sx={styles?.mainContainerBox}>
            {item?.detailsData?.map((detail: any) => (
              <Box key={uuidv4()}>
                <Box sx={styles?.childContainerBox}>
                  <Box width={{ sm: '20%', xs: '8.75rem' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color={theme?.palette?.grey?.[900]}
                    >
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      <Box mt={'1rem'}>
        <Typography variant="h5" py={'0.625rem'}>
          Items Details
        </Typography>
        <TanstackTable
          data={overviewListData}
          columns={overviewTableColumns(setOpenOverviewModal, theme)}
        />
      </Box>
      <Box m={'1rem 3rem 0 0'}>
        <OverviewBilling />
      </Box>
      <Box>
        <OverviewModel
          openOverviewModal={openOverviewModal}
          setOpenOverviewModal={setOpenOverviewModal}
          theme={theme}
        />
      </Box>
    </Box>
  );
};
