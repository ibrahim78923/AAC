import { useCustomizeInventoryColumn } from './useCustomizeInventoryColumn';
import { inventoryListsInitialColumns } from '../Inventory.data';
import { CustomizeInventoryColumnI } from './CustomizeInventoryColumn.interface';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const CustomizeInventoryColumn: React.FC<CustomizeInventoryColumnI> = (
  props,
) => {
  const { isCustomizeModalOpen, inventoryListsColumnsPersist } = props;
  const {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    applyAllCheckboxHandler,
  } = useCustomizeInventoryColumn(props);

  return (
    <CustomCommonDialog
      isPortalOpen={isCustomizeModalOpen}
      closePortal={onClose}
      dialogTitle="Select Fields"
      submitButtonText="Apply"
      handleSubmitButton={submit}
      canClose={false}
      extraTitle={
        <CheckboxField
          label={'Apply All'}
          checked={
            inventoryListsInitialColumns?.length === customizeColumn?.length
          }
          onChange={(e: any): any => applyAllCheckboxHandler?.(e)}
        />
      }
    >
      <ContainerGrid>
        {inventoryListsColumnsPersist?.slice?.(3)?.map((column: any) => (
          <CustomGrid sm={6} key={column?.id}>
            <CheckboxField
              name={column?.id}
              label={column?.header}
              checked={customizeColumn?.includes(column?.id)}
              onChange={(e: any): any => checkboxHandler?.(e, column)}
            />
          </CustomGrid>
        ))}
      </ContainerGrid>
    </CustomCommonDialog>
  );
};
