import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import useViewContact from './useViewContact';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

export default function ViewContact(props: any) {
  const { modalId } = props;

  const {
    onClose,
    isLoading,
    isFetching,
    refetch,
    isError,
    methodsNewContact,
    viewContactFormFields,
  } = useViewContact(props);

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
          <FormGrid disabled formFieldsList={viewContactFormFields} />
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
}
