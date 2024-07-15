import { useState } from 'react';
import { CloseDrawerIcon } from '@/assets/icons';

import { Box, Button, Typography, useTheme } from '@mui/material';
import { deviceTypes } from './PreviewTemplate.data';
import { TEMPLATE_VIEW_TYPES } from '@/constants';
import { PreviewTemplatePropsI } from './previewTemplate.interface';
import { styles } from './PreviewTemplates.styles';
import { generateHTML } from '@/utils/emailTemplate';

const PreviewTemplate = ({
  setOpenModal,
  fields,
  minifyPreview,
}: PreviewTemplatePropsI) => {
  const theme = useTheme();
  const [value, setValue] = useState(TEMPLATE_VIEW_TYPES?.LAPTOP);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const generatedHTML = generateHTML(
    fields,
    value === TEMPLATE_VIEW_TYPES?.MOBILE,
  );

  return (
    <Box>
      {!minifyPreview && (
        <Box
          sx={{
            marginBottom: '20px',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h5">Preview</Typography>
            <Typography>Your Preview will appear here</Typography>
          </Box>
          <Box
            onClick={() => setOpenModal && setOpenModal(false)}
            sx={{ width: '30px', height: '40px', cursor: 'pointer' }}
          >
            <CloseDrawerIcon />
          </Box>
        </Box>
      )}

      {!minifyPreview && (
        <Box
          sx={{
            display: 'flex',
            backgroundColor: theme?.palette?.primary?.light,
            width: 'fit-content',
            p: 0.5,
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          {deviceTypes(value)?.map(({ type, icon }) => (
            <Box key={type}>
              <Button
                variant={value === type ? 'contained' : 'outlined'}
                sx={{ border: 'none !important' }}
                onClick={() => handleChange(type)}
              >
                {icon}
              </Button>
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={
          minifyPreview
            ? styles?.previewTemplateMinifyWrapper()
            : styles?.previewTemplateWrapper(theme, value)
        }
      >
        {fields?.length > 0 ? (
          <Box
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: generatedHTML }}
          />
        ) : (
          <Box sx={{ margin: '0 auto', mt: 2, textAlign: 'center' }}>
            No Preview Available{' '}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PreviewTemplate;
