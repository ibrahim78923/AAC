import { Import } from '@/components/Import';
import { OBJECT_URL_IMPORT } from '@/constants/strings';
import { useImportVendor } from './useImportVendor';
import { CRM_COLUMNS_VENDOR } from './ImportVendor.data';

export const ImportVendor = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    newImportFileForServicesStatus,
    filterMandatoryFields,
  } = useImportVendor?.(props);

  return (
    <Import
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import"
      crmColumnsOptions={CRM_COLUMNS_VENDOR}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={newImportFileForServicesStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};
