import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Theme,
  Divider,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../CreateTemplatesForm.style';
import {
  dynamicallyFormDefaultValues,
  dynamicallyFormValidationSchema,
} from '../CreateTemplatesForm.data';
import { useState } from 'react';
import { DeleteIcon, DragSharedIcon } from '@/assets/icons';
import { isNullOrEmpty } from '@/utils';

import dynamic from 'next/dynamic';

const CustomEditor = dynamic(
  () => {
    return import('../../../../../../components/CustomEditor');
  },
  { ssr: false },
);

const InnerTab = ({ dynamicFields, deleteField, setDynamicFields }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme<Theme>();
  const dynamicallyFormForm = useForm({
    resolver: yupResolver(dynamicallyFormValidationSchema),
    defaultValues: dynamicallyFormDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = dynamicallyFormForm;

  const handleEditorChange = (index: any, editor: any) => {
    const content = editor?.getData();
    setDynamicFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      // updatedFields[index].componentProps.paragraph = content;
      updatedFields[index].componentProps.Text = content;

      // Assuming 'paragraph' is the key for the Typography component content
      // Update the Typography component content as well
      updatedFields[index].componentProps.paragraphTypography = content;

      return updatedFields;
    });
  };

  const handleEditorClick = (clickedIndex: any) => {
    setDynamicFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields?.forEach((field, i) => {
        field.componentProps.editorOpen =
          i === clickedIndex && !field.componentProps.editorOpen;
      });

      return updatedFields;
    });
  };

  return (
    <Box sx={styles?.subDiv}>
      <Box sx={styles?.innerBox}>
        {isNullOrEmpty(dynamicFields) && (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Please Create your Form from side bar menu selection.
          </Typography>
        )}
        <FormProvider
          methods={dynamicallyFormForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4} sx={{ marginTop: '-20px' }}>
            {dynamicFields?.map((item: any, index: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{
                  padding: '30px !important',
                  marginLeft: '40px !important',
                  position: 'relative',
                  cursor: 'pointer',
                  border: `1px solid ${
                    hoveredIndex === index
                      ? theme?.palette?.primary?.main
                      : 'white'
                  }`,
                  borderRadius: '5px',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <Box sx={styles?.hoverEffect}>
                    <DragSharedIcon />
                    <Box
                      onClick={() => {
                        deleteField(index);
                      }}
                    >
                      {' '}
                      <DeleteIcon />
                    </Box>
                  </Box>
                )}

                {item?.componentProps?.Text && (
                  <Box
                    onClick={() => handleEditorClick(index)}
                    sx={{ position: 'relative' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ textAlign: 'center' }}
                      dangerouslySetInnerHTML={{
                        __html:
                          item?.componentProps?.paragraphTypography ||
                          item?.componentProps?.Text,
                      }}
                    />
                    {item?.componentProps.editorOpen && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50px',
                          left: 0,
                          width: '100%',
                          zIndex: 1,
                        }}
                        onClick={(e) => e?.stopPropagation()}
                      >
                        <CustomEditor
                          initialData={item?.componentProps?.Text}
                          handleEditorChange={handleEditorChange}
                          index={index}
                        />
                      </Box>
                    )}
                  </Box>
                )}
                {item?.componentProps?.button && (
                  <Button variant="contained">
                    {item?.componentProps?.text}
                  </Button>
                )}
                {item?.componentProps?.Spacing && <Box></Box>}
                {item?.componentProps?.Divider && <Divider />}
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default InnerTab;
