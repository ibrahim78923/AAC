import {
  Box,
  Stack,
  Typography,
  Button,
  TextareaAutosize,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import { PlusSharedIcon } from '@/assets/icons';
import { productTotalDetails } from './EditDetailsData';
import { v4 as uuidv4 } from 'uuid';

const ProductsTable = () => {
  return (
    <Box mt={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          sx={{ display: 'flex', gap: '10px' }}
          // onClick={() => setIsListViewPgae(true)}
          startIcon={<PlusSharedIcon />}
        >
          Add Products
        </Button>
      </Stack>
      <Stack direction="row" gap={3}>
        <TextareaAutosize minRows={15} cols={180} placeholder="Comments" />
        <Card sx={{ width: '325px', p: '10px 15px' }}>
          <CardContent>
            {productTotalDetails?.map((item: any) => (
              <Box key={uuidv4()}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography>{item.value}</Typography>
                </Stack>
                {item?.detail?.map((val: any) => (
                  <Stack
                    key={uuidv4()}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>{val.title}</Typography>
                    <Typography>{val.value}</Typography>
                  </Stack>
                ))}
              </Box>
            ))}
          </CardContent>
          <CardActions sx={{ d: 'flex', justifyContent: 'space-between' }}>
            {/* <Stack direction='row' justifyContent='space-between' alignItems='center'> */}
            <Typography variant="h5">Total</Typography>
            <Typography variant="h5">£50</Typography>
            {/* </Stack> */}
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
};

export default ProductsTable;
