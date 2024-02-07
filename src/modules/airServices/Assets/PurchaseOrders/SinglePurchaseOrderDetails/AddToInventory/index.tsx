import {
  ItemStatusImage,
  ItemToInventoryImage,
  NoAssociationFoundImage,
  TotalItemImage,
} from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useAddToInventoryDrawer from './useAddToInventory';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  itemDetailColumns,
  purchaseDetailFormFieldsFunction,
} from './AddToInventory.data';
import { useFieldArray } from 'react-hook-form';

import NoData from '@/components/NoData';

export const AddToInventory = (props: any) => {
  const { isADrawerOpen, setIsADrawerOpen } = props;
  const {
    methodsNo,
    methodsYes,
    boolVariable,
    filteredYes,
    submitHandlerTwo,
    submitHandlerNo,
    submitHandlerYes,
    handleRadioChange,
    toShow,
    setToShow,
    purchaseOrderDetail,
    updateDate,
    handleRadioValueChange,
    selectedAssetId,
    apiQueryDepartment,
    methodsTwo,
    apiQueryLocations,
  } = useAddToInventoryDrawer(props);

  const { fields } = useFieldArray({
    control: methodsTwo?.control,
    name: 'test',
  });
  return (
    <CommonDrawer
      isDrawerOpen={isADrawerOpen}
      onClose={() => {
        setIsADrawerOpen(false);
      }}
      title="Dell Monitor"
      submitHandler={
        boolVariable
          ? toShow === true
            ? submitHandlerYes
            : submitHandlerNo
          : submitHandlerTwo
      }
      footer={true}
      isOk={true}
      okText={
        boolVariable
          ? toShow === true
            ? 'Next'
            : 'Add to Inventory'
          : 'Add to Inventory'
      }
    >
      {boolVariable ? (
        <>
          <Divider />
          <Grid
            container
            justifyContent={'space-between'}
            display={'flex'}
            flexDirection={'row'}
          >
            <Grid item xs={6} display={'flex'} flexDirection={'row'}>
              <Image
                src={TotalItemImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h6" ml={1}>
                  Total items received:
                </Typography>
                <Typography variant="h6" component="span" mt={1} ml={1}>
                  5/5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} display={'flex'} flexDirection={'row'}>
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box display={'flex'} flexDirection={'column'} marginLeft={0.5}>
                <Typography variant="h6">Status</Typography>
                <Chip
                  label={
                    purchaseOrderDetail?.status &&
                    `: ${purchaseOrderDetail?.status}`
                  }
                  color="primary"
                  variant="outlined"
                  sx={{ mt: '0.5rem' }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            display={'Flex'}
            flexDirection={'column'}
            borderRadius={2}
            border={'0.2rem solid'}
            borderColor={'primary.lighter'}
            marginTop={2}
            marginBottom={1}
          >
            <Grid
              item
              xs={12}
              display={'flex'}
              flexDirection={'column'}
              padding={1}
            >
              <Typography variant="h5">Items added to inventory</Typography>
              <Typography variant="body1" mt={1} ml={1}>
                {purchaseOrderDetail?.purchaseDetails?.[0]?.quantity}
              </Typography>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              display={'flex'}
              flexDirection={'row'}
              marginTop={1}
              padding={2}
            >
              <Box width={180}>
                <FormProvider onSubmit={() => {}} methods={methodsYes}>
                  <RHFTextField
                    name="description"
                    fullWidth
                    placeholder="2"
                    label="Add"
                    required={true}
                  />
                </FormProvider>
              </Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                marginLeft={3}
                marginTop={4}
              >
                <Typography variant="h6">Items to inventory</Typography>
                <Box marginLeft={1} marginTop={0.2}>
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
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={toShow ? 'Add New' : 'Update Existing'}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                onClick={() => {
                  setToShow(true);
                }}
                control={<Radio />}
                label="Add New"
                value="Add New"
              />
              <FormControlLabel
                onClick={() => {
                  setToShow(false);
                }}
                control={<Radio />}
                label="Update Existing"
                value="Update Existing"
              />
            </RadioGroup>
            <FormProvider
              methods={toShow === true ? methodsYes : methodsNo}
              onSubmit={toShow === true ? submitHandlerYes : submitHandlerNo}
            >
              <Grid container spacing={2}>
                {toShow === true ? (
                  filteredYes?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={item?.id}>
                      <item.component {...item?.componentProps} size="small" />
                    </Grid>
                  ))
                ) : (
                  <Grid
                    item
                    xs={12}
                    mt={2}
                    sx={{ maxHeight: '300px', overflowY: 'auto' }}
                  >
                    {updateDate ? (
                      updateDate.map((asset: any) => (
                        <Card key={asset?._id}>
                          <CardContent>
                            <FormControl component="fieldset">
                              <RadioGroup
                                row
                                aria-label="asset-radio-group"
                                name="asset-radio-group"
                                value={selectedAssetId}
                                onChange={handleRadioValueChange}
                              >
                                <FormControlLabel
                                  value={asset?._id?.toString()}
                                  control={<Radio />}
                                  label={asset.displayName}
                                />
                              </RadioGroup>
                            </FormControl>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <>
                        <NoData
                          image={NoAssociationFoundImage}
                          message={'no Data Found'}
                        />
                      </>
                    )}
                  </Grid>
                )}
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
              display={'flex'}
              flexDirection={'row'}
              marginBottom={2}
            >
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box>
                <Typography variant="h6">Item Status</Typography>
                <Chip
                  label="Received"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: '0.5rem' }}
                />
              </Box>
            </Grid>
            <Grid
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
            >
              <FormProvider methods={methodsTwo} onsubmit={submitHandlerTwo}>
                {' '}
                <TableContainer>
                  <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                      <TableRow>
                        {itemDetailColumns?.map((column: any) => (
                          <TableCell key={column}>{column}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields?.map((item: any, index: any) => {
                        return (
                          <TableRow key={item?.id}>
                            {purchaseDetailFormFieldsFunction?.(
                              methodsTwo?.control,
                              'test',
                              index,
                              apiQueryLocations,
                              apiQueryDepartment,
                            )?.map((singleField: any) => (
                              <TableCell key={item?.id}>
                                {singleField?.data}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </FormProvider>
            </Grid>
          </Grid>
        </>
      )}
    </CommonDrawer>
  );
};
