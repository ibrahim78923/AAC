import useImportTask from './useImportTask';
import { Import } from '@/components/Import';
import { CRM_COLUMNS } from './ImportTaskDrawer.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

const ImportTaskDrawer = ({ open, setIsImportTask }: any) => {
  const {
    setDrawerDefaultState,
    submitImport,
    filterMandatoryFields,
    importFileStatus,
  } = useImportTask(setIsImportTask);
  return (
    <Import
      isDrawerOpen={open}
      setIsDrawerOpen={setIsImportTask}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Task"
      crmColumnsOptions={CRM_COLUMNS}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
      hasNewImportApi={false}
    />
  );
};

export default ImportTaskDrawer;
