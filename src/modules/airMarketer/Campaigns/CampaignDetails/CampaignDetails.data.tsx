import { DATE_FORMAT } from '@/constants';
import { Tooltip } from '@mui/material';
import dayjs from 'dayjs';

export const campaignDetailsData = (campaignsById: any) => {
  const campaignsData = campaignsById?.data[0];

  return [
    {
      deatilsName: 'Campaign Name',
      detailsDes: campaignsData?.title ?? 'N/A',
    },
    {
      deatilsName: 'Campaign Owner',
      detailsDes:
        campaignsData?.campaignOwnerDetails?.length > 0
          ? campaignsData?.campaignOwnerDetails?.map(
              (item: any) => `${item?.firstName} ${item?.lastName}`,
            )
          : 'N/A',
    },
    {
      deatilsName: 'Owner Email',
      detailsDes:
        campaignsData?.campaignOwnerDetails?.length > 0
          ? campaignsData?.campaignOwnerDetails?.map((item: any) => (
              <Tooltip title={item?.email} key={item?.title}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px',
                  }}
                >
                  {campaignsData.campaignOwnerDetails[0]?.email}
                </div>
              </Tooltip>
            ))
          : 'N/A',
    },
    {
      deatilsName: 'Campaign Start Date',
      detailsDes:
        dayjs(campaignsData?.startDate)?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    {
      deatilsName: 'Campaign End Date',
      detailsDes:
        dayjs(campaignsData?.endDate)?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    {
      deatilsName: 'Campaign Status',
      detailsDes: campaignsData?.campaignStatus ?? 'N/A',
    },
    {
      deatilsName: 'Campaign Goal',
      detailsDes: campaignsData?.campaignGoal ?? 'N/A',
    },
    {
      deatilsName: 'Campaign Audience',
      detailsDes: campaignsData?.campaignAudience ?? 'N/A',
    },
    {
      deatilsName: 'Campaign Budget total',
      detailsDes: campaignsData?.campaignBudget ?? 'N/A',
    },
    {
      deatilsName: 'Campaign Spend total',
      detailsDes: campaignsData?.campaignTotalSpend
        ? 'depends on third Party libarary'
        : 'N/A',
    },
    {
      deatilsName: 'Campaign Notes',
      detailsDes: campaignsData?.campaignNotes
        ? 'This campaign will help you to get likes and your page reach will increase'
        : 'N/A',
      paddingBottom: '170px',
    },
  ];
};
