import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Avatar, InputAdornment } from '@mui/material';
import Image from 'next/image';
import { SearchSharedIcon } from '@/assets/icons';

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper: any = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)`,
  borderRadius: 6,
  width: 420,
  padding: '10px',
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  //   margin: 10,
  padding: '0 10px',
  width: '100%',
  borderRadius: 4,
  border: `1px solid #6B7280`,
  '& input': {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: '8px 0',
    fontSize: 14,
  },
}));

export const SearchableMultiSelect = ({
  labels,
  anchorEl,
  handleClose,
  pendingValue,
  setPendingValue,
  value,
}: any) => {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <React.Fragment>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              multiple
              onClose={(event: any, reason: AutocompleteCloseReason) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  (event as React.KeyboardEvent).key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <Box
                  component="li"
                  sx={{ bgcolor: selected ? 'primary.light' : 'common.white' }}
                  {...props}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <Avatar alt={option?.name}>
                        <Image
                          src={option?.src}
                          alt={option?.name}
                          layout="fill"
                        />
                      </Avatar>
                      <Box
                        sx={{
                          flexGrow: 1,
                          '& span': {
                            color:
                              theme.palette.mode === 'light'
                                ? '#586069'
                                : '#8b949e',
                          },
                        }}
                      >
                        {option?.name}
                      </Box>
                    </Box>
                    <DoneIcon
                      sx={{
                        width: 17,
                        height: 17,
                        mr: '5px',
                        ml: '-2px',
                        color: 'primary.main',
                      }}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                  </Box>
                </Box>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value?.indexOf(a);
                ai = ai === -1 ? value?.length + labels?.indexOf(a) : ai;
                let bi = value?.indexOf(b);
                bi = bi === -1 ? value?.length + labels?.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchSharedIcon />
                    </InputAdornment>
                  }
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
};
