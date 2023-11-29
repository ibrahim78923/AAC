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
  const {
    openDrawer,
    setOpenDrawer,
    setSelectedCheckboxes,
    selectedCheckboxes,
  } = props;
  const { handleSubmit, onSubmit, methodsdealsNotes, onCloseDrawer } =
    useNotesEditorDrawer({
      openDrawer,
      setSelectedCheckboxes,
      setOpenDrawer,
      selectedCheckboxes,
    });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onCloseDrawer}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsNotes}
            onSubmit={handleSubmit(onSubmit)}
          >
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
