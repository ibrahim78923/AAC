import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../../Dashboard.data';

const { EDIT_AND_VIEW, ONLY_VIEW } = MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

export const specificUsersAccessColumns = [
  { _id: 'name', label: 'Name' },
  { _id: 'viewAndEdit', label: 'View and Edit' },
  { _id: 'viewOnly', label: 'View Only' },
];

export const specificUsersAccessFormFieldsDynamic = (
  name: string,
  index: number,
  disabled: boolean,
) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.name`} size="small" disabled />,
  },
  {
    id: 2,
    align: 'center',
    data: (
      <RHFRadioGroup
        disabled={disabled}
        name={`${name}.${index}.permission`}
        size="small"
        options={[
          {
            value: EDIT_AND_VIEW,
          },
        ]}
      />
    ),
  },
  {
    id: 3,
    align: 'center',
    data: (
      <RHFRadioGroup
        disabled={disabled}
        name={`${name}.${index}.permission`}
        size="small"
        options={[
          {
            value: ONLY_VIEW,
          },
        ]}
      />
    ),
  },
];
