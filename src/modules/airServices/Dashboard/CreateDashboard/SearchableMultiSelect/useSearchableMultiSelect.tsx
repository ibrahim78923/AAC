import { AutocompleteCloseReason } from '@mui/material';
import { InputBase, Popper, autocompleteClasses, styled } from '@mui/material';
import { PopperComponentPropsI } from './SearchableMultiSelect.interface';
export const useSearchableMultiSelect = (
  labels: any[],
  anchorEl: any,
  handleClose: () => void,
  setPendingValue: (arg0: any[]) => void,
  value: string | any[],
) => {
  const open = Boolean(anchorEl);
  const id = open ? 'select-user' : undefined;
  const onCloseAutocomplete = (event: any, reason: AutocompleteCloseReason) => {
    if (reason === 'escape') {
      handleClose();
    }
  };
  const onChangeAutocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any[],
    reason: any,
  ) => {
    if (
      event.type === 'keydown' &&
      (event as React.KeyboardEvent)?.key === 'Backspace' &&
      reason === 'removeOption'
    ) {
      return;
    }
    setPendingValue(newValue);
  };
  const renderOptions = [...labels]?.sort((a, b) => {
    let firstVal = value?.indexOf(a);
    firstVal = firstVal === -1 ? value?.length + labels?.indexOf(a) : firstVal;
    let secondVal = value?.indexOf(b);
    secondVal =
      secondVal === -1 ? value?.length + labels?.indexOf(b) : secondVal;
    return firstVal - secondVal;
  });
  const StyledAutocompletePopper: any = styled('div')(({ theme }) => ({
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

  function PopperComponent(props: PopperComponentPropsI) {
    const { ...other } = props;
    return <StyledAutocompletePopper {...other} />;
  }

  const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme?.palette?.grey?.[900]}`,
    borderRadius: 6,
    width: 420,
    padding: '0.6rem',
    zIndex: 100,
    color: 'grey.600',
    backgroundColor: theme?.palette?.common?.white,
  }));

  const StyledInput = styled(InputBase)(({ theme }) => ({
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
  return {
    id,
    open,
    onCloseAutocomplete,
    onChangeAutocomplete,
    renderOptions,
    PopperComponent,
    StyledInput,
    StyledPopper,
  };
};
