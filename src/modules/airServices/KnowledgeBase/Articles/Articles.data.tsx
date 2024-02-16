import { Checkbox, Chip, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { fullName } from '@/utils/avatarUtils';

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
  articlesList: any = [],
  selectedArticlesData: any,
  setSelectedArticlesData: any,
  handleSingleArticleNavigation: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedArticlesData?.find(
              (item: any) => item === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedArticlesData([
                  ...selectedArticlesData,
                  info?.getValue(),
                ])
              : setSelectedArticlesData(
                  selectedArticlesData?.filter(
                    (item: any) => item !== info?.getValue(),
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
            articlesList?.length
              ? selectedArticlesData?.length === articlesList?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedArticlesData(
                  articlesList?.map((article: any) => article?._id),
                )
              : setSelectedArticlesData([]);
          }}
          color="primary"
          name="id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.details,
      id: 'name',
      isSortable: false,
      header: 'Article',
      cell: (info: any) => {
        return (
          <Typography
            component={'span'}
            onClick={() =>
              handleSingleArticleNavigation(info?.row?.original?._id)
            }
            style={{ cursor: 'pointer', fontWeight: 600 }}
            dangerouslySetInnerHTML={{
              __html: info?.getValue()?.slice?.(0, 50),
            }}
          ></Typography>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      header: 'Status',
      isSortable: true,
      cell: (info: any) => (
        <Chip
          label={
            <Typography
              component={'span'}
              style={{ textTransform: 'capitalize' }}
            >
              {info?.getValue()}
            </Typography>
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
      header: `Inserted Tickets`,
      cell: (info: any) => info?.getValue()?.[0] ?? '---',
    },
    {
      accessorFn: (row: any) => row?.author,
      id: 'author',
      isSortable: true,
      header: 'Author',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.folder,
      id: 'folder',
      isSortable: true,
      header: 'Folder',
      cell: (info: any) => info?.getValue()?.name ?? '---',
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
    handleClick: (closeMenu: any) => {
      if (selectedArticlesData?.length > 1) {
        enqueueSnackbar('Please select only one', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      handleEditNavigation(selectedArticlesData?.[0]);
      closeMenu();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setOpenDeleteModal(true);
      closeMenu();
    },
  },
  {
    title: 'Move Folder',
    handleClick: (closeMenu: any) => {
      if (selectedArticlesData?.length > 1) {
        enqueueSnackbar('Please select only one', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      setMoveFolderModal(true);
      closeMenu();
    },
  },
];
