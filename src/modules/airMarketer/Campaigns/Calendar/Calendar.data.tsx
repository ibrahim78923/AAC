import { TaskAvatarImage, CampaignAvatarImage } from '@/assets/images';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const taskEvents: any = (
  theme: any,
  compaignsTasksData: any,
  allCampaignsData: any,
) => {
  const compaignsTasksArray = Array.isArray(compaignsTasksData)
    ? compaignsTasksData
    : [];
  const campaignsArray = Array.isArray(allCampaignsData)
    ? allCampaignsData
    : [];
  const combinedArray = [...compaignsTasksArray, ...campaignsArray];
  return combinedArray.map((data: any) => {
    const isTask = compaignsTasksData?.includes(data);
    return {
      title: isTask ? data?.taskName : data?.title,
      SocailMedia: isTask ? TaskAvatarImage : CampaignAvatarImage,
      bgColor: isTask
        ? `${theme?.palette?.primary?.main}`
        : `${theme?.palette?.error?.lighter}`,
      textColor: isTask
        ? `${theme?.palette?.common?.white}`
        : `${theme?.palette?.common?.white}`,
      start: `${dayjs(data?.startDate)?.format(DATE_FORMAT?.API)}`,
      type: isTask ? 'task' : 'campaign',
      id: data?._id,
    };
  });
};
