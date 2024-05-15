import useImportCompanies from './useImportCompanies';
import { Import } from '@/components/Import';
import { CRM_COLUMNS } from './importCompanies.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

const ImportCompanies = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const {
    setDrawerDefaultState,
    filterMandatoryFields,
    importFileStatus,
    submitImport,
  } = useImportCompanies(setIsDrawerOpen);

  return (
    <>
      <Import
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        setDrawerDefaultState={setDrawerDefaultState}
        title="Import Companies"
        crmColumnsOptions={CRM_COLUMNS}
        objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
        submitImport={(apiData: any) => submitImport?.(apiData)}
        importFileStatus={importFileStatus}
        mandatoryColumnsList={filterMandatoryFields?.()}
      />
    </>
  );
};

export default ImportCompanies;
