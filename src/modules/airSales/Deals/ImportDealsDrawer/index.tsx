import useImportDeal from './useImportDeal';
import { Import } from '@/components/Import';
import { CRM_COLUMNS } from './ImportDealsDrawer.data';
import { ImportDealsDrawerProps } from './ImportDealDrawer-interface';

const ImportDealsDrawer = ({
  open,
  setIsImportDeal,
}: ImportDealsDrawerProps) => {
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
      submitImport={(apiData: any) => submitImport?.(apiData)}
      importFileStatus={importFileStatus}
      mandatoryColumnsList={filterMandatoryFields?.()}
      hasNewImportApi={false}
    />
  );
};

export default ImportDealsDrawer;
