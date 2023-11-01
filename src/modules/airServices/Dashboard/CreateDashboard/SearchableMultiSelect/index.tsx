import ClickAwayListener from '@mui/material/ClickAwayListener';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { Avatar, InputAdornment } from '@mui/material';
import Image from 'next/image';
import { SearchSharedIcon } from '@/assets/icons';
import {
  PopperComponent,
  StyledInput,
  StyledPopper,
  styles,
} from './SearchableMultiSelect.styles';
import { useSearchableMultiSelect } from './useSearchableMultiSelect';

export const SearchableMultiSelect = ({
  labels,
  anchorEl,
  handleClose,
  pendingValue,
  setPendingValue,
  value,
}: any) => {
  const { id, open, onCloseAutocomplete, onChangeAutocomplete, renderOptions } =
    useSearchableMultiSelect(
      labels,
      anchorEl,
      handleClose,
      setPendingValue,
      value,
    );
  return (
    <>
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
              onClose={onCloseAutocomplete}
              value={pendingValue}
              onChange={onChangeAutocomplete}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <Box
                  component="li"
                  bgcolor={selected ? 'primary.light' : 'common.white'}
                  {...props}
                >
                  <Box sx={styles?.userCardInner}>
                    <Box display="flex" alignItems="center" gap="0.6rem">
                      <Avatar alt={option?.name}>
                        <Image
                          src={option?.src}
                          alt={option?.name}
                          layout="fill"
                        />
                      </Avatar>
                      <Box color="grey.600">{option?.name}</Box>
                    </Box>
                    <DoneIcon
                      sx={styles?.doneIcon}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                  </Box>
                </Box>
              )}
              options={renderOptions}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params?.InputProps?.ref}
                  inputProps={params?.inputProps}
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
    </>
  );
};
