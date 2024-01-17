import { Checkbox, Chip } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

const bgColor: any = {
  published: 'blue.main',
  draft: 'grey.400',
};
const color: any = {
  published: 'white',
  draft: 'slateBlue.main',
};

export const styleFunction: any = (value: any) => ({
  bgColor: bgColor?.[value?.toLowerCase()],
  color: color?.[value?.toLowerCase()],
});
export const articlesColumnsFunction = (
  articlesList: any,
  selectedArticlesData: any,
  setSelectedArticlesData: any,
  handleSingleArticleNavigation: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedArticlesData?.find(
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedArticlesData([
                  ...selectedArticlesData,
                  articlesList?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setSelectedArticlesData(
                  selectedArticlesData?.filter((item: any) => {
                    return item?._id !== info?.getValue();
                  }),
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
          checked={selectedArticlesData?.length === articlesList?.length}
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedArticlesData([...articlesList])
              : setSelectedArticlesData([]);
          }}
          color="primary"
          name="id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'article',
      isSortable: true,
      header: <span>Article</span>,
      cell: (info: any) => (
        <span
          onClick={() => handleSingleArticleNavigation(info?.row?._id)}
          style={{ cursor: 'pointer', fontWeight: 600 }}
        >
          {info?.getValue()}
        </span>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      header: <span>Status</span>,
      isSortable: true,
      cell: (info: any) => (
        <Chip
          label={
            <span style={{ textTransform: 'capitalize' }}>
              {info?.getValue()}
            </span>
          }
          size="small"
          sx={{
            backgroundColor: styleFunction?.(info?.getValue())?.bgColor,
            color: styleFunction?.(info?.getValue())?.color,
          }}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.insertedTicket,
      id: 'insertedTickets',
      isSortable: true,
      header: <span>Inserted Tickets</span>,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.author,
      id: 'author',
      isSortable: true,
      header: <span>Author</span>,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.folder,
      id: 'folder',
      isSortable: true,
      header: <span>Folder</span>,
      cell: (info: any) => info?.getValue(),
    },
  ];
};

export const actionBtnData = (
  setOpenDeleteModal: any,
  setMoveFolderModal: any,
  handleEditNavigation: any,
  selectedArticlesData: any,
) => [
  {
    title: 'Edit',
    handleClick: (popClose: any) => {
      handleEditNavigation(selectedArticlesData?.[0]?._id);
      popClose();
    },
  },
  {
    title: 'Delete',
    handleClick: (popClose: any) => {
      setOpenDeleteModal(true);
      popClose();
    },
  },
  {
    title: 'Move Folder',
    handleClick: (popClose: any) => {
      setMoveFolderModal(true);
      popClose();
    },
  },
];
