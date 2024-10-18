import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Template.data';
import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { PlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_MARKETER_WHATSAPP_MARKETING_CREATE_TEMPLATE_PERMISSIONS,
  AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS,
} from '@/constants/permission-keys';
import useTemplates from './useTemplates';
import { AIR_MARKETER } from '@/routesConstants/paths';

const Templates = () => {
  const {
    getTempLoading,
    getTemplatesData,
    setPage,
    setLimit,
    router,
    setSearchBy,
    getTempFetching,
    getTempSuccess,
    deleteTemplateModal,
    deleteTemplateHandler,
    setDeleteTemplateModal,
    deleteTempLoading,
  } = useTemplates();

  const getColumns = columns({ setDeleteTemplateModal });

  return (
    <>
      <Box sx={{ padding: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
            '@media (max-width:581px)': {
              flexDirection: 'column-reverse',
            },
          }}
        >
          <PermissionsGuard
            permissions={[AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS.SEARCH]}
          >
            <Search
              size="small"
              label="Search here"
              setSearchBy={setSearchBy}
            />
          </PermissionsGuard>

          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_CREATE_TEMPLATE_PERMISSIONS?.CREATE_TEMPLATE,
            ]}
          >
            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              className="small"
              onClick={() =>
                router.push(AIR_MARKETER?.WHATSAPP_MARKETING_CREATE_TEMPLATE)
              }
            >
              Create Template
            </Button>
          </PermissionsGuard>
        </Box>

        <Box sx={{ mt: 2 }}>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS.TEMPLATES_LIST_VIEW,
            ]}
          >
            <TanstackTable
              data={getTemplatesData?.data?.whatsapptemplates}
              columns={getColumns}
              isPagination
              isLoading={getTempLoading}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setLimit}
              count={getTemplatesData?.data?.meta?.pages}
              pageLimit={getTemplatesData?.data?.meta?.limit}
              totalRecords={getTemplatesData?.data?.meta?.total}
              isSuccess={getTempSuccess}
              isFetching={getTempFetching}
              currentPage={getTemplatesData?.data?.meta?.page}
            />
          </PermissionsGuard>

          {deleteTemplateModal?.isOpen && (
            <AlertModals
              type="delete"
              loading={deleteTempLoading}
              open={deleteTemplateModal?.isOpen}
              message="Are you sure you want to delete this template ?"
              handleSubmitBtn={() =>
                deleteTemplateHandler(deleteTemplateModal?.id)
              }
              handleClose={() =>
                setDeleteTemplateModal({
                  ...deleteTemplateModal,
                  isOpen: false,
                })
              }
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Templates;
