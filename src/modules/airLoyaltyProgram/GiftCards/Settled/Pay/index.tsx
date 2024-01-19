import { Box, Grid, Typography } from '@mui/material';
import { Header, payTabelData } from './Pay.data';
import { PayHeader } from './PayHeader';
import { PayCard } from './PayCard';
import { usePay } from './usePay';

export const Pay = () => {
  const { palette, shouldHideColumn, hideZeroPrice, toggleHideZeroPrice } =
    usePay();

  return (
    <Box
      boxShadow={1}
      border={`1px solid ${palette?.custom?.off_white_three}`}
      borderRadius={3}
    >
      <PayHeader
        show={hideZeroPrice}
        toggleHideZeroPrice={toggleHideZeroPrice}
      />
      <Grid
        container
        overflow={'auto'}
        flexWrap={'nowrap'}
        border={`1px solid ${palette?.custom?.off_white_three}`}
      >
        {Header?.map(
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
                  {payTabelData?.map((item) =>
                    item?.value?.receive === header ? (
                      <Grid item xs={12} key={item?.id}>
                        {(!hideZeroPrice ||
                          (hideZeroPrice && item?.value?.price > 0)) && (
                          <PayCard values={item?.value} />
                        )}
                      </Grid>
                    ) : null,
                  )}
                </Grid>
              </Grid>
            ),
        )}
      </Grid>
    </Box>
  );
};
