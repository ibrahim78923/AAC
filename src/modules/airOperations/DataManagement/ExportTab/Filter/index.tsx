import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useFilter } from './useFilter';
import { filterFields } from './Filter.data';
import { FilterI } from './Filter.interface';
import { FormGrid } from '@/components/Grids/FormGrid';

export const Filter = (props: FilterI) => {
  const { isOpenFilterDrawer } = props;
  const { methods, handleSubmit, onSubmit, clearFilter, onClose } =
    useFilter(props);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenFilterDrawer}
      onClose={() => onClose?.()}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Reset'}
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => clearFilter?.()}
      footer
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={filterFields} />
      </FormProvider>
    </CommonDrawer>
  );
};
