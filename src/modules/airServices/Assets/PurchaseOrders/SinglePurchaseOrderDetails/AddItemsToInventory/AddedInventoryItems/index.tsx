import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  addedInventoryItemsColumns,
  addedInventoryItemsFormFieldsFunction,
} from './AddedInventoryItems.data';
import {
  useLazyGetDepartmentDropdownForPurchaseOrderQuery,
  useLazyGetLocationsDropdownForPurchaseOrderQuery,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { ADDED_INVENTORY_METHODS } from '../AddItemsToInventory.data';

export const AddedInventoryItems: any = (props: any) => {
  const { fields, getValues, append, name } = props;

  const apiQueryDepartment =
    useLazyGetDepartmentDropdownForPurchaseOrderQuery?.();
  const apiQueryLocation = useLazyGetLocationsDropdownForPurchaseOrderQuery?.();

  return (
    <>
      <Box boxShadow={1}>
        <TableContainer>
          <Table sx={{ minWidth: '900px' }}>
            <TableHead>
              <TableRow>
                {addedInventoryItemsColumns?.map((column: any) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((item: any, index: any) => {
                return (
                  <TableRow key={item?.id}>
                    {addedInventoryItemsFormFieldsFunction?.(
                      name,
                      index,
                      apiQueryDepartment,
                      apiQueryLocation,
                    )?.map((singleField: any) => (
                      <TableCell key={singleField?.id}>
                        {singleField?.data}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {fields?.length === +getValues('addedItemsCount') ? (
          <></>
        ) : (
          <Button
            type="button"
            color="secondary"
            onClick={() => {
              append(
                Array?.from(
                  {
                    length:
                      +getValues('addedItemsCount') - fields?.length <
                      ADDED_INVENTORY_METHODS?.REVIEWED_AT_ONE_TIME
                        ? +getValues('addedItemsCount') - fields?.length
                        : ADDED_INVENTORY_METHODS?.REVIEWED_AT_ONE_TIME,
                  },
                  () => ({
                    displayName: getValues('displayName'),
                    impact: getValues('impact'),
                    location: getValues('location'),
                    department: getValues('department'),
                  }),
                ),
              );
            }}
            startIcon={<AddCircleIcon />}
            sx={{ marginY: 2, marginLeft: 2 }}
            disabled={+getValues('addedItemsCount') === fields?.length}
          >
            Show more items
          </Button>
        )}
      </Box>
    </>
  );
};
