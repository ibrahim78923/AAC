import { Box, Grid, Skeleton, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Quotes.data';
import { styles } from '../Associations.style';
import useQuotes from './useQuotes';
import { AlertModals } from '@/components/AlertModals';
import QuotesDrawer from './QuotesDrawer';
import { QuotesProps } from '../Associations-interface';

const Quotes = ({ quotesData, isLoading, dealId }: QuotesProps) => {
  const {
    theme,
    setSearchName,
    isOpenAlert,
    setIsOpenAlert,
    setOpenDrawer,
    openDrawer,
    handleCloseAlert,
    deleteQuoteHandler,
    quoteLoading,
    setSelectedQuote,
    quotesDetails,
    quoteDetailsLoading,
  } = useQuotes(dealId);
  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} sx={styles?.countBox}>
          {isLoading ? (
            <Skeleton variant="text" height={40} width={120} />
          ) : (
            <>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {quotesData?.length < 10
                  ? `0${quotesData?.length}`
                  : quotesData?.length}
              </Typography>
              <Typography variant="h5">Quotes</Typography>
            </>
          )}
        </Grid>
        <Grid item md={8} xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              setSearchBy={setSearchName}
              label="Search By Name"
              size="medium"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({
              setOpenDrawer,
              setIsOpenAlert,
              setSelectedQuote,
            })}
            data={quotesData}
          />
        </Grid>
      </Grid>

      {openDrawer && (
        <QuotesDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          quotesDetails={quotesDetails}
          isLoading={quoteDetailsLoading}
        />
      )}

      {isOpenAlert && (
        <AlertModals
          message={"You're about to remove a record. Are you sure?"}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmitBtn={deleteQuoteHandler}
          loading={quoteLoading}
        />
      )}
    </Box>
  );
};

export default Quotes;
