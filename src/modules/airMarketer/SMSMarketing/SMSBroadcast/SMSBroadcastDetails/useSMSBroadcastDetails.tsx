import { useGetSmsBroadcatsByIdQuery } from '@/services/airMarketer/SmsMarketing';
import { Theme, useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

const useSMSBroadcastDetails = () => {
  const theme = useTheme<Theme>();
  const broadcastId = useSearchParams()?.get('id');
  const { data: getSmsBroadcatsById } =
    useGetSmsBroadcatsByIdQuery(broadcastId);
  const smsBroadcastDetails = getSmsBroadcatsById?.data;

  return {
    theme,
    smsBroadcastDetails,
  };
};

export default useSMSBroadcastDetails;
