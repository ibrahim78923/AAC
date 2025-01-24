import { Box, Typography } from '@mui/material';
import CheckboxCard from '../CheckboxCard';
import { importDataField, productData } from '../ImportModal.data';
import { FirstStepI } from './FirstStep.interface';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

const FirstStep = (props: FirstStepI) => {
  const { handleSelect, importLog, product, productOptions } = props;

  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Select Product and Object you’d like to Import
      </Typography>
      <Box my={2.4}>
        <ContainerGrid>
          {importDataField(productOptions)?.map(
            (item: any) =>
              item?.tag === 'product' && (
                <CustomGrid key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </CustomGrid>
              ),
          )}
        </ContainerGrid>
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
