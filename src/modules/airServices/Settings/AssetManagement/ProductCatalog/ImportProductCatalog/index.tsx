import { Import } from '@/components/Import';
import { useImportProductCatalog } from './useImportProductCatalog';
import { CRM_COLUMNS } from './ImportProductCatalog.data';
import { IMPORT_ACTION_TYPE, OBJECT_URL_IMPORT } from '@/constants/strings';

export const ImportProductCatalog = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { setDrawerDefaultState } = useImportProductCatalog?.(props);
  return (
    <Import
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
      title="Import Assets"
      crmColumnsOptions={CRM_COLUMNS}
      objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
      actionType={IMPORT_ACTION_TYPE?.DEALS}
    />
  );
};
