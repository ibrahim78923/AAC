import { Box } from '@mui/material';
import React from 'react';
import { styles } from './styles';
import { fieldTypes } from '@/constants/form-builder';

const FormField = ({ field, buttonStyle }: any) => {
  return (
    <Box sx={styles?.field}>
      {field?.label &&
        field?.type !== fieldTypes?.button &&
        field?.type !== fieldTypes?.divider &&
        field?.type !== fieldTypes?.space && (
          <Box sx={styles?.fieldLabel}>
            <label htmlFor={field?.name}>{field?.label}</label>
          </Box>
        )}
      {field?.type === fieldTypes?.text && (
        <Box sx={styles?.fieldInput}>
          <input
            className="field-control"
            type={field?.subtype ? field?.subtype : 'text'}
            placeholder={field?.placeholder ?? ''}
          />
        </Box>
      )}
      {field?.type === fieldTypes?.textarea && (
        <Box sx={styles?.fieldInput}>
          <textarea
            className="field-control"
            placeholder={field?.placeholder ?? ''}
          />
        </Box>
      )}
      {field?.type === fieldTypes?.select && (
        <Box sx={styles?.fieldInput}>
          <select className="field-control">
            {field?.values?.map((option: any) => (
              <option
                key={option?.value}
                value={option?.value}
                selected={option?.selected}
              >
                {option?.label}
              </option>
            ))}
          </select>
        </Box>
      )}

      {field?.type === fieldTypes?.file && (
        <Box sx={styles?.fieldInput}>
          <input
            className="field-control"
            type="file"
            placeholder={field?.placeholder}
          />
        </Box>
      )}

      {field?.type === fieldTypes?.button && (
        <Box sx={styles?.fieldInput}>
          <Box
            component={'button'}
            sx={(theme) => styles?.fieldButton(theme, buttonStyle)}
            className="field-button"
            type={field?.buttonType}
          >
            {field?.buttonText}
          </Box>
        </Box>
      )}

      {field?.type === fieldTypes?.space && (
        <Box sx={{ height: `${field?.space}px` }}></Box>
      )}

      {field?.type === fieldTypes?.divider && (
        <Box
          component="hr"
          sx={{
            border: 'none',
            borderTop: `1px solid ${field?.dividerColor}`,
            borderWidth: `${field?.dividerWidth}px`,
          }}
        />
      )}
    </Box>
  );
};

export default FormField;
