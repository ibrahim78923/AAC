import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const usePermissionAccordion = () => {
  const theme = useTheme();

  const [isAccordionExpanded, setIsAccordionExpanded] = useState<
    string | false
  >('plan-air-sales-accordion');

  const handleExpandAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setIsAccordionExpanded(newExpanded ? panel : false);
    };

  const defaultValues: any = {
    permissions: [],
  };

  const methods: any = useForm<any>({
    defaultValues: defaultValues,
  });

  const { watch, setValue } = methods;

  const getModulePermissions = (subModules: any) => {
    return subModules.flatMap((firstItem: any) => {
      return firstItem.permissions.map((item: any) => item.slug);
    });
  };

  const selectAllPermissions = (subModules: any) => {
    let permissionsArray = [];
    const modulePermissions = getModulePermissions(subModules);
    if (
      !modulePermissions?.every(
        (permission: any) => watch('permissions')?.includes(permission),
      )
    ) {
      permissionsArray = modulePermissions?.concat(watch('permissions'));
    } else {
      permissionsArray = watch('permissions')?.filter(
        (permission: any) => !modulePermissions?.includes(permission),
      );
    }

    const fieldsToSet: any = {
      permissions: permissionsArray,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  };

  return {
    theme,
    isAccordionExpanded,
    setIsAccordionExpanded,
    handleExpandAccordionChange,
    methods,
    getModulePermissions,
    selectAllPermissions,
  };
};

export default usePermissionAccordion;
