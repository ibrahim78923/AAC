import { InputBase, Popper, autocompleteClasses, styled } from '@mui/material';

export const styles = {
  doneIcon: {
    width: 17,
    height: 17,
    mr: '0.3rem',
    color: 'primary.main',
  },
  userCardInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
};

export const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme?.palette?.grey?.[900]}`,
  borderRadius: 6,
  width: 420,
  padding: '0.6rem',
  zIndex: 1400,
  color: 'grey.600',
  backgroundColor: theme?.palette?.common?.white,
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: '0 0.6rem',
  width: '100%',
  borderRadius: 4,
  border: `1px solid ${theme?.palette?.custom?.main}`,
  '& input': {
    backgroundColor: theme?.palette?.common?.white,
    padding: '0.5rem 0',
    fontSize: 14,
  },
}));
export const StyledAutocompletePopper: any = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses?.paper}`]: {
    fontSize: 13,
  },
  [`& .${autocompleteClasses?.listbox}`]: {
    backgroundColor: theme?.palette?.common?.white,
    padding: 0,
    [`& .${autocompleteClasses?.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      [`&.${autocompleteClasses?.focused}, &.${autocompleteClasses?.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme?.palette?.action?.hover,
        },
    },
  },
  [`&.${autocompleteClasses?.popperDisablePortal}`]: {
    position: 'relative',
  },
}));
