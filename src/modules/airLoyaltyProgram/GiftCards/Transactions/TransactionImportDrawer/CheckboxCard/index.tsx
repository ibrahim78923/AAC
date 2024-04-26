import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { style } from './CheckboxCard.style';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const CheckboxCard = ({
  title = '',
  columnData = [],
  handleSelect,
  options = [],
  placeholder = '',
}: any) => {
  const { palette } = useTheme();
  const displayColumnData =
    columnData?.length > 3 ? columnData?.slice(0, 3) : columnData;

  return (
    <Box
      sx={style?.cardWrapper(palette)}
      onClick={() => handleSelect(title)}
      mt={2}
    >
      <Box width={'100%'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="h5" fontWeight={500} pb={0.4}>
            {title}
          </Typography>
          <Box
            sx={{
              border: '1px solid primary',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            bgcolor={'custom.dark_primary'}
            color={'success.lighter'}
          >
            <DoneAllIcon sx={{ fontSize: '18px' }} />
          </Box>
        </Box>
        <Typography variant="body2" color="grey.600">
          {displayColumnData?.join(', ')}
          {columnData?.length > 3 && `, +${columnData?.length - 3} more`}
        </Typography>
        <RHFAutocomplete
          name=""
          label={title}
          size="small"
          options={options}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
};

export default CheckboxCard;
