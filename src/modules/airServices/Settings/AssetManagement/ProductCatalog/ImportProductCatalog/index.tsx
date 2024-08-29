import { Import } from '@/components/Import';
import { useImportProductCatalog } from './useImportProductCatalog';
import { CRM_COLUMNS } from './ImportProductCatalog.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';
import { IProductCatalogProps } from '../ProductCatalog.interface';

export const ImportProductCatalog = (props: IProductCatalogProps) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    newImportFileForServicesStatus,
    filterMandatoryFields,
  } = useImportProductCatalog?.(props);

  return (
    <Import
      isDrawerOpen={isDrawerOpen as boolean}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Assets"
      crmColumnsOptions={CRM_COLUMNS}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={newImportFileForServicesStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};
