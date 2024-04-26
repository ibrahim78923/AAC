import { Box, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './ProductsAndServices.data';
import { styles } from './ProductsAndServices.style';
import useViewQuotes from '../useViewQuote';

const ProductsAndServices = () => {
  const { QuotesProduct } = useViewQuotes();
  return (
    <Box sx={styles?.wrapper}>
      <Typography variant="h5" sx={styles?.heading}>
        Products & Services
      </Typography>

      <Box sx={styles?.tableWrapper}>
        <TanstackTable columns={columns} data={QuotesProduct?.data?.products} />
      </Box>
    </Box>
  );
};

export default ProductsAndServices;
