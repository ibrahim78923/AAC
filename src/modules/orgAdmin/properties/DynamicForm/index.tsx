import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ORG_ADMIN } from '@/constants';
import { Box, Grid } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  Date,
  DraggableFields,
  Dropdown,
  DroppableArea,
  MultipleSelection,
  ParagraphText,
  SingleSelection,
  Text,
  Upload,
} from '@/components/DynamicFormModals';
import useVendorFields from './useVendorFields';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { predefinedVendorDataArray } from './VendorFields.data';
// import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
// import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export default function DynamicForm() {
  const {
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
  } = useVendorFields();

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {/* <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_NEW_VENDORS_FIELDS,
        ]}
      > */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: 'common.white',
              p: '26px 24px',
              mb: 2,
              '& br': {
                display: 'none',
              },
            }}
          >
            <PageTitledHeader
              title={'Module Title'}
              canMovedBack
              moveBack={() => {
                router?.push({
                  pathname: ORG_ADMIN?.PROPERTIES,
                });
              }}
            />
          </Box>

          <Box
            borderRadius={2}
            bgcolor={'common.white'}
            p={2}
            height={'70vh'}
            overflow={'auto'}
          >
            <DroppableArea
              form={form}
              setForm={setForm}
              handleEdit={handleEdit}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              getBackendData={getBackendData}
              overlay={overlay}
              predefinedDataArray={predefinedVendorDataArray}
              moduleType={DYNAMIC_FIELDS?.MT_VENDOR}
              productType={DYNAMIC_FIELDS?.PT_SERVICES}
              successPath={ORG_ADMIN?.PROPERTIES}
              cancelPath={ORG_ADMIN?.PROPERTIES}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            borderRadius={2}
            bgcolor={'common.white'}
            p={2}
            height={'80vh'}
            overflow={'auto'}
          >
            <DraggableFields />
          </Box>
        </Grid>
      </Grid>

      {modal?.text && (
        <Text
          open={modal?.text}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}

      {modal?.paragraphText && (
        <ParagraphText
          open={modal?.paragraphText}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}

      {modal?.singleSelection && (
        <SingleSelection
          open={modal?.singleSelection}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}

      {modal?.multipleSelection && (
        <MultipleSelection
          open={modal?.multipleSelection}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}

      {modal?.date && (
        <Date
          open={modal?.date}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}

      {modal?.upload && (
        <Upload
          open={modal?.upload}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}

      {modal?.dropdown && (
        <Dropdown
          open={modal?.dropdown}
          setOpen={setModal}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      )}
      {/* </PermissionsGuard> */}
    </DragDropContext>
  );
}
