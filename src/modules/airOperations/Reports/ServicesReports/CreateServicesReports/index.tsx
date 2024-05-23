import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { Box, Grid } from '@mui/material';
import DraggableFields from './DraggableFields';
import { fieldsList } from './CreateServicesReports.data';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableArea from './DroppableArea';
import useCreateServicesReports from './useCreateServicesReports';
import { FormProvider } from 'react-hook-form';

export const CreateServicesReports = () => {
  const {
    handleDragEnd,
    router,
    form,
    setForm,
    modal,
    theme,
    fieldData,
    handleCancel,
    formattedText,
    applyFormat,
    setText,
    bold,
    italic,
    underline,
    color,
    fontSize,
    textAlign,
    alignItem,
    setFontSize,
    setColor,
    methods,
  } = useCreateServicesReports();

  return (
    <FormProvider {...methods}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container gap={2}>
          <Grid
            item
            sm={12}
            lg={7.9}
            p={2}
            borderRadius={3}
            boxShadow={`0px 0px 10px 10px ${theme?.palette?.grey[100]}`}
          >
            <PageTitledHeader
              title={'Create Report'}
              canMovedBack
              moveBack={() => {
                router?.push({
                  pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
                });
              }}
            />
            <Box
              borderRadius={2}
              bgcolor={'common.white'}
              display={'flex'}
              alignItems={'center'}
              p={2}
            >
              <DroppableArea
                form={form}
                setForm={setForm}
                fieldData={fieldData}
                modal={modal}
                fontSize={fontSize}
                color={color}
                setText={setText}
                bold={bold}
                italic={italic}
                underline={underline}
                textAlign={textAlign}
                alignItem={alignItem}
                formattedText={formattedText}
              />
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            lg={3.8}
            p={2}
            borderRadius={3}
            boxShadow={`0px 0px 10px 10px ${theme?.palette?.grey[100]}`}
          >
            <Box borderRadius={2} bgcolor={'common.white'} p={2}>
              <DraggableFields
                fieldsList={fieldsList}
                form={form}
                setForm={setForm}
                fieldData={fieldData}
                modal={modal}
                handleCancel={handleCancel}
                applyFormat={applyFormat}
                setColor={setColor}
                setFontSize={setFontSize}
                fontSize={fontSize}
                color={color}
              />
            </Box>
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
