import { IMG_URL } from '@/config';
import {
  DATE_TIME_FORMAT,
  GOALS_YEARLY_FORMAT,
  RADIO_VALUE,
} from '@/constants';
import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

//table data
export const teamGoalTableColumns: any = (
  handleChange: any,
  teamDurationForm: any,
  tableRowValues: any,
  setTableRowValues: any,
  selectedValues: any,
  processedData: any,
  theme: any,
) => {
  // Base columns that are always present
  const baseColumns = [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: ({ row: { original } }: any) => {
        const handleSelectCompaniesById = (
          checked: boolean,
          id: string,
        ): void => {
          if (checked) {
            setTableRowValues([...tableRowValues, id]);
          } else {
            setTableRowValues(tableRowValues?.filter((_id: any) => _id !== id));
          }
        };
        return (
          <Checkbox
            checked={tableRowValues?.includes(original?._id)}
            onChange={({ target }) => {
              handleSelectCompaniesById(target?.checked, original?._id);
            }}
          />
        );
      },
      header: () => {
        const handleSelectAllCompanies = (checked: boolean): void => {
          setTableRowValues(
            checked
              ? teamDurationForm?.collaborators?.map(({ _id }: any) => _id)
              : [],
          );
        };
        return (
          <Checkbox
            onChange={({ target }) => {
              handleSelectAllCompanies(target.checked);
            }}
            checked={
              teamDurationForm?.collaborators?.length &&
              tableRowValues?.length === teamDurationForm?.collaborators?.length
            }
          />
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => {
        const fullName =
          teamDurationForm?.userTeam === RADIO_VALUE?.USER
            ? `${info?.row?.original?.firstName ?? ''} ${
                info?.row?.original?.lastName ?? ''
              }`
            : `${info?.row?.original?.name ?? ''}`;
        const avatarLetter = fullName.charAt(0);

        return (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {info?.row?.original?.profilePicture ? (
              <Avatar
                alt={avatarLetter}
                src={`${
                  info?.row?.original?.profilePicture
                    ? `${IMG_URL}${info?.row?.original?.profilePicture?.url}`
                    : ''
                }`}
              />
            ) : (
              <Avatar
                alt={fullName}
                sx={{
                  color: theme?.palette?.blue?.dull_blue,
                  textTransform: 'capitalize',
                }}
              >
                {avatarLetter}
              </Avatar>
            )}

            <Box>
              <Typography
                variant="body4"
                sx={{ color: theme?.palette?.blue?.dull_blue }}
              >
                {teamDurationForm?.userTeam === 'USER'
                  ? `${info?.row?.original?.firstName ?? ''} ${
                      info?.row?.original?.lastName ?? ''
                    }`
                  : `${info?.row?.original?.name ?? ''}`}
                `
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.Pipeline,
      id: 'Pipeline',
      header: 'Pipeline',
      isSortable: true,
      cell: (info: any) => {
        const rowId = info.row.id; // Assuming 'id' is a unique identifier for each row
        const selectedStagesForRow = selectedValues[rowId] || [];
        const selectedStageIds = selectedStagesForRow?.map(
          (stage: any) => stage.id,
        );

        return (
          <Box>
            <FormControl sx={{ mt: 1, width: '100%' }}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={selectedStageIds}
                onChange={handleChange(rowId)}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected: any) => {
                  const selectedNames = selected?.map((id: any) => {
                    const stage = processedData?.find(
                      (stage: any) => stage.id === id,
                    );
                    return stage ? stage.name : '';
                  });
                  return selectedNames.join(', ');
                }}
                placeholder="all"
                multiple
                sx={{ height: '44px', width: '200px' }}
              >
                {processedData?.map((stage: any) => (
                  <MenuItem key={stage?.id} value={stage?.id}>
                    <Checkbox
                      checked={selectedStageIds?.indexOf(stage?.id) > -1}
                    />
                    <ListItemText primary={stage?.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      },
    },
  ];

  const formatHeader = (from: any, to: any) => {
    const formattedFrom = dayjs(from).format(DATE_TIME_FORMAT?.DDMMM);
    const formattedTo = dayjs(to).format(DATE_TIME_FORMAT?.DDMMMYYYY);
    return `${formattedFrom} - ${formattedTo}`;
  };

  let headers = [];
  if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.MONTHLY) {
    headers = [
      'Jan 2024',
      'Feb 2024',
      'Mar 2024',
      'Apr 2024',
      'May 2024',
      'Jun 2024',
      'Jul 2024',
      'Aug 2024',
      'Sep 2024',
      'Oct 2024',
      'Nov 2024',
      'Dec 2024',
    ];
  } else if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.YEARLY) {
    headers = ['Jan - Dec 2024'];
  } else if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.QUARTERLY) {
    headers = [
      'Q1-Jan 2024 - Mar 2024',
      'Q2-Apr 2024 - Jun 2024',
      'Q3-Jul 2024 - Sep 2024',
      'Q4-Oct 2024 - Dec 2024',
    ];
  } else {
    headers = [formatHeader(teamDurationForm?.from, teamDurationForm?.to)];
  }

  // Add month columns based on the duration
  const monthColumns = headers?.map((header, index) => ({
    accessorFn: (row: any) => row[`month${index + 1}`],
    id: `month${index + 1}`,
    header: header,
    isSortable: true,
    cell: () => (
      <Box>
        <TextField
          type="number"
          placeholder="0"
          sx={{ '& input': { height: '12px' } }}
        />
      </Box>
    ),
  }));

  // Add yearly total column
  const yearlyTotalColumn = {
    accessorFn: (row: any) => row?.yearlyTotal,
    id: 'yearlyTotal',
    header: 'Yearly Total',
    isSortable: true,
    cell: (info: any) => (
      <Box>
        <Typography fontSize="12px" fontWeight={600} textAlign={'right'}>
          {info?.getValue()} Deals ({info?.row?.original?.yearlyTotal}%)
        </Typography>
        <Typography
          fontSize="12px"
          fontWeight={500}
          textAlign={'right'}
          mt={0.5}
        >
          {info?.getValue()}/12 months
        </Typography>
      </Box>
    ),
  };
  // Combine base columns, month columns, and yearly total column
  return [...baseColumns, ...monthColumns, yearlyTotalColumn];
};

export const teamGoalTableData = [
  {
    id: '1',
    name: 'Olivia Rhye',
    Pipeline: '0',
    Jan2023: '10',
    yearlyTotal: '0',
  },
];
