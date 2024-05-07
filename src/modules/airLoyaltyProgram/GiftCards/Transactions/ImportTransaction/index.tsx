import { Import } from '@/components/Import';
import { OBJECT_URL_IMPORT } from '@/constants/strings';
import { CRM_COLUMNS_GIFT_CARD_TRANSACTION } from './Transaction.data';
import { useImportTransaction } from './useImportTransaction';

export const ImportTransaction = (props: any) => {
  const { isPortalOpen, setIsPortalOpen } = props;
  const {
    setDrawerDefaultState,
    submitImport,
    importFileStatus,
    filterMandatoryFields,
  } = useImportTransaction?.(props);

  return (
    <Import
      isDrawerOpen={isPortalOpen?.isImport}
      setIsDrawerOpen={setIsPortalOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import"
      crmColumnsOptions={CRM_COLUMNS_GIFT_CARD_TRANSACTION}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
    />
  );
};
