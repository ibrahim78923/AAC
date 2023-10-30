import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { overviewTableColumns, overviewListData } from './Overview.data';
import OverviewModel from './OverviewModel';
import { useState } from 'react';
import OverviewBilling from './OverviewBilling';
import TanstackTable from '@/components/Table/TanstackTable';
export const Overview = () => {
  const theme = useTheme();
  const [openOverviewModel, setOpenOverviewModel] = useState(false);

  return (
    <Box>
      {overviewData?.map((item) => (
        <Box key={uuidv4()}>
          <Typography variant="h5" sx={{ py: '10px' }}>
            {item?.heading}
          </Typography>
          <Box sx={styles?.mainContainerBox}>
            {item?.DetailsData?.map((detail) => (
              <Box key={uuidv4()}>
                <Box sx={styles?.childContainerBox}>
                  <Box sx={{ width: { sm: '20%', xs: '8.75rem' } }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.grey[900] }}
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
      <Box sx={{ mt: '1rem' }}>
        <Typography variant="h5" sx={{ py: '10px' }}>
          Items Details
        </Typography>
        <TanstackTable
          data={overviewListData}
          columns={overviewTableColumns(setOpenOverviewModel)}
        />
      </Box>
      <Box sx={{ m: '1rem 3rem 0 0' }}>
        <OverviewBilling />
      </Box>
      <Box>
        <OverviewModel
          openOverviewModel={openOverviewModel}
          setOpenOverviewModel={setOpenOverviewModel}
        />
      </Box>
    </Box>
  );
};
