import { Import } from '@/components/Import';
import { useImportProductCatalog } from './useImportProductCatalog';

export const ImportProductCatalog = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { setDrawerDefaultState } = useImportProductCatalog?.(props);
  return (
    <Import
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setDrawerDefaultState={setDrawerDefaultState}
    />
  );
};
