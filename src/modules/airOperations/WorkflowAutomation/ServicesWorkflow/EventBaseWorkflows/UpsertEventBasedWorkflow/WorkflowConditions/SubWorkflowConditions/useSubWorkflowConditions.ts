import { SCHEMA_KEYS } from '@/constants/strings';
import { useGetSchemaKeysQuery } from '@/services/common-APIs';
import { errorSnackbar } from '@/utils/api';
import { useFieldArray } from 'react-hook-form';
import {
  requesterFieldOptions,
  statusOptions,
  ticketsFields,
} from './SubWorkflowConditions.data';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent, watch } = props;
  const params = {
    collectionName: SCHEMA_KEYS?.TICKETS,
  };
  const conditionOption: any = {
    'Ticket Fields': ticketsFields,
    'Requester Fields': requesterFieldOptions,
    'Requested for Fields': statusOptions,
  };
  const selectedOption = watch('options');
  const ticketsFieldsOptions = conditionOption[selectedOption] || [];

  const { data } = useGetSchemaKeysQuery(params);
  const schemaKeysData = data?.data;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups.${index}.conditions`,
  });
  const handleDeleteClick = (subIndex: any) => {
    if (parentField?.length === 1 && fields?.length < 2) {
      errorSnackbar('Cannot Delete');
      return;
    }
    if (fields?.length > 1) {
      remove(subIndex);
    }
    if (parentField?.length >= 2 && fields?.length === 1) {
      removeParent(index);
    }
  };
  return {
    fields,
    append,
    handleDeleteClick,
    schemaKeysData,
    conditionOption,
    ticketsFieldsOptions,
  };
};
