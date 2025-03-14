import { Box, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './ProductsAndServices.data';
import { styles } from './ProductsAndServices.style';

const ProductsAndServices = ({ QuotesProduct }: any) => {
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
