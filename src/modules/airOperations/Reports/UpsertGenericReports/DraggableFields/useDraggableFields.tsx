import { GENERIC_REPORT_MODULES, REPORT_TYPE } from '@/constants/strings';
import { DraggableFieldsI } from './DraggableFields.interface';
import { useTheme, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';

export const useDraggableFields = (props: DraggableFieldsI) => {
  const { selectedModule, data } = props;
  const theme: Theme = useTheme();

  const fieldData = useAppSelector((state) => state?.genericReport?.fieldData);
  const showTemplate = useAppSelector(
    (state) => state?.genericReport?.showTemplate,
  );
  const singleReportModule = (data as any)?.data?.genericReport?.module;
  const [openDrawer, setOpenDrawer] = useState(false);

  const getDefaultModule = () => {
    switch (selectedModule) {
      case GENERIC_REPORT_MODULES?.SERVICES:
        return REPORT_TYPE?.INVENTORIES;
      case GENERIC_REPORT_MODULES?.SALES:
        return REPORT_TYPE?.DEALS;
      case GENERIC_REPORT_MODULES?.MARKETING:
        return REPORT_TYPE?.CAMPAIGNS;
      default:
        return [];
    }
  };

  const defaultModule = getDefaultModule();
  const [metricType, setMetricType] = useState<any>(defaultModule);

  useEffect(() => {
    if (singleReportModule) {
      setMetricType(singleReportModule);
    }
  }, [singleReportModule]);

  return {
    defaultModule,
    theme,
    metricType,
    setMetricType,
    fieldData,
    openDrawer,
    setOpenDrawer,
    showTemplate,
  };
};
