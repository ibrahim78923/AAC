import { useState } from 'react';
const useSubModulesAccordian = () => {
  const [expandedAccordian, setExpandedAccordian] = useState<string | false>(
    'panel1',
  );
  const handleChangeAccordian =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedAccordian(newExpanded ? panel : false);
    };
  return {
    expandedAccordian,
    setExpandedAccordian,
    handleChangeAccordian,
  };
};
export default useSubModulesAccordian;
