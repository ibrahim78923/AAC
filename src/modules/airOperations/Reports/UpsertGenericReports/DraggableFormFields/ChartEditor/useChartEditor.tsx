import { MODAL_INITIAL_STATES, REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';
import {
  useLazyAssetTypeDropdownQuery,
  useLazyCategoriesDropdownQuery,
  useLazyDepartmentDropdownQuery,
  useLazyLocationDropdownQuery,
  useLazyVendorsDropdownQuery,
  useLazyDealsDropdownQuery,
  useLazyUsersDropdownQuery,
  useLazySalesDropdownQuery,
  useLazyContractTypeDropdownQuery,
} from '@/services/airOperations/reports/upsert-generic-reports';
import { ChartEditorI } from './ChartEditor.interface';
import { useDispatch } from 'react-redux';
import { setFieldData } from '@/redux/slices/genericReport/genericReportSlice';
import { useAppSelector } from '@/redux/store';
import useAuth from '@/hooks/useAuth';

export const useChartEditor = (props: ChartEditorI) => {
  const {
    setModal,
    setValue,
    form,
    setForm,
    setDraggedItemData,
    draggedItemData,
    watch,
  } = props;

  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();
  const auth: any = useAuth();
  const productId = auth?.product?._id;
  const disableTemplate = useAppSelector(
    (state) => state?.genericReport?.disableTemplate,
  );
  const dispatch = useDispatch();

  const [chartTitle, subFilter, chartType, xAxisData, xAxisType] = watch([
    'chartTitle',
    'subFilter',
    'chartType',
    'xAxis',
    'xAxisType',
  ]);
  const xAxesTypeIds = xAxisType?.map((item: any) => item?._id);

  const handleSave = () => {
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        title: chartTitle,
        reportType: REPORT_TYPE?.CHART,
        type: chartType,
        templateType: draggedItemData ? draggedItemData?.type : false,
        xAxis: xAxisData,
        xAxisType: xAxisData?.ref ? xAxesTypeIds : null,
        subFilter: subFilter,
      },
    ]);
    dispatch(setFieldData(false));
    setModal(MODAL_INITIAL_STATES);
    setValue('chartType', '');
    setValue('chartTitle', 'Report Chart');
    setValue('subFilter', false);
    setDraggedItemData(null);
    successSnackbar('Chart Added');
  };

  const assetTypeDropdown = useLazyAssetTypeDropdownQuery();
  const locationDropdown = useLazyLocationDropdownQuery();
  const departmentDropdown = useLazyDepartmentDropdownQuery();
  const usersDropdown = useLazyUsersDropdownQuery();
  const categoriesDropdown = useLazyCategoriesDropdownQuery();
  const vendorsDropdown = useLazyVendorsDropdownQuery();
  const dealsDropdown = useLazyDealsDropdownQuery();
  const salesDropdown = useLazySalesDropdownQuery();
  const contractTypeDropdown = useLazyContractTypeDropdownQuery();

  const xAxesFields = {
    ASSET_TYPE: 'inventory_assetType',
    INVENTORY_LOCATION: 'inventory_locationId',
    INVENTORY_DEPARTMENT: 'inventory_departmentId',
    REQUESTER: 'ticket_requester',
    CATEGORY: 'ticket_category',
    TICKETS_DEPARTMENT: 'ticket_department',
    AGENT: 'ticket_agent',
    CONTACT_VENDORS: 'contract_vendor',
    APPROVERS: 'contract_approver',
    PURCHASE_ORDER_VENDORS: 'purchaseOrder_vendorId',
    PURCHASE_ORDER_LOCATION: 'purchaseOrder_locationId',
    PURCHASE_ORDER_DEPARTMENT: 'purchaseOrder_departmentId',
    DEALS_PIPELINE_ID: 'deals_dealPipelineId',
    CAMPAIGN_OWNER: 'campaign_campaignOwner',
    SALES_PIPELINES_ID: 'sales_pipelinesId',
    USERS: 'usersId',
    CONTRACT_TYPE: 'contractType',
  };

  const getSingleFieldDropdown = () => {
    switch (xAxisData?.value) {
      case xAxesFields?.ASSET_TYPE:
        return assetTypeDropdown;
      case xAxesFields?.INVENTORY_LOCATION:
        return locationDropdown;
      case xAxesFields?.INVENTORY_DEPARTMENT:
        return departmentDropdown;
      case xAxesFields?.REQUESTER:
        return usersDropdown;
      case xAxesFields?.CATEGORY:
        return categoriesDropdown;
      case xAxesFields?.TICKETS_DEPARTMENT:
        return departmentDropdown;
      case xAxesFields?.AGENT:
        return usersDropdown;
      case xAxesFields?.CONTACT_VENDORS:
        return vendorsDropdown;
      case xAxesFields?.APPROVERS:
        return usersDropdown;
      case xAxesFields?.PURCHASE_ORDER_VENDORS:
        return vendorsDropdown;
      case xAxesFields?.PURCHASE_ORDER_LOCATION:
        return locationDropdown;
      case xAxesFields?.PURCHASE_ORDER_DEPARTMENT:
        return departmentDropdown;
      case xAxesFields?.DEALS_PIPELINE_ID:
        return dealsDropdown;
      case xAxesFields?.CAMPAIGN_OWNER:
        return usersDropdown;
      case xAxesFields?.SALES_PIPELINES_ID:
        return salesDropdown;
      case xAxesFields?.USERS:
        return usersDropdown;
      case xAxesFields?.CONTRACT_TYPE:
        return contractTypeDropdown;
      default:
        return [];
    }
  };
  const singleFieldDropdown = getSingleFieldDropdown();

  return {
    handleSave,
    edit,
    setEdit,
    editValue,
    setEditValue,
    singleFieldDropdown,
    chartTitle,
    xAxisData,
    xAxisType,
    chartType,
    disableTemplate,
    productId,
  };
};
