import * as React from 'react';
import { ExportButton } from '@/components/ExportButton';
import { EXPORT_TYPE } from '@/constants/strings';
import usePurchaseOrders from '../usePurchaseOrders';

export const PurchaseOrderExport = () => {
  const { handleExportTypeClick, csvExportHandler, excelExportHandler } =
    usePurchaseOrders();
  return (
    <div>
      <ExportButton
        handleCsvExport={() => {
          handleExportTypeClick(EXPORT_TYPE?.CSV);
          csvExportHandler();
        }}
        handleExcelExport={() => {
          handleExportTypeClick(EXPORT_TYPE?.XLS);
          excelExportHandler();
        }}
      />
    </div>
  );
};
