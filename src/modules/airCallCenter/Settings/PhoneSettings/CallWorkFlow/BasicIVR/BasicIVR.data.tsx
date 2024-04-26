import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { DeleteCrossIcon } from '@/assets/icons';
import * as Yup from 'yup';

export const basicIvrValidationSchema = Yup.object().shape({
  ivrMenuName: Yup.string()?.required('Required Field'),
  playMessage: Yup.string()?.required('Required Field'),
  afterNRepeat: Yup.string()?.required('Required Field'),
  ifNotValid: Yup.string()?.required('Required Field'),
});

export const basicIvrDefaultValues = {
  ivrMenuName: '',
  playMessage: '',
  afterNRepeat: '',
  ifNotValid: '',
};

export const basicIvrArray = [
  {
    componentProps: {
      name: 'ivrMenuName',
      label: 'IVR Menu Name',
      placeholder: 'IVR2',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'playMessage',
      label: 'Play Message',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'afterNRepeat',
      label: 'After N Repeats',
      placeholder: '3',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'ifNotValid',
      label: 'If Not Valid Input',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6,
  },
];

export const data: any = [
  {
    keyPress: `0`,
  },
  {
    keyPress: `1`,
  },
  {
    keyPress: `2`,
  },
];
export const columns: any = [
  {
    accessorFn: (row: any) => row.keyPress,
    id: 'keyPress',
    cell: (info: any) => info.getValue(),
    header: 'Key Press',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: () => (
      <Stack direction="row" alignItems="center" gap={2}>
        <FormControl size="small">
          <Select
            sx={{ height: '36px' }}
            defaultValue={'sendtovoicemail'}
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={'sendtovoicemail'}>Send To Voice Mail</MenuItem>
            <MenuItem value={'sendtoivr'}>Send To IVR Menu</MenuItem>
            <MenuItem value={'sendtocallqueu'}>Send to call queue</MenuItem>
            <MenuItem value={'hangup'}>Hang up</MenuItem>
            <MenuItem value={'sendtovoicemail'}>Send to voicemail</MenuItem>
            <MenuItem value={'agentextension'}>
              Send To Agnet Extension
            </MenuItem>
          </Select>
        </FormControl>
        <DeleteCrossIcon />
      </Stack>
    ),
  },
];
