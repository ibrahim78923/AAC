import { Box, Typography } from '@mui/material';

const CatalogServiceDetails = (prop: any) => {
  const { servicesDetails } = prop;

  return (
    <Box maxWidth={'65%'} sx={{ color: 'blue.lighter' }}>
      <br />
      <Typography variant="body1">Description:</Typography>
      <br />
      {!!servicesDetails?.data?.description ? (
        <Typography
          variant="body4"
          dangerouslySetInnerHTML={{
            __html: servicesDetails?.data?.description,
          }}
        />
      ) : (
        '---'
      )}
      <br />
    </Box>
  );
};
export default CatalogServiceDetails;
