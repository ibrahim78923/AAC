import Image from 'next/image';
import { Grid, Typography, TextField } from '@mui/material';
import { uuid } from 'uuidv4';
import { useForm } from 'react-hook-form';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { drawerDetail } from '../Tasks.mock';
import { DetailTaskDrawerI } from '../Tasks.interface';
import { taskStyles } from '../TicketTasks.styles';

export const DetailTaskDrawer: React.FC<DetailTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
  taskDetail,
}) => {
  const handleSubmit = useForm();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          onClose(false);
        }}
        title={taskDetail?.taskID}
        submitHandler={() => {}}
        footer={true}
        isOk={true}
        okText="Update"
      >
        <Typography>{taskDetail?.taskName}</Typography>
        <Grid container spacing={1.5} sx={{ mt: 2, flexDirection: 'column' }}>
          {drawerDetail(taskDetail)?.map((item: any) => (
            <Grid
              key={uuid()}
              item
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid xs={6} sx={taskStyles?.detailDrawerGridCenter}>
                <Typography variant="body2" sx={taskStyles?.detailDrawerTitel}>
                  {item?.title}
                </Typography>
              </Grid>
              <Grid xs={6} sx={taskStyles?.detailDrawerGridCenter}>
                {item?.profile && (
                  <Image
                    style={taskStyles?.detailDrawerImg}
                    src={item?.profile}
                    alt=""
                  />
                )}
                {item?.workspace && (
                  <Typography
                    variant="body2"
                    sx={taskStyles?.detailDrawerWorspace}
                  >
                    {item?.workspace}
                  </Typography>
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
            <FormProvider onSubmit={() => {}} methods={handleSubmit}>
              <Typography variant="body2" sx={taskStyles?.detailDrawerTitel}>
                Add Comment
              </Typography>
              <TextField
                name="description"
                multiline={true}
                minRows={5}
                fullWidth={true}
                placeholder="Type here"
              />
            </FormProvider>
          </Grid>
        </Grid>
      </CommonDrawer>
    </>
  );
};
