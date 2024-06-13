import {
  RHFAutocompleteAsync,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { Box } from '@mui/material';
import * as Yup from 'yup';

export const MANAGE_ACCESS_REPORT_TYPES = {
  PRIVATE_TO_OWNER: 'Private to owner',
  EVERYONE: 'Everyone',
  EVERYONE_EDIT_AND_VIEW: 'Everyone can edit and view',
  EVERYONE__ONLY_VIEW: 'Everyone can view',
  SPECIFIC_USER_AND_TEAMS: 'Only Specific user and teams',
};

export const manageReportAccessValidationSchema = Yup?.object()?.shape({
  accessType: Yup?.string()?.required('Access Type is required'),
  everyoneAccess: Yup?.string()?.when('accessType', {
    is: (value: any) => value === MANAGE_ACCESS_REPORT_TYPES?.EVERYONE,
    then: (schema: any) => schema?.required('Selection is required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  usersAndTeams: Yup?.mixed()
    ?.nullable()
    ?.when('accessType', {
      is: (value: any) =>
        value === MANAGE_ACCESS_REPORT_TYPES?.SPECIFIC_USER_AND_TEAMS,
      then: () => Yup?.array()?.min(1, 'At least one user or team is required'),
      otherwise: () => Yup?.array()?.notRequired(),
    }),
});

export const manageReportAccessDefaultValues = () => {
  return { accessType: '', everyoneAccess: '', usersAndTeams: [] };
};

export const manageReportAccessFromFieldsDynamic = (apiQueryUsers: any) => [
  {
    id: 45,
    componentProps: {
      name: 'accessType',
      row: false,
      options: [
        {
          value: MANAGE_ACCESS_REPORT_TYPES?.PRIVATE_TO_OWNER,
          label: 'Private to owner',
        },
        {
          value: MANAGE_ACCESS_REPORT_TYPES?.EVERYONE,
          label: 'Everyone',
          filter: (
            <Box px={3}>
              <RHFRadioGroup
                name="everyoneAccess"
                row={false}
                options={[
                  {
                    value: MANAGE_ACCESS_REPORT_TYPES?.EVERYONE_EDIT_AND_VIEW,
                    label: 'Everyone can edit and view',
                  },
                  {
                    value: MANAGE_ACCESS_REPORT_TYPES?.EVERYONE__ONLY_VIEW,
                    label: 'Everyone can view',
                  },
                ]}
              />
            </Box>
          ),
        },
        {
          value: MANAGE_ACCESS_REPORT_TYPES?.SPECIFIC_USER_AND_TEAMS,
          label: 'Only Specific user and teams',
          filter: (
            <RHFAutocompleteAsync
              label=""
              name="usersAndTeams"
              fullWidth
              required
              apiQuery={apiQueryUsers}
              multiple
              size="small"
              placeholder="Select user and team"
              externalParams={{
                limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
              }}
              getOptionLabel={(option: any) => `${option?.name}`}
            />
          ),
        },
      ],
    },
    component: RHFRadioGroup,
  },
];
