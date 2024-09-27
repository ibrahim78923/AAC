import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import { useMergedTickets } from './useMergeTickets';
import { fullName, fullNameInitial, truncateText } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { UserInfo } from '@/components/UserInfo';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const MergeTickets = () => {
  const {
    mergedTicketsFormMethod,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
    postMergeTicketsStatus,
    isPortalOpen,
    singleTicketDetail,
  }: any = useMergedTickets();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeMergedTicketsModal}
      dialogTitle="Merge"
      submitButtonText="Continue"
      showSubmitLoader={postMergeTicketsStatus?.isLoading}
      disabledCancelButton={postMergeTicketsStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitMergedTicketsForm)}
    >
      <FormProvider
        methods={mergedTicketsFormMethod}
        onSubmit={handleSubmit(submitMergedTicketsForm)}
      >
        <br />
        <Grid container spacing={1}>
          {mergeTicketsFormFields?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.heading ? item?.heading : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <br />
        <Typography
          variant="h6"
          mb={0.5}
          fontWeight={600}
          color="slateBlue.main"
        >
          Primary
        </Typography>
        <Box
          padding={1.5}
          borderRadius={2}
          border={`1px solid`}
          borderColor={'custom.off_white_three'}
        >
          <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
            <UserInfo
              nameInitial={fullNameInitial(
                singleTicketDetail?.departmentDetails?.name,
              )}
              name={singleTicketDetail?.ticketIdNumber}
              avatarSrc={singleTicketDetail?.attachment?.fileUrl}
              avatarSize={{ variant: 'rounded', height: 25, width: 25 }}
            />
            <Box
              display={'flex'}
              gap={1}
              flexWrap={'wrap'}
              alignItems={'center'}
            >
              <Typography color={'grey.900'}>
                Request for{' '}
                {fullName(
                  singleTicketDetail?.requesterDetails?.firstName,
                  singleTicketDetail?.requesterDetails?.lastName,
                )}
              </Typography>
              <Typography
                component={'span'}
                color="secondary"
                variant="body1"
                sx={{ wordBreak: 'break-all' }}
              >
                {truncateText(singleTicketDetail?.subject)}
              </Typography>
            </Box>
          </Box>
          <Typography color={'grey.0'} my={0.5}>
            From :{' '}
            <Typography component={'span'} color="secondary" variant="body1">
              {fullName(
                singleTicketDetail?.requesterDetails?.firstName,
                singleTicketDetail?.requesterDetails?.lastName,
              )}
            </Typography>
          </Typography>
          <Typography color="grey.0">
            Created :{' '}
            <Typography component={'span'} color="secondary" variant="body1">
              {formatTimeDifference(singleTicketDetail?.createdAt)}
            </Typography>
          </Typography>
        </Box>
      </FormProvider>
    </CustomCommonDialog>
  );
};
