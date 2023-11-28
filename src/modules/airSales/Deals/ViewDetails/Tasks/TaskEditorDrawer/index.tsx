import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import useTaskEditor from './useTaskEditor';

import {
  dealsTasksDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './TaskEditor.data';

import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

const TaskEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
  } = props;
  const { handleSubmit, onSubmit, methodsdealsTasks, onCloseDrawer } =
    useTaskEditor({
      selectedCheckboxes,
      openDrawer,
      setOpenDrawer,
      setSelectedCheckboxes,
    });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={!!openDrawer}
        onClose={onCloseDrawer}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsTasks}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {dealsTasksDataArray?.map((item: any) => (
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

export default TaskEditorDrawer;
