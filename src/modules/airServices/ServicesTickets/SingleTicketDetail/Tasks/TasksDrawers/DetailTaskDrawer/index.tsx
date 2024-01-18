import Image from 'next/image';
import { Avatar, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';
import { styles } from './DetailTaskDrawer.styles';
import { useDetailTaskDrawer } from './useDetailTaskDrawer';
import { drawerDetail, statusOptions } from './DetailTaskDrawer.data';
import { generateColorFromName } from '@/utils/avatarUtils';
export const DetailTaskDrawer = (props: any) => {
  const { isDrawerOpen, onClose, taskDetail } = props;
  const { theme, method, handleSubmit, onSubmitDrawer, isLoading } =
    useDetailTaskDrawer(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose(false)}
        title={`#TSK-${taskDetail?._id?.slice(-3)?.toUpperCase()}`}
        submitHandler={handleSubmit(onSubmitDrawer)}
        footer={true}
        isOk={true}
        okText="Update"
        isCancel={false}
        isLoading={isLoading}
      >
        <FormProvider onSubmit={handleSubmit(onSubmitDrawer)} methods={method}>
          <Typography variant="body2" position={'absolute'} top={65}>
            {taskDetail?.assignedUser?.email ?? 'Email not found'}
          </Typography>
          <Grid xs={10}>
            <RHFAutocomplete
              name="status"
              sx={styles?.statusFieldStyle}
              options={statusOptions}
              size="small"
            />
          </Grid>
          <Grid container spacing={2.5} sx={{ mt: 2, flexDirection: 'column' }}>
            {drawerDetail(taskDetail, theme)?.map((item: any) => (
              <Grid
                key={uuidv4()}
                item
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Grid xs={6} sx={styles?.detailDrawerGridCenter}>
                  <Typography
                    variant="body2"
                    sx={styles?.detailDrawerTitle(theme)}
                  >
                    {item?.title}
                  </Typography>
                </Grid>
                <Grid xs={6} sx={styles?.detailDrawerGridCenter}>
                  {item?.profile && (
                    <Image
                      style={styles?.detailDrawerImg}
                      src={item?.profile}
                      alt=""
                    />
                  )}
                  {item?.workspace && (
                    <Avatar
                      sx={{
                        bgcolor: generateColorFromName(item?.workspace),
                        width: 25,
                        height: 25,
                        fontSize: 14,
                        mr: 0.5,
                      }}
                      variant="rounded"
                    >
                      {item?.workspace?.slice(0, 2)?.toUpperCase()}
                    </Avatar>
                  )}
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    color={'slateBlue.main'}
                  >
                    {item?.details ? item?.details : '....'}
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <Grid item>
              <RHFTextField
                name="comments"
                label="Add Comment"
                multiline={true}
                rows={5}
                fullWidth={true}
                placeholder="Type here"
              />
            </Grid>
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
