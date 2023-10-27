import Image from 'next/image';
import {
  Grid,
  Typography,
  TextField,
  Popover,
  MenuItem,
  Button,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { ActionButtonIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { tasksTableData } from '../../Tasks.data';
import { styles } from './DetailTaskDrawer.styles';
import { DetailTaskDrawerI } from './DetailTaskDrawer.interface';
import { useDetailTaskDrawer } from './useDetailTaskDrawer';
import { drawerDetail } from './DetailTaskDrawer.data';

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
    theme,
  } = useDetailTaskDrawer();
  const handleSubmit = useForm();
  const taskDetailStatus = taskDetail?.status;
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
          sx={
            drawerStatusVal
              ? styles?.valStyle(drawerStatusVal, theme)
              : styles?.taskDetailStyle(taskDetailStatus, theme)
          }
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
            return (
              <MenuItem
                key={uuidv4()}
                onClick={() => handleStatusItemClick(i?.status)}
                sx={styles?.statusOptionStyle(statusOption, theme)}
              >
                {i?.status}
              </MenuItem>
            );
          })}
        </Popover>
        <Grid container spacing={1.5} sx={{ mt: 2, flexDirection: 'column' }}>
          {drawerDetail(taskDetail, theme)?.map((item: any) => (
            <Grid
              key={uuidv4()}
              item
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid xs={6} sx={styles?.detailDrawerGridCenter}>
                <Typography
                  variant="body2"
                  sx={styles?.detailDrawerTitel(theme)}
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
                  <Typography
                    variant="body2"
                    sx={styles?.detailDrawerWorspace(theme)}
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
              <Typography variant="body2" sx={styles?.detailDrawerTitel(theme)}>
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
