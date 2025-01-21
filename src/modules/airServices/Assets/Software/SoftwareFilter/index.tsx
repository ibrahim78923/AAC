import { Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { softwareFilterDataArray } from './SoftwareFilter.data';
import { useSoftwareFilter } from './useSoftwareFilter';
import { SoftwareFilterI } from './SoftwareFilter.interface';
import { FormGrid } from '@/components/Grids/FormGrid';

export default function SoftwareFilter(props: SoftwareFilterI) {
  const { isOpenDrawer } = props;
  const { methods, handleSubmit, onSubmit, clearFilter, onClose } =
    useSoftwareFilter(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => onClose?.()}
        title={'Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Reset'}
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={() => clearFilter?.()}
        footer
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={softwareFilterDataArray} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}
