import { Import } from '@/components/Import';
import { OBJECT_URL_IMPORT } from '@/constants/strings';
import { useImportVendor } from './useImportVendor';
import { CRM_COLUMNS_VENDOR } from './ImportVendor.data';
import { IVendorProps } from '../Vendor.interface';

export const ImportVendor = (props: IVendorProps) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    newImportFileForServicesStatus,
    filterMandatoryFields,
  } = useImportVendor?.(props);

  return (
    <Import
      isDrawerOpen={isDrawerOpen as boolean}
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
