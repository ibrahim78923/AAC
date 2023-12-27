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
  const { openDrawer, setOpenDrawer, companyId } = props;
  const { handleSubmit, onSubmit, methodsdealsNotes } = useNotesEditorDrawer(
    openDrawer,
    setOpenDrawer,
    companyId,
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
          <FormProvider methods={methodsdealsNotes}>
            <Grid container spacing={4}>
              {dealsNotesDataArray?.map((item: any) => (
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
    </div>
  );
};

export default NotesEditorDrawer;
