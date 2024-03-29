import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const usePermissionAccordion = () => {
  const theme = useTheme();

  const [selectedModule, setSelectedModule] = useState<string>();
  const [selectedSubModule, setSelectedSubModule] = useState<string>();

  const handleExpandAccordionChange = (module: string) => {
    if (module === selectedModule) {
      setSelectedModule('');
    } else {
      setSelectedModule(module);
    }
  };

  const handleChangeSubModule = (subModule) => {
    if (subModule === selectedSubModule) {
      setSelectedSubModule('');
    } else {
      setSelectedSubModule(subModule);
    }
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
    selectedModule,
    setSelectedModule,
    handleExpandAccordionChange,
    methods,
    getModulePermissions,
    selectAllPermissions,
    handleChangeSubModule,
    selectedSubModule,
  };
};

export default usePermissionAccordion;
