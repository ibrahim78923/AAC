import 'react-international-phone/style.css';

import {
  BaseTextFieldProps,
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
}

const PhoneNumberInput: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'us',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <Stack direction={'row'} spacing={'6px'}>
      <Box>
        <Select
          IconComponent={ExpandMoreIcon}
          MenuProps={{
            style: {
              height: '300px',
              width: '360px',
              top: '0',
              left: '-71px',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          sx={{
            width: '142px',
            height: '58px',
            svg: {
              right: '16px',
            },
          }}
          value={country.iso2}
          onChange={(e) => setCountry(e.target.value as CountryIso2)}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FlagImage iso2={value} style={{ display: 'flex' }} />
              <Box sx={{ ml: '8px', color: '#ABAFB1' }}>
                +{country.dialCode}
              </Box>
            </Box>
          )}
        >
          {defaultCountries.map((c) => {
            const country = parseCountry(c);
            return (
              <MenuItem key={country.iso2} value={country.iso2}>
                <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
                <Typography marginRight="8px">{country.name}</Typography>
                <Typography color="gray">+{country.dialCode}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box sx={{ flex: '1' }}>
        <TextField
          fullWidth
          variant="outlined"
          color="primary"
          placeholder="Phone number"
          value={inputValue}
          onChange={handlePhoneValueChange}
          type="tel"
          inputRef={inputRef}
          {...restProps}
          sx={{ height: '58px' }}
        />
      </Box>
    </Stack>
  );
};
export default PhoneNumberInput;
