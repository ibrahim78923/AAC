import { Import } from '@/components/Import';
import { OBJECT_URL_IMPORT } from '@/constants/strings';
import { CRM_COLUMNS_LOCATION } from './ImportLocation.data';
import { useImportLocation } from './useImportLocation';

export const ImportLocation = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    importFileStatus,
    filterMandatoryFields,
  } = useImportLocation?.(props);

  return (
    <Import
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import"
      crmColumnsOptions={CRM_COLUMNS_LOCATION}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};
