import { useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { ReceiveCard } from './ReceiveCard';
import { ReceiveHeader } from './ReceiveHeader';
import { receiveTableData } from './Receive.data';

export const Receive = () => {
  const [hideZeroPrice, setHideZeroPrice] = useState(false);
  const Header = ['Sharemydine', 'Ray Shop', 'AK Hub', 'Zam Store'];
  const { palette } = useTheme();

  const toggleHideZeroPrice = () => {
    setHideZeroPrice(!hideZeroPrice);
  };
  const shouldHideColumn = (columnName: string) => {
    return (
      hideZeroPrice &&
      receiveTableData.every(
        (item) => item.value.receive !== columnName || item.value.price <= 0,
      )
    );
  };

  return (
    <Box
      boxShadow={1}
      border={`1px solid ${palette?.custom?.off_white_three}`}
      borderRadius={3}
    >
      <ReceiveHeader
        toggleHideZeroPrice={toggleHideZeroPrice}
        hideZeroPrice={hideZeroPrice}
      />
      <Grid
        container
        overflow={'auto'}
        flexWrap={'nowrap'}
        border={`1px solid ${palette?.custom?.off_white_three}`}
      >
        {Header.map(
          (header) =>
            !shouldHideColumn(header) && (
              <Grid
                item
                xs={12}
                key={header}
                alignItems={'center'}
                minHeight={'50vh'}
              >
                <Typography
                  variant="h6"
                  bgcolor={palette?.custom?.off_white_three}
                  height={50}
                  display={'flex'}
                  alignItems={'center'}
                  p={1}
                >
                  {header}
                </Typography>
                <Grid
                  container
                  overflow={'hidden'}
                  spacing={!hideZeroPrice ? 1 : 0}
                  p={1}
                >
                  {receiveTableData?.map((item) => {
                    if (item.value.receive === header) {
                      return (
                        <Grid item xs={12} key={item?.id}>
                          {(!hideZeroPrice ||
                            (hideZeroPrice && item?.value?.price > 0)) && (
                            <ReceiveCard values={item?.value} />
                          )}
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>
            ),
        )}
      </Grid>
    </Box>
  );
};
