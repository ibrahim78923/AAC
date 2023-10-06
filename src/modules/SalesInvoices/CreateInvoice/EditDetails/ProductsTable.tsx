import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextareaAutosize,
  Card,
  CardActions,
  CardContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { productTotalDetails } from './EditDetailsData';
import { v4 as uuidv4 } from 'uuid';
import AddProducts from './AddProducts';

const ProductsTable = () => {
  const [isDiscount, setIsDiscount] = useState(false);
  const theme = useTheme();

  return (
    <Box mt={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h4">Products</Typography>
        <AddProducts />
      </Stack>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={3}>
        <TextareaAutosize minRows={15} cols={180} placeholder="Comments" />
        <Card sx={{ width: { xs: '100%', lg: '325px' }, p: '10px 15px' }}>
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setIsDiscount(true);
                }}
              >
                {!isDiscount && <AddCircleRounded />}
                <Typography>Discount</Typography>
              </Box>
              {!isDiscount ? (
                <Typography sx={{ color: theme?.palette?.custom?.dark }}>
                  0%
                </Typography>
              ) : (
                <TextField
                  type="number"
                  sx={{
                    '& input': {
                      width: '10px',
                      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button':
                        {
                          '-webkit-appearance': 'none',
                        },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                    inputProps: { min: 0, max: 100 },
                  }}
                  size="small"
                />
              )}
            </Box>
          </CardContent>
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
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
