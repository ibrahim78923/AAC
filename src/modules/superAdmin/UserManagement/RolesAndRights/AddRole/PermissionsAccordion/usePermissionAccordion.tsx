import { useState } from 'react';
import { useTheme, Theme } from '@mui/material';
import { useForm, UseFormReturn } from 'react-hook-form';

interface Permission {
  slug: string;
}

interface SubModule {
  permissions: Permission[];
}

interface FormValues {
  permissions: string[];
}

const usePermissionAccordion = () => {
  const theme: Theme = useTheme();

  const [selectedModule, setSelectedModule] = useState<string | undefined>();
  const [selectedSubModule, setSelectedSubModule] = useState<string>('');

  const handleExpandAccordionChange = (module: string) => {
    if (module === selectedModule) {
      setSelectedModule('');
    } else {
      setSelectedModule(module);
    }
  };

  const handleChangeSubModule = (subModule: string) => {
    if (subModule === selectedSubModule) {
      setSelectedSubModule('');
    } else {
      setSelectedSubModule(subModule);
    }
  };

  const defaultValues: FormValues = {
    permissions: [],
  };

  const methods: UseFormReturn<FormValues> = useForm<FormValues>({
    defaultValues,
  });

  const { watch, setValue } = methods;

  const getModulePermissions = (subModules: SubModule[]) => {
    return subModules?.flatMap(
      (subModule) =>
        subModule?.permissions?.map((permission) => permission?.slug),
    );
  };

  const selectAllPermissions = (subModules: SubModule[]) => {
    let permissionsArray: string[] = [];
    const modulePermissions = getModulePermissions(subModules);
    if (
      !modulePermissions.every(
        (permission) => watch('permissions')?.includes(permission),
      )
    ) {
      permissionsArray = modulePermissions?.concat(watch('permissions'));
    } else {
      permissionsArray = watch('permissions')?.filter(
        (permission) => !modulePermissions?.includes(permission),
      );
    }

    setValue('permissions', permissionsArray);
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
