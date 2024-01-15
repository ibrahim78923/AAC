import { Box, Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
// import Search from '@/components/Search';

import useDealEditorDrawer from './useDealEditorDrawer';

import { dealDataArray } from './DealEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const DealEditorDrawer = (props: any) => {
  const { isOpen, onClose, title } = props;
  const {
    // dealType,
    // handleChangeDealType,
    handleSubmit,
    onSubmit,
    methodsProducts,
  } = useDealEditorDrawer();

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={onClose}
      title={`${title} Deal`}
      okText={title}
      isOk={true}
      footer={title === 'View' ? false : true}
    >
      <Box sx={{ pt: 2 }}>
        <Grid container spacing={'22px'}>
          {/* <Grid item xs={12}>
            <RadioGroup name="dealType" row onChange={handleChangeDealType} value={dealType}>
              <FormControlLabel value="newDeal" control={<Radio />} label="New Deal" />
              <FormControlLabel value="existingDeal" control={<Radio />} label="existingDeal" />
            </RadioGroup>
          </Grid> */}
        </Grid>
        <FormProvider
          methods={methodsProducts}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={'22px'}>
            {dealDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
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
      </Box>
    </CommonDrawer>
  );
};

export default DealEditorDrawer;
