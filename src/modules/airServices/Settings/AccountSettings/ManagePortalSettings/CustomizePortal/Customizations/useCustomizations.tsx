import { useTheme } from '@mui/material';
import { useState } from 'react';
import { ICustomizationsProps } from '../CustomizePortal.interface';

export const useCustomizations = (props: ICustomizationsProps) => {
  const { reset, customizationsDataArray, patchCustomerPortalStylingsStatus } =
    props;

  const theme = useTheme();

  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>(
    customizationsDataArray.reduce(
      (acc, curr) => {
        acc[curr?._id] = true;
        return acc;
      },
      {} as { [key: number]: boolean },
    ),
  );

  const handleAccordionChange = (panel: number) => () => {
    setExpanded((prevState) => ({
      ...prevState,
      [panel]: !prevState[panel],
    }));
  };

  return {
    theme,
    customizationsDataArray,
    expanded,
    handleAccordionChange,
    patchCustomerPortalStylingsStatus,
    reset,
  };
};
export default useCustomizations;
