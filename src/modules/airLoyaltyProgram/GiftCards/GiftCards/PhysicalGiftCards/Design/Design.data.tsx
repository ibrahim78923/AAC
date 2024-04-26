import { PhysicalCardSmallImage } from '@/assets/images';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import Image from 'next/image';
// import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
export const data: any = [
  {
    _id: 6757,
    shop: 'Sharemydine',
    updatedAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
  {
    _id: 1745,
    shop: 'Sharemydine',
    updatedAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
];
export const designColumnsDynamic = (router: any): any => [
  {
    accessorFn: (row: any) => row?.shop,
    id: 'shop',
    header: 'Shop',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.updatedAt,
    id: 'updatedAt',
    header: 'Last updated',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'card',
    isSortable: true,
    header: 'Card',
    cell: () => (
      <Image src={PhysicalCardSmallImage} alt="card" width={0} height={0} />
    ),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: (info: any) => (
      <EditOutlinedIcon
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.EDIT_PHYSICAL_GIFT_CARD_DESIGN,
            query: {
              cardId: info?.row?.original?._id,
            },
          });
        }}
      />
    ),
  },
];
