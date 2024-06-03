import useImportDeal from './useImportContactDrawer';
import { Import } from '@/components/Import';
import { CRM_COLUMNS } from './ImportContactDrawer.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

const ImportContactDrawer = ({ open, setIsImportDrawer }: any) => {
  const {
    setDrawerDefaultState,
    submitImport,
    filterMandatoryFields,
    importFileStatus,
  } = useImportDeal(setIsImportDrawer);
  return (
    <Import
      isDrawerOpen={open}
      setIsDrawerOpen={setIsImportDrawer}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Contacts"
      crmColumnsOptions={CRM_COLUMNS}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
      hasNewImportApi={false}
    />
  );
};

export default ImportContactDrawer;
