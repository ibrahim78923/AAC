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
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { drawerDetail, tasksTableData } from '../Tasks.mock';
import { DetailTaskDrawerI } from '../Tasks.interface';
import { taskStyles } from '../TicketTasks.styles';
import { useState } from 'react';

export const DetailTaskDrawer: React.FC<DetailTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
  taskDetail,
}) => {
  const [val, setVal] = useState(null);
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const handleMenuItemClick = (selectedStatus: any) => {
    setVal(selectedStatus);
    setActionPop(null);
  };
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
        <Button
          sx={{
            position: 'absolute',
            top: 7,
            right: '4rem',
            border: `1px solid ${
              val === 'To do'
                ? '#38CAB5'
                : val === 'In-Progress'
                ? '#0AADC7'
                : '#FF4A4A'
            }`,
            bgcolor:
              val === 'To do'
                ? '#EBFAF8'
                : val === 'In-Progress'
                ? '#E6F7F9'
                : '#FFEDED',
            color:
              val === 'To do'
                ? '#38CAB5'
                : val === 'In-Progress'
                ? '#0AADC7'
                : '#FF4A4A',
            padding: '8px 18px',
            width: '18%',
          }}
          onClick={handleActionClick}
        >
          {!val ? taskDetail?.status : val}
        </Button>
        <Popover
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {tasksTableData?.map((i: any) => (
            <MenuItem
              key={uuid()}
              onClick={() => handleMenuItemClick(i.status)}
              sx={{
                border: `1px solid ${
                  i?.status === 'To do'
                    ? '#38CAB5'
                    : i?.status === 'In-Progress'
                    ? '#0AADC7'
                    : '#FF4A4A'
                }`,
                bgcolor:
                  i?.status === 'To do'
                    ? '#EBFAF8'
                    : i?.status === 'In-Progress'
                    ? '#E6F7F9'
                    : '#FFEDED',
                color:
                  i?.status === 'To do'
                    ? '#38CAB5'
                    : i?.status === 'In-Progress'
                    ? '#0AADC7'
                    : '#FF4A4A',
                width: 'fit-content',
                borderRadius: '4px',
                m: '10px',
                p: '2px 14px',
              }}
            >
              {i?.status}
            </MenuItem>
          ))}
        </Popover>
        <Popover open={false}></Popover>
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
