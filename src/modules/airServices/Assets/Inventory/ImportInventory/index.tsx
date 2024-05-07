import { OBJECT_URL_IMPORT } from '@/constants/strings';
import { Import } from '@/components/Import';
import { useImportInventory } from './useImportInventory';
import { CRM_COLUMNS_INVENTORY } from './ImportInventory.data';

export const ImportInventory = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    filterMandatoryFields,
    importFileStatus,
  } = useImportInventory?.(props);

  return (
    <Import
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Assets"
      crmColumnsOptions={CRM_COLUMNS_INVENTORY}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};
