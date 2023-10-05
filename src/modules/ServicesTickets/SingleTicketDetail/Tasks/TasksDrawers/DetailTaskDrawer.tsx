import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { drawerDetail } from '../Tasks.mock';

export const DetailTaskDrawer = ({
  isDrawerOpen,
  onClose,
  taskDetail,
}: any) => {
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
              key={item?.id}
              item
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{ color: 'grey.600', fontWeight: 600 }}
                >
                  {item?.title}
                </Typography>
              </Grid>
              <Grid xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                {item?.profile && (
                  <Image
                    style={{
                      height: '16px',
                      width: '16px',
                      marginRight: '8px',
                    }}
                    src={item?.profile}
                    alt=""
                  />
                )}
                {item?.workspace && (
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: '#1d4289',
                      color: 'common.white',
                      borderRadius: '5px',
                      padding: '2px 8px',
                      marginRight: '8px',
                    }}
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
        </Grid>
      </CommonDrawer>
    </>
  );
};
