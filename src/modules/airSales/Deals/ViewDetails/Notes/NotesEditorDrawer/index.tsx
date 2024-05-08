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
    recordId,
  } = props;
  const {
    methodsdealsNotes,
    onCloseDrawer,
    handleSubmit,
    DRAWER_TYPES,
    loadingNote,
    onSubmit,
  } = useNotesEditorDrawer({
    setSelectedCheckboxes,
    selectedCheckboxes,
    setOpenDrawer,
    openDrawer,
    recordId,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onCloseDrawer}
        title={
          openDrawer === DRAWER_TYPES?.ADD
            ? drawerTitle?.Add
            : openDrawer === DRAWER_TYPES?.EDIT
            ? drawerTitle?.Edit
            : drawerTitle?.View
        }
        okText={
          openDrawer === DRAWER_TYPES?.ADD
            ? drawerButtonTitle?.Add
            : drawerButtonTitle?.Edit
        }
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer === DRAWER_TYPES?.VIEW ? false : true}
        isLoading={loadingNote}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsNotes}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {dealsNotesDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    disabled={openDrawer === DRAWER_TYPES?.VIEW}
                    {...item?.componentProps}
                    size={'small'}
                  >
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
