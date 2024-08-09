import { Box, Grid, Typography } from '@mui/material';
import CheckboxCard from '../CheckboxCard';
import { importDataField, productData } from '../ImportModal.data';
import { FirstStepI } from './FirstStep.interface';

const FirstStep = (props: FirstStepI) => {
  const { handleSelect, importLog, product } = props;

  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Select Product and Object you’d like to Import
      </Typography>
      <Box my={2.4}>
        <Grid container>
          {importDataField?.map(
            (item: any) =>
              item?.tag === 'product' && (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ),
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.2,
        }}
      >
        {productData
          ?.filter((card) => card?.import === product)
          ?.map((card) => (
            <CheckboxCard
              key={card?.title}
              {...card}
              value={importLog}
              handleSelect={handleSelect}
            />
          ))}
      </Box>
    </>
  );
};

export default FirstStep;
