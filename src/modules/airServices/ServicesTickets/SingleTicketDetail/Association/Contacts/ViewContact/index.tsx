import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Avatar, Typography } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';
import NoData from '@/components/NoData';
import useViewContact from './useViewContact';
import { formFields } from './ViewContact.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { ARRAY_INDEX } from '@/constants/strings';

export default function ViewContact({ modalId, setModalId }: any) {
  const {
    onClose,
    data,
    isLoading,
    isFetching,
    refetch,
    isError,
    methodsNewContact,
  } = useViewContact({
    modalId,
    setModalId,
  });

  return (
    <CommonDrawer
      isDrawerOpen={modalId?.view}
      onClose={onClose}
      title={'View Contact Details'}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider methods={methodsNewContact}>
          <ContainerGrid>
            {formFields?.map((item: any) => (
              <CustomGrid key={item?.id}>
                {item?.id === ARRAY_INDEX?.TWO ? (
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
              </CustomGrid>
            ))}
          </ContainerGrid>
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
}
