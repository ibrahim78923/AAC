import useImportDeal from './useImportDeal';
import { Import } from '@/components/Import';
import { CRM_COLUMNS } from './ImportDealsDrawer.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

const ImportDealsDrawer = ({ open, setIsImportDeal }: any) => {
  const {
    setDrawerDefaultState,
    submitImport,
    filterMandatoryFields,
    importFileStatus,
  } = useImportDeal(setIsImportDeal);
  return (
    <Import
      isDrawerOpen={open}
      setIsDrawerOpen={setIsImportDeal}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Deals"
      crmColumnsOptions={CRM_COLUMNS}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};

export default ImportDealsDrawer;
