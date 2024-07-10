import { useState } from 'react';
import { CloseDrawerIcon } from '@/assets/icons';

import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { deviceTypes } from './PreviewTemplate.data';
import { TEMPLATE_CONTENT_TYPES, TEMPLATE_VIEW_TYPES } from '@/constants';
import {
  PreviewDataItemI,
  PreviewTemplatePropsI,
} from './previewTemplate.interface';

const PreviewTemplate = ({ setOpenModal, fields }: PreviewTemplatePropsI) => {
  const theme = useTheme();
  const [value, setValue] = useState(TEMPLATE_VIEW_TYPES?.LAPTOP);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
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
          onClick={() => setOpenModal(false)}
          sx={{ width: '30px', height: '40px', cursor: 'pointer' }}
        >
          <CloseDrawerIcon />
        </Box>
      </Box>

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

      <Box
        sx={{
          padding:
            value === TEMPLATE_VIEW_TYPES?.LAPTOP ? '10px 100px' : '10px 30px',
          ...(value === TEMPLATE_VIEW_TYPES?.MOBILE && {
            borderRadius: '45px',
            border: `12px solid ${theme?.palette?.common?.black}`,
            width: '320px',
            height: '600px',
            margin: '0 auto',
            mt: 3,
            pt: 2,
            fontSize: '12px !important',
          }),
        }}
      >
        {fields.length > 0 ? (
          fields?.map((item: PreviewDataItemI) => {
            return (
              <Box key={item?._id}>
                {(() => {
                  switch (item?.type) {
                    case TEMPLATE_CONTENT_TYPES?.TEXT_AREA:
                      return (
                        <>
                          {item?.value && (
                            <Box
                              dangerouslySetInnerHTML={{ __html: item?.value }}
                            />
                          )}
                        </>
                      );
                    case TEMPLATE_CONTENT_TYPES?.SPACE:
                      return (
                        <>
                          <br />
                        </>
                      );
                    case TEMPLATE_CONTENT_TYPES?.BUTTON:
                      return (
                        <>
                          {item?.buttonText && (
                            <Button
                              sx={{
                                ...(value === TEMPLATE_VIEW_TYPES?.MOBILE && {
                                  fontSize: '12px !important',
                                  height: '30px',
                                }),
                              }}
                              variant="contained"
                            >
                              {item?.buttonText}
                            </Button>
                          )}
                        </>
                      );
                    case TEMPLATE_CONTENT_TYPES?.DIVIDER:
                      return (
                        <>
                          <Divider
                            style={{
                              borderColor: theme?.palette?.grey[700],
                              marginBottom: '5px',
                              marginTop: '5px',
                            }}
                          />
                        </>
                      );
                    default:
                      return <></>;
                  }
                })()}
              </Box>
            );
          })
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
