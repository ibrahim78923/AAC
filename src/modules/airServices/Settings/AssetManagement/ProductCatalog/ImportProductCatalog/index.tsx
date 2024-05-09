import { Import } from '@/components/Import';
import { useImportProductCatalog } from './useImportProductCatalog';
import { CRM_COLUMNS } from './ImportProductCatalog.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

export const ImportProductCatalog = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    importFileStatus,
    filterMandatoryFields,
  } = useImportProductCatalog?.(props);

  return (
    <Import
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Assets"
      crmColumnsOptions={CRM_COLUMNS}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};
