import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Avatar, Grid, Typography } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';
import NoData from '@/components/NoData';
import useViewCompany from './useViewCompany';
import { formFields } from './ViewCompany.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export default function ViewCompany({ modalId, setModalId }: any) {
  const {
    onClose,
    data,
    isLoading,
    isFetching,
    isError,
    methodsNewCompany,
    refetch,
  } = useViewCompany({
    modalId,
    setModalId,
  });

  return (
    <CommonDrawer
      isDrawerOpen={modalId?.view}
      onClose={onClose}
      title={'Company Details'}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider methods={methodsNewCompany}>
          <Grid container spacing={2}>
            {formFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                {item?.id === 3 ? (
                  <>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="slateBlue.main"
                      mb={2}
                    >
                      Profile Picture
                    </Typography>
                    {data?.data?.profilePicture ? (
                      <Avatar
                        src={generateImage(data?.data?.profilePicture?.url)}
                        variant={'rounded'}
                        sx={{ width: 45, height: 45 }}
                      />
                    ) : (
                      <NoData
                        message={'No Profile Picture Found'}
                        height={'20vh'}
                      />
                    )}
                  </>
                ) : (
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    disabled
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
}
