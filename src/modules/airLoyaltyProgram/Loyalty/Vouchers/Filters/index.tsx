import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilters } from './useFilters';
import { filtersFormFieldsDataFunction } from './Filters.data';
import { FormGrid } from '@/components/Grids/FormGrid';

export const Filters = (props: any) => {
  const {
    filtersOpen,
    handleSubmit,
    submitFiltersForm,
    methods,
    clearFilter,
    onClose,
  } = useFilters(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={filtersOpen}
        onClose={() => onClose?.()}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={() => handleSubmit(submitFiltersForm)()}
        cancelBtnHandler={() => clearFilter?.()}
        isOk
        cancelText={'Reset'}
        footer
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitFiltersForm)}
        >
          <FormGrid formFieldsList={filtersFormFieldsDataFunction} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
