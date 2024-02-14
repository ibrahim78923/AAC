import { DeleteIcon, EditPenBorderedIcon } from '@/assets/icons';
import { Box, Button } from '@mui/material';

export const templateWhatsAppMarketing = [
  {
    templateName: 'Fund Raising',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con',
    category: ' Account update',
    createdAt: ' 31-Dec-2023',
  },
];

export const columns = ({
  handelSwitch,
  setIsCreateTemplate,
  setTemplateType,
  setIsDeleteTemplate,
}: any) => {
  return [
    {
      accessorFn: (row: any) => row?.templateName,
      id: 'templateName',
      cell: (info: any) => info?.getValue(),
      header: 'Template Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: false,
      header: 'Description',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.category,
      id: 'category',
      isSortable: false,
      header: 'Category',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: false,
      header: 'Created Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: () => (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            sx={{
              background: '',
              padding: '0',
              minWidth: '30px',
              height: '30px',
              borderRadius: '50%',
            }}
            onClick={() => {
              handelSwitch(false);
              setIsCreateTemplate(true);
              setTemplateType('Edit');
            }}
          >
            <EditPenBorderedIcon size={20} />{' '}
          </Button>
          <Button
            sx={{
              background: '',
              padding: '0',
              minWidth: '30px',
              height: '30px',
              borderRadius: '50%',
            }}
            onClick={() => setIsDeleteTemplate(true)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ),
      header: 'Actions',
      isSortable: false,
    },
  ];
};
