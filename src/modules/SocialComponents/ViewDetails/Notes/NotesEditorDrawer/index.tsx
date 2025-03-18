import { Box, Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import useNotesEditorDrawer from './useNotesEditorDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import {
  dealsNotesDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './NotesEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { IMG_URL } from '@/config';

const NotesEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    companyId,
    rowData,
    setSelectedCheckboxes,
  } = props;

  const {
    handleSubmit,
    onSubmit,
    methods,
    updatedIsLoading,
    postIsLoading,
    reset,
  } = useNotesEditorDrawer(
    openDrawer,
    setOpenDrawer,
    companyId,
    rowData,
    setSelectedCheckboxes,
  );

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => {
          reset();
          setOpenDrawer('');
        }}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={updatedIsLoading || postIsLoading}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {dealsNotesDataArray(openDrawer)?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>

        {['Edit', 'View']?.includes(openDrawer) && (
          <>
            {rowData?.file?.url && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Attachments
                </Typography>
                <Image
                  src={`${IMG_URL}${rowData?.file?.url}`}
                  alt="attachment"
                  width={80}
                  height={80}
                  style={{ borderRadius: '8px' }}
                />
              </>
            )}
          </>
        )}
      </CommonDrawer>
    </div>
  );
};

export default NotesEditorDrawer;
