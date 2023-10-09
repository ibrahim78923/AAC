import Image from 'next/image';
import {
  Grid,
  Typography,
  TextField,
  Popover,
  MenuItem,
  Button,
} from '@mui/material';
import { uuid } from 'uuidv4';
import { useForm } from 'react-hook-form';
import { ActionButtonIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { drawerDetail, tasksTableData } from '../Tasks.data';
import { DetailTaskDrawerI } from '../Tasks.interface';
import {
  taskStyles,
  taskDetailStyle,
  valStyle,
  statusOptionStyle,
} from '../TicketTasks.styles';
import { useTasks } from '../useTasks';

export const DetailTaskDrawer: React.FC<DetailTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
  taskDetail,
}) => {
  const {
    drawerStatusVal,
    drawerStatusPop,
    openDrawerStatus,
    handleStatusClick,
    handleStatusClose,
    handleStatusItemClick,
  } = useTasks();
  const handleSubmit = useForm();
  const taskDetailStatus = taskDetail?.status;
  const taskDetailBtn = taskDetailStyle(taskDetailStatus);
  const taskDetailItem = valStyle(drawerStatusVal);
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
        <Button
          sx={drawerStatusVal ? taskDetailItem[0] : taskDetailBtn[0]}
          endIcon={<ActionButtonIcon />}
          onClick={handleStatusClick}
        >
          {!drawerStatusVal ? taskDetail?.status : drawerStatusVal}
        </Button>
        <Popover
          open={openDrawerStatus}
          anchorEl={drawerStatusPop}
          onClose={handleStatusClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {tasksTableData?.map((i: any) => {
            const statusOption = i?.status;
            const optionStyle = statusOptionStyle(statusOption);
            return (
              <MenuItem
                key={uuid()}
                onClick={() => handleStatusItemClick(i.status)}
                sx={optionStyle[0]}
              >
                {i?.status}
              </MenuItem>
            );
          })}
        </Popover>
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
                rows={5}
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
