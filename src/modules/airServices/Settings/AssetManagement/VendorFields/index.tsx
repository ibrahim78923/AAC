import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Box } from '@mui/material';
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
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export default function VendorFields() {
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
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_NEW_VENDORS_FIELDS,
        ]}
      >
        <ContainerGrid>
          <CustomGrid md={8}>
            <Box
              borderRadius={2}
              bgcolor={'common.white'}
              display={'flex'}
              alignItems={'center'}
              p={2}
              mb={2}
            >
              <PageTitledHeader
                title={'Vendor Fields'}
                canMovedBack
                moveBack={() => {
                  router?.push({
                    pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
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
                successPath={AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS}
                cancelPath={AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS}
              />
            </Box>
          </CustomGrid>
          <CustomGrid md={4}>
            <Box
              borderRadius={2}
              bgcolor={'common.white'}
              p={2}
              height={'80vh'}
              overflow={'auto'}
            >
              <DraggableFields />
            </Box>
          </CustomGrid>
        </ContainerGrid>

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
      </PermissionsGuard>
    </DragDropContext>
  );
}
