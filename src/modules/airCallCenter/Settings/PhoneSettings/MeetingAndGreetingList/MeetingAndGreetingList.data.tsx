import { Box } from '@mui/material';
import AudioVisualizer from './AudioVisualizer';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteMessage } from './DeleteMessage';

export const meetingAndGreetingListTableData = [
  {
    id: 1,
    messageName: `Agent Busy Message`,
    recording: 'https://webaudioapi.com/samples/audio-tag/chrono.mp3',
  },
  {
    id: 12,
    messageName: `Agent Extension Welcome Message`,
    recording: 'https://webaudioapi.com/samples/audio-tag/chrono.mp3',
  },
  {
    id: 112,
    messageName: `Agent Not Answering Message`,
    recording: 'https://webaudioapi.com/samples/audio-tag/chrono.mp3',
  },
];
export const meetingAndGreetingListColumns = [
  {
    accessorFn: (row: any) => row?.messageName,
    id: 'messageName',
    isSortable: true,
    header: 'Message Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.recording,
    id: 'recording',
    cell: (info: any) => (
      <Box>
        {info?.getValue() !== '-' ? (
          <AudioVisualizer audioSrc={info?.getValue()} />
        ) : (
          '-'
        )}
      </Box>
    ),
    header: 'Recording',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box>
        <EditYellowBGPenIcon />
        <DeleteMessage id={info?.getValue()} />
      </Box>
    ),
  },
];
