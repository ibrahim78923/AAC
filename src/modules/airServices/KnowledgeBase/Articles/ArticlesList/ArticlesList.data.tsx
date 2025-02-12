import { ArticlesTableRowI } from '../Articles.interface';
import { Typography } from '@mui/material';
import { fullName } from '@/utils/avatarUtils';
import { TruncateText } from '@/components/TruncateText';
import { TooltipItemsCountChip } from '@/components/Chip/TooltipItemsCountChip';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

const bgColor: any = {
  published: 'blue.main',
  draft: 'grey.400',
};
const color: any = {
  published: 'white',
  draft: 'slateBlue.main',
};

const chipColor: any = {
  published: 'secondary',
  draft: 'default',
};

export const styleFunction: any = (value: string) => ({
  bgColor: bgColor?.[value?.toLowerCase()],
  color: color?.[value?.toLowerCase()],
});

export const articlesListColumnsDynamic = (
  articlesList: any = [],
  selectedArticlesData: any,
  setSelectedArticlesData: any,
  handleSingleArticleNavigation: (id: string) => void,
) => {
  return [
    {
      accessorFn: (row: ArticlesTableRowI) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <CheckboxField
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
          name={info?.getValue()}
        />
      ),
      header: (
        <CheckboxField
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
          name="id"
        />
      ),
    },
    {
      accessorFn: (row: ArticlesTableRowI) => row?.title,
      id: 'title',
      isSortable: false,
      header: 'Article',
      cell: (info: any) => (
        <TruncateText
          text={info?.getValue()?.toLowerCase()}
          boxProps={{
            onClick: () =>
              handleSingleArticleNavigation(info?.row?.original?._id),
            sx: { cursor: 'pointer', fontWeight: 'fontWeightMedium' },
          }}
        />
      ),
    },
    {
      accessorFn: (row: ArticlesTableRowI) => row?.status,
      id: 'status',
      header: 'Status',
      isSortable: true,
      cell: (info: any) => (
        <CustomChip
          label={
            <Typography
              component={'span'}
              style={{ textTransform: 'capitalize' }}
              variant="body3"
            >
              {info?.getValue()?.toLowerCase()}
            </Typography>
          }
          size="small"
          color={chipColor?.[info?.getValue()?.toLowerCase()]}
        />
      ),
    },
    {
      accessorFn: (row: ArticlesTableRowI) => row?.ticketDetails,
      id: 'ticketDetails',
      isSortable: true,
      header: `Inserted Tickets`,
      cell: (info: any) => (
        <TooltipItemsCountChip
          data={info?.getValue()?.map((item: any) => ({
            label: item?.subject,
            _id: item?._id,
          }))}
        />
      ),
    },
    {
      accessorFn: (row: ArticlesTableRowI) => row?.author,
      id: 'author',
      isSortable: true,
      header: 'Author',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: ArticlesTableRowI) => row?.folder,
      id: 'folder',
      isSortable: true,
      header: 'Folder',
      cell: (info: any) => (
        <TruncateText text={info?.getValue()?.name?.toLowerCase()} />
      ),
    },
  ];
};
