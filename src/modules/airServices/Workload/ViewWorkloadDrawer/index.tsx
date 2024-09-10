import CommonDrawer from '@/components/CommonDrawer';
import useViewWorkloadDrawer from './useViewWorkloadDrawer';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Avatar, Grid, Typography } from '@mui/material';
import { styles } from './ViewWorkloadDrawer.styles';
import { drawerDetail, statusOptions } from './ViewWorkloadDrawer.data';
import {
  generateColorFromName,
  generateImage,
  getImageByType,
} from '@/utils/avatarUtils';
import { isValidElement } from 'react';
import { DYNAMIC_FORM_FIELDS_TYPES, isValidDate } from '@/utils/dynamic-forms';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export default function ViewWorkloadDrawer({ openDrawer, onClose, data }: any) {
  const {
    theme,
    handleSubmit,
    onSubmit,
    methods,
    patchTaskStatus,
    overviewData,
  } = useViewWorkloadDrawer({ onClose, dataGet: data });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={`#${data?.extendedProps?.taskId}`}
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={patchTaskStatus?.isLoading}
      isDisabled={patchTaskStatus?.isLoading}
      isLoading={patchTaskStatus?.isLoading}
    >
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Typography variant="body2" mb={-2}>
          {data?.extendedProps?.data?.assignedUser?.email ?? 'Email not found'}
        </Typography>
        <Grid item xs={10}>
          <RHFAutocomplete
            name="status"
            sx={styles?.statusFieldStyle}
            options={statusOptions}
            size="small"
          />
        </Grid>
        <Grid container spacing={2.5} sx={{ mt: 2, flexDirection: 'column' }}>
          {drawerDetail(data?.extendedProps?.data, theme)?.map((item: any) => (
            <Grid
              key={item?.id}
              item
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid item xs={6} sx={styles?.detailDrawerGridCenter}>
                <Typography
                  variant="body2"
                  sx={styles?.detailDrawerTitle(theme)}
                >
                  {item?.title}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={styles?.detailDrawerGridCenter}>
                {item?.profile && (
                  <Avatar
                    style={styles?.detailDrawerImg}
                    src={generateImage(item?.profile)}
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
                    {item?.workspace?.slice?.(0, 2)?.toUpperCase()}
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

          {Object?.entries(overviewData)?.map(([key, value]: any) => (
            <Grid
              key={key}
              item
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid item xs={6} sx={styles?.detailDrawerGridCenter}>
                <Typography
                  variant={'body2'}
                  sx={styles?.detailDrawerTitle(theme)}
                >
                  {key}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={'body2'}
                  fontWeight={400}
                  color={'slateBlue.main'}
                >
                  {isValidElement(value) ? (
                    value
                  ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                    value !== null &&
                    DYNAMIC_FORM_FIELDS_TYPES?.LABEL in value ? (
                    value?.label
                  ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                    value !== null &&
                    DYNAMIC_FORM_FIELDS_TYPES?.FILE_URL in value ? (
                    <Avatar
                      src={getImageByType(value?.fileType, value?.fileUrl)}
                      alt="file-preview"
                      sx={{ width: 45, height: 45 }}
                      variant={'rounded'}
                    />
                  ) : isValidDate(value) ? (
                    dayjs(value)?.format(DATE_FORMAT?.UI)
                  ) : (
                    value?.toString()
                  )}
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
  );
}
