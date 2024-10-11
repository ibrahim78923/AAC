import {
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import useItemsDetails from './useItemsDetails';
import { ItemDetail } from './ItemDetail';
import {
  itemsDetailsColumnsList,
  upsertPurchaseOrderItemDetailsDynamic,
} from './ItemsDetails.data';
import { useLazyGetAirServicesAssetsPurchaseOrderVendorProductsDropdownQuery } from '@/services/airServices/assets/purchase-orders';
import ItemBilling from './ItemBilling';
import { pxToRem } from '@/utils/getFontValue';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ItemsDetails = (props: any) => {
  const { name } = props;
  const { fields, append, vendorId, watch, remove, control } =
    useItemsDetails(props);

  const apiQueryVendorProducts: any =
    useLazyGetAirServicesAssetsPurchaseOrderVendorProductsDropdownQuery();

  return (
    <>
      <br />
      <Box boxShadow={1}>
        <TableContainer>
          <Table sx={{ minWidth: pxToRem(1800), width: '100%' }}>
            <TableHead>
              <TableRow>
                {itemsDetailsColumnsList?.map((column: any) => (
                  <TableCell key={column?.value}>{column?.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((item: any, index: any) => {
                return (
                  <TableRow key={item?.id}>
                    {upsertPurchaseOrderItemDetailsDynamic?.(
                      apiQueryVendorProducts,
                      index,
                      vendorId?._id,
                      remove,
                    )?.map((singleField: any) => (
                      <TableCell key={singleField?.id}>
                        <ItemDetail
                          data={singleField?.data}
                          index={index}
                          watch={watch}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          type="button"
          color="secondary"
          onClick={() => {
            append({
              itemName: null,
              description: '',
              quantity: null,
              costPerItem: null,
              taxRate: null,
              total: null,
            });
          }}
          startIcon={<AddCircleIcon />}
          sx={{ marginY: 2, marginLeft: 2 }}
        >
          Add Additional Items
        </Button>
      </Box>
      <br />
      <Typography variant="body1" color="error">
        {control?.getFieldState?.(name)?.error?.root?.message}
      </Typography>
      <br />
      <ItemBilling watch={watch} />
    </>
  );
};

export default ItemsDetails;
