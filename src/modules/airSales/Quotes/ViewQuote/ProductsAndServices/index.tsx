import { Box, Typography } from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { productServicesData } from '@/mock/modules/Quotes';
import { columns } from './ProductsAndServices.data';
import { styles } from './ProductsAndServices.style';

const ProductsAndServices = () => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" sx={styles.heading}>
        Products & Services
      </Typography>

      <Box sx={styles.tableWrapper}>
        <TanstackTable columns={columns} data={productServicesData} />
      </Box>
    </Box>
  );
};

export default ProductsAndServices;
