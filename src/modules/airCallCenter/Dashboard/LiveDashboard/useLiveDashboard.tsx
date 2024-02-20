import { useState } from 'react';

const useLiveDashboard = () => {
  const options = [
    { label: 'Tech', value: 'Tech' },
    { label: 'Queue 2', value: 'Queue 2' },
    { label: 'SMA Queue', value: 'SMA Queue' },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [multiSelect, setMultiSelect] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const actionMenuOpen = Boolean(anchorEl);

  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMultiSelect = () => {
    setMultiSelect(null);
  };

  const handleClickMultiSelect = (event: any) => {
    setMultiSelect(event.currentTarget);
  };

  const handleMenuItemClick = (value: any) => () => {
    const selectedIndex = selectedOptions.indexOf(value);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedOptions, value];
    } else if (selectedIndex === 0) {
      newSelected = selectedOptions.slice(1);
    } else if (selectedIndex === selectedOptions.length - 1) {
      newSelected = selectedOptions.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedOptions.slice(0, selectedIndex),
        ...selectedOptions.slice(selectedIndex + 1),
      ];
    }

    setSelectedOptions(newSelected);
  };

  return {
    anchorEl,
    setAnchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    options,
    selectedOptions,
    handleMenuItemClick,
    multiSelect,
    handleCloseMultiSelect,
    handleClickMultiSelect,
  };
};
export default useLiveDashboard;
