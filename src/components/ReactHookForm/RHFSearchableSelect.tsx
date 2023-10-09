import * as React from 'react';
import Menu from '@mui/material/Menu';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, InputAdornment, TextField } from '@mui/material';
import { ArrowDownIcon } from '@/assets/icons';

export default function RHFSearchableSelect({ name, options, ...other }: any) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const filteredOptions = options.filter((option: any) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            value={selectedValue ? selectedValue : ' '}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <ArrowDownIcon />
                </InputAdornment>
              ),
            }}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                width: anchorEl ? anchorEl.clientWidth : 'auto',
              },
            }}
          >
            <>
              <TextField
                fullWidth
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ height: '44px', marginBottom: '20px' }}
              />
              {filteredOptions.map((option: any) => (
                <Box
                  key={option.value}
                  onClick={() => {
                    handleClose(),
                      field.onChange(option.value),
                      setSelectedValue(option.label);
                  }}
                  sx={{ width: '100%', height: '30px', padding: '5px 10px' }}
                >
                  {option.label}
                </Box>
              ))}
            </>
          </Menu>
        </>
      )}
    />
  );
}
