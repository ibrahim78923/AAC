import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import useNotesEditorDrawer from './useNotesEditorDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import {
  dealsNotesDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './NotesEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const NotesEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, companyId, rowData } = props;
  const { handleSubmit, onSubmit, methods } = useNotesEditorDrawer(
    openDrawer,
    setOpenDrawer,
    companyId,
    rowData,
  );

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {dealsNotesDataArray?.map((item: any) => (
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
      </CommonDrawer>
    </div>
  );
};

export default NotesEditorDrawer;
