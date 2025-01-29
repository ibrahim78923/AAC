import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { useViewCompany } from './useViewCompany';

export const ViewCompany = (props: any) => {
  const { modalId } = props;

  const {
    onClose,
    isLoading,
    isFetching,
    isError,
    methodsNewCompany,
    refetch,
    viewCompanyFormFields,
  } = useViewCompany(props);

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
          <FormGrid disabled formFieldsList={viewCompanyFormFields} />
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

export default ViewCompany;
