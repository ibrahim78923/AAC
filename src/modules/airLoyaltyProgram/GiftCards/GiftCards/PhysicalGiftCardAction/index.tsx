// PhysicalGiftCardAction.js
import React, { useState } from 'react';
import { Box, Grid, Button, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import CommonDrawer from '@/components/CommonDrawer';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultValuesGiftCardDownloadType,
  giftCardData,
  giftCardDownloadData,
  validationSchemaGiftCardDownloadType,
} from './PhysicalGiftCardAction.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

const PhysicalGiftCardAction = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const theme = useTheme();

  const giftCardDownloadTypeMethods: any = useForm({
    resolver: yupResolver(validationSchemaGiftCardDownloadType),
    defaultValues: defaultValuesGiftCardDownloadType,
  });

  const giftActionCardHandler = () => {
    setIsOpenDrawer(true);
  };
  return (
    <>
      <Grid container>
        <Box>
          <Button onClick={giftActionCardHandler}>Action</Button>
        </Box>
        <CommonDrawer
          isDrawerOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          title={'Physical Gift Card'}
          okText={'Download'}
          isOk
          cancelText={'Cancel'}
          footer
        >
          {giftCardData.map((card) => (
            <Grid key={card.id} xs={12} marginBottom={'.50rem'}>
              <Typography variant="body1" color={theme?.palette?.grey[600]}>
                {card.titleCard}
              </Typography>
              <Box
                bgcolor={'#74DACB'}
                padding={card.cardImageTwo ? '1rem' : '2.15rem'}
                borderRadius={'1rem'}
              >
                <Box
                  display={'flex'}
                  justifyContent={
                    card.cardImageTwo ? 'space-between' : 'center'
                  }
                >
                  <Image
                    key={`${card.id}_image_0`}
                    src={card.cardImages}
                    alt={`Card Image 1`}
                  />
                  {card.cardImageTwo && (
                    <Image
                      key={`${card.id}_image_1`}
                      src={card.cardImageTwo}
                      alt={`Card Image 2`}
                    />
                  )}
                </Box>
                <Box>
                  <Typography variant="body1">{card.titleName}</Typography>
                  <Typography variant="body1">
                    {card.titleDescriptionName}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          <FormProvider methods={giftCardDownloadTypeMethods}>
            <Grid container spacing={3}>
              {giftCardDownloadData?.map((form: any) => (
                <Grid item xs={12} key={form?.id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </CommonDrawer>
      </Grid>
    </>
  );
};

export default PhysicalGiftCardAction;
