import CommonDrawer from '@/components/CommonDrawer';
import useViewWorkloadDrawer from './useViewWorkloadDrawer';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { styles } from './ViewWorkloadDrawer.styles';
import { drawerDetail, statusOptions } from './ViewWorkloadDrawer.data';
import { generateColorFromName } from '@/utils/avatarUtils';
import { DynamicFormDataDisplay } from '@/components/DynamicForm/DynamicFormDataDisplay';
import { pxToRem } from '@/utils/getFontValue';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';

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
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={patchTaskStatus?.isLoading}
      isDisabled={patchTaskStatus?.isLoading}
      isLoading={patchTaskStatus?.isLoading}
      titleSx={{ width: '100%' }}
      titleBoxSx={{ flex: 1, marginBottom: 0.2 }}
      title={
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 0,
            flexWrap: 'wrap',
            paddingRight: 1,
          }}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            {data?.extendedProps?.taskId}
          </Typography>
          <Box sx={{ flex: 1 }}>
            <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
              <RHFAutocomplete
                name="status"
                fullWidth
                sx={{
                  minWidth: { xs: 'inherit', sm: pxToRem(200) },
                  '.MuiInputBase-input': {
                    padding: `${pxToRem(5)} !important`,
                  },
                  '.MuiFormHelperText-root': {
                    display: 'none',
                  },
                  '& .MuiOutlinedInput-root ': {
                    height: pxToRem(36),
                  },
                }}
                options={statusOptions}
                size="small"
                isOptionEqualToValue={(option: any, newValue: any) =>
                  option === newValue
                }
              />
            </FormProvider>
          </Box>
        </Box>
      }
    >
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Typography variant="body2">
          {data?.extendedProps?.assignedUser?.email ?? 'Email not found'}
        </Typography>
        {drawerDetail(data?.extendedProps, theme)?.map((item: any) => (
          <Box
            key={item?.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              my: 2,
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={styles?.detailDrawerTitle(theme)}>
                {item?.title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item?.profile && <CustomAvatar avatarSrc={item?.profile} />}
              {item?.workspace && (
                <CustomAvatar
                  backgroundColor={generateColorFromName(item?.workspace)}
                  avatarSize={{
                    variant: AVATAR_VARIANTS?.ROUNDED,
                  }}
                  avatarSrc=""
                  nameInitial={item?.workspace?.slice?.(0, 2)}
                />
              )}
              <Typography
                variant="body2"
                fontWeight={400}
                color={'slateBlue.main'}
              >
                {item?.details ? item?.details : '....'}
              </Typography>
            </Box>
          </Box>
        ))}

        {Object?.entries(overviewData)?.map(([key, value]: any) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: 2,
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant={'body2'}
                sx={styles?.detailDrawerTitle(theme)}
              >
                {key}:
              </Typography>
            </Box>
            <Box>
              <Typography
                variant={'body2'}
                fontWeight={400}
                color={'slateBlue.main'}
                component={'div'}
              >
                <DynamicFormDataDisplay value={value} />
              </Typography>
            </Box>
          </Box>
        ))}
        <RHFTextField
          name="comments"
          label="Add Comment"
          multiline
          rows={5}
          fullWidth
          placeholder="Type here"
        />
      </FormProvider>
    </CommonDrawer>
  );
}
