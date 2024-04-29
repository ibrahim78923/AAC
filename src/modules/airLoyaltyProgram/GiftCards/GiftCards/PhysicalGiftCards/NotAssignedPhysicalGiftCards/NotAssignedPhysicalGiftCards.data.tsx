import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  DocumentIcon,
} from '@/assets/icons';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Checkbox, Typography } from '@mui/material';

export const notAssignedPhysicalGiftCardColumnsFunction = (
  router: any,
  selectedUnAssignedPhysicalCards: any,
  setSelectedUnAssignedPhysicalCards: any,
  notAssignedPhysicaldata: any,
  setIsPortalOpen: any,
  overallPermissions: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedUnAssignedPhysicalCards?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUnAssignedPhysicalCards([
                ...selectedUnAssignedPhysicalCards,
                notAssignedPhysicaldata?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedUnAssignedPhysicalCards(
                selectedUnAssignedPhysicalCards?.filter(
                  (item: any) => item?.id !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!notAssignedPhysicaldata?.length
            ? selectedUnAssignedPhysicalCards?.length ===
              notAssignedPhysicaldata?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUnAssignedPhysicalCards(
                notAssignedPhysicaldata?.map((item: any) => item),
              )
            : setSelectedUnAssignedPhysicalCards([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => (
      <Typography
        color={'black'}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          if (
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.VIEW_GIFT_CARD_DETAILS
          )
            return;
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.SINGLE_GIFT_CARD_TRANSACTION_DETAIL,
            query: {
              giftCardId: info?.row?.id,
              type: 'physical',
              category: 'unassigned',
            },
          });
        }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.shop,
    id: 'shop',
    header: 'Shop',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  ...(overallPermissions?.includes(
    AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.ASSIGNED_TO,
  ) ||
  overallPermissions?.includes(
    AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.PRINT,
  )
    ? [
        {
          accessorFn: (row: any) => row?.actions,
          id: 'actions',
          isSortable: true,
          header: 'Actions',
          cell: (info: any) => (
            <Box display={'flex'}>
              <PermissionsGuard
                permissions={[
                  AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.PRINT,
                ]}
              >
                <DocumentIcon />
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.ASSIGNED_TO,
                ]}
              >
                <Typography
                  onClick={() =>
                    setIsPortalOpen({ isOpen: true, isAssigned: true })
                  }
                  sx={{ cursor: 'pointer' }}
                  color={'primary'}
                >
                  {info?.row?.original?.actions}
                </Typography>
              </PermissionsGuard>
            </Box>
          ),
        },
      ]
    : []),
];
