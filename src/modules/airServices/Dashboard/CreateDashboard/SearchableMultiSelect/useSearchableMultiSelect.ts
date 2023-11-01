import { AutocompleteCloseReason } from '@mui/material';
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
      (event as React.KeyboardEvent).key === 'Backspace' &&
      reason === 'removeOption'
    ) {
      return;
    }
    setPendingValue(newValue);
  };
  const renderOptions = [...labels].sort((a, b) => {
    let firstVal = value?.indexOf(a);
    firstVal = firstVal === -1 ? value?.length + labels?.indexOf(a) : firstVal;
    let secondVal = value?.indexOf(b);
    secondVal =
      secondVal === -1 ? value?.length + labels?.indexOf(b) : secondVal;
    return firstVal - secondVal;
  });
  return {
    id,
    open,
    onCloseAutocomplete,
    onChangeAutocomplete,
    renderOptions,
  };
};
