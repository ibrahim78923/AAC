import { Box, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './ProductsAndServices.data';
import { styles } from './ProductsAndServices.style';
import { useSearchParams } from 'next/navigation';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';

const ProductsAndServices = () => {
  const quoteId = useSearchParams().get('data');
  const { data: viewQuotesData } = useGetQuoteByIdQuery({ id: quoteId });

  return (
    <Box sx={styles?.wrapper}>
      <Typography variant="h5" sx={styles?.heading}>
        Products & Services
      </Typography>

      <Box sx={styles?.tableWrapper}>
        <TanstackTable
          columns={columns}
          data={viewQuotesData?.data?.products}
        />
      </Box>
    </Box>
  );
};

export default ProductsAndServices;
