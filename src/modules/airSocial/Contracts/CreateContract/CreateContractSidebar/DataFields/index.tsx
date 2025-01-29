import React from 'react';
import { Box } from '@mui/material';
import { styles } from './DataFields.styles';
import AddFields from './AddFields';
// import { FIELD_TYPES } from '@/utils/contracts';
import AllFields from './AllFields';

// const mockFields = [
//   {
//     id: 2,
//     name: 'startDate',
//     label: 'Start Date',
//     type: FIELD_TYPES.DATE,
//     placeholder: 'Set date',
//   },
//   {
//     id: 1,
//     name: 'renewalTerms',
//     label: 'Renewal terms',
//     type: FIELD_TYPES.TEXT,
//     placeholder: 'Add text',
//   },
//   {
//     id: 4,
//     name: 'contractCurrency',
//     label: 'Contract currency',
//     type: FIELD_TYPES.CHECKBOX,
//     placeholder: 'Select',
//     options: [
//       { value: 'USD', label: 'USD' },
//       { value: 'EUR', label: 'EUR' },
//       { value: 'GBP', label: 'GBP' },
//     ],
//   },
//   {
//     id: 44,
//     name: 'contractValue',
//     label: 'Total yearly Contract Value',
//     type: FIELD_TYPES.CHECKBOX,
//     placeholder: 'Select',
//     options: [
//       { value: 'yes', label: 'Yes' },
//       { value: 'no', label: 'No' },
//     ],
//   },
//   {
//     id: 3,
//     name: 'amount',
//     label: 'Amount',
//     type: FIELD_TYPES.NUMBER,
//     placeholder: 'Add value',
//   },
// ];

export default function DataFields({
  handleAddDynamicField,
  allDataFields,
}: any) {
  return (
    <Box sx={styles?.dataFields}>
      <AddFields
        data={allDataFields}
        handleAddDynamicField={handleAddDynamicField}
      />

      <AllFields
        data={allDataFields}
        handleAddDynamicField={handleAddDynamicField}
      />
    </Box>
  );
}
