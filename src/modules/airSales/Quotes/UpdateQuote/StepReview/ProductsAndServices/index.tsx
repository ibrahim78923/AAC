import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './ProductsAndServices.data';
import { styles } from './ProductsAndServices.style';
import { useSearchParams } from 'next/navigation';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import Quotation from '../Quotation';

const ProductsAndServices = ({ loyalityCalculation }: any) => {
  const quoteId = useSearchParams().get('data');
  const { data: viewQuotesData } = useGetQuoteByIdQuery({ id: quoteId });

  return (
    <Box sx={styles?.wrapper}>
      <Typography variant="h5" sx={styles?.heading}>
        Products & Services
      </Typography>
      <Grid container spacing={2} justifyContent="space-between" mt={1}>
        <Grid xs={12} md={7.8}>
          <Box sx={styles?.tableWrapper}>
            <TanstackTable
              columns={columns}
              data={viewQuotesData?.data?.products}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Quotation loyalityCalculation={loyalityCalculation} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsAndServices;
