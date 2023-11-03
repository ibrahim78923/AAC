import { AutocompleteCloseReason } from '@mui/material';
import { PopperComponentPropsI } from './SearchableMultiSelect.interface';
import { StyledAutocompletePopper } from './SearchableMultiSelect.styles';
export const useSearchableMultiSelect = (props: any) => {
  const { labels, anchorEl, handleClose, setPendingValue, value } = props;
  const open = Boolean(anchorEl);
  const id = open ? 'select-user' : undefined;
  const onCloseAutocomplete = (event: any, reason: AutocompleteCloseReason) => {
    if (reason === 'escape') {
      handleClose();
    }
  };
  //optional chaining does not work on interfaces
  const onChangeAutocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any[],
    reason: any,
  ) => {
    if (
      event.type === 'keydown' &&
      //optional chaining does not work on interfaces
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
  function PopperComponent(props: PopperComponentPropsI) {
    const { ...other } = props;
    return <StyledAutocompletePopper {...other} />;
  }
  return {
    id,
    open,
    onCloseAutocomplete,
    onChangeAutocomplete,
    renderOptions,
    PopperComponent,
  };
};
