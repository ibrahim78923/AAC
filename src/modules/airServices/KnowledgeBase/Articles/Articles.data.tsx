import { Checkbox, Chip, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName } from '@/utils/avatarUtils';
import { errorSnackbar } from '@/utils/api';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';

export const ALL_FOLDER = 'all';

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
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedArticlesData([
                  ...selectedArticlesData,
                  info?.row?.original,
                ])
              : setSelectedArticlesData(
                  selectedArticlesData?.filter(
                    (item: any) => item?._id !== info?.getValue(),
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
                  articlesList?.map((article: any) => article),
                )
              : setSelectedArticlesData([]);
          }}
          color="primary"
          name="id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.title,
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
          >
            {info?.getValue()?.slice?.(0, 50)}
          </Typography>
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
              {info?.getValue()?.toLowerCase()}
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
      cell: (info: any) => (
        <Typography variant={'body2'} textTransform={'capitalize'}>
          {info?.getValue()?.name ?? '---'}
        </Typography>
      ),
    },
  ];
};

export const actionBtnData = (
  setIsPortalOpen: any,
  router: any,
  selectedArticlesData: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.EDIT_ARTICLE,
    ],
    handleClick: (closeMenu: any) => {
      if (selectedArticlesData?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      router?.push({
        pathname: AIR_SERVICES?.KNOWLEDGE_BASE_VIEW_ARTICLE,
        query: { articleId: selectedArticlesData?.[ARRAY_INDEX?.ZERO] },
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.DELETE,
    ],
    handleClick: (closeMenu: any) => {
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Move Folder',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.MOVE_FOLDER,
    ],
    handleClick: (closeMenu: any) => {
      if (selectedArticlesData?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({ isOpen: true, isMoveFolder: true });
      closeMenu();
    },
  },
];
