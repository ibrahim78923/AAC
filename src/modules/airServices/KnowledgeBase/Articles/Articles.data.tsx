import { Checkbox } from '@mui/material';
import { styles } from './Articles.style';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const data: any = [
  {
    id: 1,
    article: 'Time management',
    status: 'published',
    insertedTickets: 'sharemydine',
    author: 'alice',
    folder: 'tech support',
  },
  {
    id: 2,
    article: 'Time management',
    status: 'draft',
    insertedTickets: 'sharemydine',
    author: 'alice',
    folder: 'tech support',
  },
];

export const articlesColumnsFunction = (
  articlesList: any,
  selectedArticlesData: any,
  setSelectedArticlesData: any,
  handleSingleArticleNavigation: any,
) => {
  const { articleStatus }: any = styles();
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedArticlesData?.find(
              (item: any) => item?.id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedArticlesData([
                  ...selectedArticlesData,
                  articlesList?.find(
                    (item: any) => item?.id === info?.getValue(),
                  ),
                ])
              : setSelectedArticlesData(
                  selectedArticlesData?.filter((item: any) => {
                    return item?.id !== info?.getValue();
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
      accessorFn: (row: any) => row?.article,
      id: 'article',
      isSortable: true,
      header: <span>Article</span>,
      cell: (info: any) => (
        <span
          onClick={() => handleSingleArticleNavigation(info?.row?.id)}
          style={{ cursor: 'pointer', fontWeight: 500 }}
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
        <span style={{ ...articleStatus(info?.getValue()) }}>
          {info?.getValue()}
        </span>
      ),
    },
    {
      accessorFn: (row: any) => row?.insertedTickets,
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

export const articlesTabs = [
  'all',
  'training',
  'compliances',
  'hardware',
  'software',
  'payments',
];

export const actionBtnData = (
  setOpenDeleteModal: any,
  setMoveFolderModal: any,
  handleEditNavigation: any,
) => [
  {
    title: 'Edit',
    handleClick: (popClose: any) => {
      handleEditNavigation();
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
