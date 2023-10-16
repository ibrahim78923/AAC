import {
  ItemStatusImage,
  ItemToInventoryImage,
  TotalItemImage,
} from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import {
  addToInventoryDrawerArray,
  addToInventorySecondDrawerArray,
} from './AddToInventoryDrawer.data';
import useAddToInventoryDrawer from './useAddToInventoryDrawer';
import { v4 as uuidv4 } from 'uuid';
import { addToInventoryDrawerStyle } from './AddToInventoryDrawer.style';
import { useState } from 'react';
export const AddToInventoryDrawer = ({
  isADrawerOpen,
  setIsADrawerOpen,
}: any) => {
  const { methods, handleSubmit, onSubmit, addNew } = useAddToInventoryDrawer();
  const [boolVariable, setBoolVariable] = useState(true);
  const submitHandler = () => {
    setBoolVariable(false);
  };
  return (
    <CommonDrawer
      isDrawerOpen={isADrawerOpen}
      onClose={() => {
        setIsADrawerOpen(false);
      }}
      title="Dell Monitor"
      submitHandler={submitHandler}
      footer={true}
      isOk={true}
      okText="Next"
    >
      {boolVariable === true ? (
        <>
          <Divider />
          <Grid
            container
            justifyContent={'space-between'}
            display={'flex'}
            flexDirection={'row'}
          >
            <Grid item xs={6} sx={addToInventoryDrawerStyle?.firstGridStyling}>
              <Image
                src={TotalItemImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={addToInventoryDrawerStyle?.firstMainGridBoxStyling}>
                <Typography variant="h6">Total items received:</Typography>
                <Typography variant="h6" component="span" sx={{ mt: '0.5rem' }}>
                  5/5
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              sx={addToInventoryDrawerStyle?.secondMainGridStyling}
            >
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={addToInventoryDrawerStyle?.fourthBoxStyling}>
                <Typography variant="h6">Item Status</Typography>
                <Typography
                  component="span"
                  sx={addToInventoryDrawerStyle?.recievedBoxStyling}
                >
                  Received
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            display={'Flex'}
            flexDirection={'column'}
            sx={addToInventoryDrawerStyle?.mainGridStyling}
          >
            <Grid
              item
              xs={12}
              sx={{ flexDirection: 'column', mb: '0rem', p: '1rem' }}
            >
              <Typography variant="h5">Items added to inventory</Typography>
              <Typography variant="body1">2</Typography>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              sx={addToInventoryDrawerStyle?.secondGridStyling}
            >
              <Box sx={{ width: '180px' }}>
                <FormProvider onSubmit={() => {}} methods={methods}>
                  <RHFTextField
                    name="description"
                    multiline
                    minRows={4}
                    fullWidth
                    placeholder="2"
                    label="Add"
                    required={true}
                  />
                </FormProvider>
              </Box>
              <Box sx={addToInventoryDrawerStyle?.secondBoxStyling}>
                <Typography variant="h6">Items to inventory</Typography>
                <Box sx={addToInventoryDrawerStyle?.thirdBoxStyling}>
                  <Image
                    src={ItemToInventoryImage}
                    height={24}
                    width={24}
                    alt="item Status"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={0.5}>
                {addToInventoryDrawerArray?.map((item: any) => (
                  <Grid item xs={4} md={item?.md} key={uuidv4()}>
                    {addNew !== item?.toShow && item?.component && (
                      <item.component {...item.componentProps} size={'small'}>
                        {item?.componentProps?.select
                          ? item?.options?.map((option: any) => (
                              <option key={option?.value} value={option?.value}>
                                {option?.label}
                              </option>
                            ))
                          : null}
                      </item.component>
                    )}
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Grid>
        </>
      ) : (
        <>
          <Divider />
          <Grid
            container
            justifyContent={'space-between'}
            display={'flex'}
            flexDirection={'row'}
          >
            <Grid
              item
              xs={6}
              sx={addToInventoryDrawerStyle?.secondMainsGridStyling}
            >
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={addToInventoryDrawerStyle?.fourthBoxStyling}>
                <Typography variant="h6">Item Status</Typography>
                <Typography
                  component="span"
                  sx={addToInventoryDrawerStyle?.recievedBoxStyling}
                >
                  Received
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  {addToInventorySecondDrawerArray?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={uuidv4()}>
                      <item.component {...item.componentProps} size={'small'}>
                        {item?.componentProps?.select
                          ? item?.options?.map((option: any) => (
                              <option key={option?.value} value={option?.value}>
                                {option?.label}
                              </option>
                            ))
                          : null}
                      </item.component>
                    </Grid>
                  ))}
                </Grid>
              </FormProvider>
            </Grid>
          </Grid>
        </>
      )}
    </CommonDrawer>
  );
};
