import { CustomAvatarGroup } from '@/components/Avatars/CustomAvatarGroup';
import { CheckboxField } from '@/components/InputFields/CheckboxField';
import { TruncateText } from '@/components/TruncateText';
import { DATE_TIME_FORMAT } from '@/constants';
import { CANNED_RESPONSES } from '@/constants/strings';
import { otherDateFormat } from '@/lib/date-time';

export const responsesListColumnsDynamic = (
  responsesData: any,
  setResponsesData: any,
  responsesMainData: any,
): any => [
  {
    accessorFn: (row: { _id: string }) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <CheckboxField
        checked={
          !!responsesData?.find((item: any) => item?._id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([
                ...responsesData,
                responsesMainData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setResponsesData(
                responsesData?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
        name={info?.getValue()}
      />
    ),
    header: (
      <CheckboxField
        checked={
          !!responsesMainData?.length
            ? responsesData?.length === responsesMainData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([...responsesMainData])
            : setResponsesData([]);
        }}
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: { title: string }) => row?.title,
    id: 'title',
    header: 'Title',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: { createdAt: string }) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.DMYHMSA),
  },
  {
    accessorFn: (row: any) => ({
      availableFor: row?.availableFor,
      agents: row?.agentDetails,
    }),
    id: 'availableFor',
    isSortable: true,
    header: 'Available for',
    cell: (info: any) => {
      return (
        <>
          {info?.getValue()?.availableFor ===
          CANNED_RESPONSES?.SELECT_AGENTS ? (
            <CustomAvatarGroup
              max={4}
              selectedUsers={info?.getValue()?.agents}
            />
          ) : (
            <TruncateText
              text={info
                ?.getValue()
                ?.availableFor?.replace(/_/g, ' ')
                ?.toLowerCase()}
            />
          )}
        </>
      );
    },
  },
];
