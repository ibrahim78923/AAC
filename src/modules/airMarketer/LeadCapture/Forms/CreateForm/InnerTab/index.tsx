import { Box, Button, Grid, Typography, useTheme, Theme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../CreateForm.style';
import {
  dynamicallyFormDefaultValues,
  dynamicallyFormValidationSchema,
} from '../CreateForm.data';
import { useState } from 'react';
import { DeleteIcon } from '@/assets/icons';
import { isNullOrEmpty } from '@/utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const InnerTab = ({
  showView,
  dynamicFields,
  deleteField,
  setDynamicFields,
}: any) => {
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
      updatedFields[index].componentProps.paragraph = content;

      // Assuming 'paragraph' is the key for the Typography component content
      // Update the Typography component content as well
      updatedFields[index].componentProps.paragraphTypography = content;

      return updatedFields;
    });
  };

  const handleEditorClick = (clickedIndex: any) => {
    setDynamicFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields.forEach((field, i) => {
        field.componentProps.editorOpen =
          i === clickedIndex && !field.componentProps.editorOpen;
      });

      return updatedFields;
    });
  };

  return (
    <Box sx={styles?.subDiv(showView)}>
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
                  padding: '10px !important',
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
                  <Box
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 1,
                    }}
                    onClick={() => {
                      deleteField(index);
                    }}
                  >
                    <DeleteIcon />
                  </Box>
                )}
                {item?.componentProps?.heading && (
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {/* {item?.componentProps?.paragraph && (
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {item?.componentProps?.paragraph}
                  </Typography>
                )} */}
                {/* {item?.componentProps?.paragraph && (
                  <div
                    onClick={() => handleEditorClick(index)}
                    style={{ position: 'relative' }}
                  >
                    {item?.componentProps?.editorOpen ? (
                      <CKEditor
                        editor={ClassicEditor}
                        data={item?.componentProps?.paragraph}
                        config={item?.componentProps?.editorConfig}
                        onChange={(event, editor) => handleEditorChange(index, editor)}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {item?.componentProps?.paragraph}
                      </Typography>
                    )}
                  </div>
                )} */}
                {item?.componentProps?.paragraph && (
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
                          item?.componentProps?.paragraph,
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
                        <CKEditor
                          editor={ClassicEditor}
                          data={item?.componentProps?.paragraph}
                          config={item?.componentProps?.editorConfig}
                          onChange={(event, editor) =>
                            handleEditorChange(index, editor)
                          }
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
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                ></item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default InnerTab;
