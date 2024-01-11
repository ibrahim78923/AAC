import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@mui/material';
import { chipColor } from './ExistingIncident.data';
import { v4 as uuidv4 } from 'uuid';
import { useExistingIncident } from './useExistingIncident';

export const ExistingIncident = ({ openDrawer, onClose }: any) => {
  const {
    handleSubmit,
    searchBy,
    setSearchBy,
    theme,
    checkboxValues,
    handleCheckboxChange,
    existingTicketsData,
  } = useExistingIncident({ onClose });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={'Associate Existing Incident'}
      okText={'Associate'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit}
    >
      <Box mt={1}>
        <Search
          label={'Search'}
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          fullWidth
        />
      </Box>

      {existingTicketsData?.data?.tickets &&
      existingTicketsData.data.tickets.length > 0
        ? existingTicketsData.data.tickets.map((item: any) => (
            <Box
              border={`1px solid ${theme?.palette?.grey?.[400]}`}
              borderRadius={2}
              p={1}
              mt={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              key={uuidv4()}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues?.[item?.id] || false}
                      onChange={handleCheckboxChange}
                      id={item?.id}
                    />
                  }
                  label={item?.ticketIdNumber}
                />
              </FormGroup>
              <Chip
                label={item?.status}
                sx={{
                  bgcolor:
                    theme?.['palette']?.[`${chipColor(item?.status)}`]?.[
                      'lighter'
                    ],
                  color:
                    item?.status === 'InProgress'
                      ? 'common.white'
                      : 'success.darker',
                }}
              />
            </Box>
          ))
        : ''}
    </CommonDrawer>
  );
};
