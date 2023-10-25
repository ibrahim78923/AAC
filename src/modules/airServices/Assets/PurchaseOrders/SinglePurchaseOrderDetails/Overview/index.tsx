import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overViewData } from './Overview.data';
import { styles } from './Overview.style';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { overViewTableColumns, overViewTableData } from './Overview.data';
import OverviewModel from './OverviewModel';
import { useState } from 'react';
import OverviewBilling from './OverviewBilling';
export const Overview = () => {
  const theme = useTheme();
  const { mainContainerBox, chlidContainerBox } = styles();
  const [openOverviewModel, setOpenOverviewModel] = useState(false);

  return (
    <div>
      {overViewData?.map((item) => (
        <div key={uuidv4()}>
          <Typography variant="h5" sx={{ py: '10px' }}>
            {item?.heading}
          </Typography>
          <Box sx={mainContainerBox}>
            {item?.DetailsData?.map((detail) => (
              <div key={uuidv4()}>
                <Box sx={chlidContainerBox}>
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
              </div>
            ))}
          </Box>
        </div>
      ))}
      <Box sx={{ mt: '1rem' }}>
        <Typography variant="h5" sx={{ py: '10px' }}>
          Items Details
        </Typography>
        <TanstackTable
          data={overViewTableData}
          columns={overViewTableColumns(setOpenOverviewModel)}
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
    </div>
  );
};
