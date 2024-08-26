import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_IDS,
  dynamicFormComponentToMatchMap,
  dynamicFormFieldsList,
  dynamicFormModalsInitialState,
} from '@/utils/dynamic-forms';
import {
  predefinedContactFields,
  predefinedCompanyFields,
  predefinedDocumentFields,
  predefinedFolderFields,
  predefinedMeetingFields,
  predefinedDealFields,
  predefinedGoalFields,
  predefinedQuoteFields,
  predefinedDealPipelineFields,
  predefinedSalesProductFields,
  predefinedCampaignFields,
  predefinedCampaignTaskFields,
  predefinedSmsBroadcastFields,
  predefinedSmsTemplateFields,
  predefinedWhatsappBroadcastFields,
  predefinedWhatsappTemplateFields,
  predefinedEmailFolderFields,
  predefinedLifeCycleStageFields,
  predefinedCreateTicketsFields,
  predefinedTicketTimeEntriesFields,
  predefinedTicketTaskFields,
  predefinedAssetsFields,
  predefinedContractsFields,
  predefinedPurchaseOrderFields,
  predefinedVendorFields,
  predefinedSoftwareFields,
  predefinedDepartmentFields,
  predefinedAddRequesterFields,
  predefinedAddAgentFields,
} from './predefinedFields';

export default function useDynamicFields() {
  const router: any = useRouter();
  const { productType, moduleType, companyId } = router?.query;

  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(dynamicFormModalsInitialState);
  const [editId, setEditId] = useState<any>(null);
  const [overlay, setOverlay] = useState(false);

  const [getDynamicFieldsTrigger, { isLoading, isFetching, isError }] =
    useLazyGetDynamicFieldsQuery();

  const getBackendData = async () => {
    const params = {
      companyId: companyId,
      productType: productType,
      moduleType: moduleType,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getBackendData();
  }, []);

  const getModalState = (item: any) => {
    const newModal: any = {
      ...dynamicFormModalsInitialState,
    };

    if (item?.component) {
      const matchTypes = dynamicFormComponentToMatchMap[item?.component];
      if (Array?.isArray(matchTypes)) {
        if (item?.componentProps?.multiline) {
          newModal['paragraphText'] = true;
        } else if (matchTypes?.includes('text')) {
          newModal['text'] = true;
        }
      } else if (matchTypes) {
        newModal[matchTypes] = true;
      }
    } else if (item?.id !== undefined) {
      const fieldType = dynamicFormFieldsList?.find(
        (field) => field?.id === item?.id,
      );
      if (fieldType) {
        newModal[fieldType?.match] = true;
      }
    }
    return newModal;
  };

  const handleDragStart = () => {
    setOverlay(true);
  };

  const handleDragEnd = (result: any) => {
    if (result?.destination?.droppableId === DYNAMIC_FORM_IDS?.DROPPABLE_ID) {
      const draggedItem = dynamicFormFieldsList?.find(
        (item: any) => item?.id === result?.draggableId,
      );
      setModal(getModalState(draggedItem));
      setEditId(null);
    }
    setOverlay(false);
  };

  const handleEdit = (id: string) => {
    const itemToEdit = form?.find((item: any) => item?.id === id);
    if (itemToEdit) {
      setModal(getModalState(itemToEdit));
      setEditId(id);
    }
  };

  // Function that return predefined fields based on moduleType
  const getPredefinedFields = (moduleType: string) => {
    const predefinedFieldsMap: { [key: string]: any } = {
      [DYNAMIC_FIELDS?.MT_CAMPAIGN_CREATE]: predefinedCampaignFields,
      [DYNAMIC_FIELDS?.MT_TASK]: predefinedCampaignTaskFields,
      [DYNAMIC_FIELDS?.MT_SMS_BROADCAST]: predefinedSmsBroadcastFields,
      [DYNAMIC_FIELDS?.MT_SMS_TEMPLATE]: predefinedSmsTemplateFields,
      [DYNAMIC_FIELDS?.MT_WHATSAPP_BROADCAST]:
        predefinedWhatsappBroadcastFields,
      [DYNAMIC_FIELDS?.MT_WHATSAPP_TEMPLATE]: predefinedWhatsappTemplateFields,
      [DYNAMIC_FIELDS?.MT_EMAIL_FOLDER]: predefinedEmailFolderFields,
      [DYNAMIC_FIELDS?.MT_CONTACT]: predefinedContactFields,
      [DYNAMIC_FIELDS?.MT_COMPANY]: predefinedCompanyFields,
      [DYNAMIC_FIELDS?.MT_DOCUMENT_CREATE]: predefinedDocumentFields,
      [DYNAMIC_FIELDS?.MT_DOCUMENT_FOLDER]: predefinedFolderFields,
      [DYNAMIC_FIELDS?.MT_MEETING]: predefinedMeetingFields,
      [DYNAMIC_FIELDS?.MT_DEAL]: predefinedDealFields,
      [DYNAMIC_FIELDS?.MT_GOAL]: predefinedGoalFields,
      [DYNAMIC_FIELDS?.MT_QUOTE]: predefinedQuoteFields,
      [DYNAMIC_FIELDS?.MT_DEAL_PIPELINE]: predefinedDealPipelineFields,
      [DYNAMIC_FIELDS?.MT_SALES_PRODUCT]: predefinedSalesProductFields,
      [DYNAMIC_FIELDS?.MT_LIFE_CYCLE_STAGE]: predefinedLifeCycleStageFields,
      [DYNAMIC_FIELDS?.MT_TICKETS]: predefinedCreateTicketsFields,
      [DYNAMIC_FIELDS?.MT_TIME_ENTRIES]: predefinedTicketTimeEntriesFields,
      [DYNAMIC_FIELDS?.MT_TASK]: predefinedTicketTaskFields,
      [DYNAMIC_FIELDS?.MT_ASSET_TYPE]: predefinedAssetsFields,
      [DYNAMIC_FIELDS?.MT_CONTRACT_TYPE]: predefinedContractsFields,
      [DYNAMIC_FIELDS?.MT_PURCHASE_ORDER]: predefinedPurchaseOrderFields,
      [DYNAMIC_FIELDS?.MT_VENDOR]: predefinedVendorFields,
      [DYNAMIC_FIELDS?.MT_SOFTWARE]: predefinedSoftwareFields,
      [DYNAMIC_FIELDS?.MT_DEPARTMENT]: predefinedDepartmentFields,
      [DYNAMIC_FIELDS?.MT_ADD_REQUESTER]: predefinedAddRequesterFields,
      [DYNAMIC_FIELDS?.MT_ADD_AGENT]: predefinedAddAgentFields,
    };

    return predefinedFieldsMap[moduleType] || [];
  };

  return {
    handleDragEnd,
    router,
    form,
    setForm,
    modal,
    setModal,
    handleEdit,
    editId,
    isLoading,
    isFetching,
    isError,
    getBackendData,
    handleDragStart,
    overlay,
    productType,
    moduleType,
    companyId,
    getPredefinedFields,
  };
}
