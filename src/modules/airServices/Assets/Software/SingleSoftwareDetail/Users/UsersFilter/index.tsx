import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useUsersFilter } from './useUsersFilter';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UsersFilter = (props: any) => {
  const { isPortalOpen } = props;
  const {
    userFieldsData,
    methods,
    handleSubmit,
    submitFilter,
    resetFormAndCloseDrawer,
    closeDrawer,
  } = useUsersFilter(props);

  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={closeDrawer}
        title={'Filters'}
        okText={'Apply'}
        cancelText={'Reset'}
        footer
        isOk
        submitHandler={handleSubmit(submitFilter)}
        cancelBtnHandler={handleSubmit(resetFormAndCloseDrawer)}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(submitFilter)}>
          <FormGrid formFieldsList={userFieldsData} />
        </FormProvider>
      </CommonDrawer>
    </Box>
  );
};
