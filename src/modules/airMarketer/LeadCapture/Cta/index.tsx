import React from 'react';
import useCta from './useCta';

import {
  Box,
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import CtaEditorDrawer from './CtaEditorDrawer';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { ScheduleModals } from '@/components/ScheduleModals';

import { columns, ctAdata, exportData } from './Cta.data';

import { DeleteIcon, ExportDownloadIcon, PlusIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS } from '@/constants/permission-keys';

const CTA = () => {
  const {
    openDrawer,
    setOpenDrawer,
    openModal,
    setOpenModal,
    handleCheckboxChange,
    selectedCheckboxes,
    setSelectedCheckboxes,
    searchTerm,
    setSearchTerm,
    handlecheckExportFormats,
    checkExportFormats,
  } = useCta();
  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3"> CTAs</Typography>
            <PermissionsGuard
              permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.CREATE_CTA]}
            >
              <Button
                variant="contained"
                sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusIcon /> Create CTA
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.SERACH]}
          >
            <Search
              searchBy={searchTerm}
              setSearchBy={setSearchTerm}
              label="Search By Name"
              fullWidth
              size="small"
            />
          </PermissionsGuard>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: { md: 'end' } }}>
            <Box
              sx={{
                gap: 1,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <PermissionsGuard
                permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.DELETE]}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={selectedCheckboxes?.length === 0}
                  sx={{
                    minWidth: '0px',
                    height: '35px',
                    gap: 0.5,
                    color: 'red',
                  }}
                  onClick={() => setOpenModal('Delete')}
                >
                  <DeleteIcon
                    color={
                      selectedCheckboxes?.length > 0 ? '#FF4A4A' : '#D1D5DB'
                    }
                  />
                  Delete
                </Button>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.EXPORT]}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={() => setOpenModal('Export')}
                >
                  <ExportDownloadIcon /> Export
                </Button>
              </PermissionsGuard>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({
              handleCheckboxChange,
              selectedCheckboxes,
              setOpenDrawer,
            })}
            data={ctAdata}
          />
        </Grid>

        <ScheduleModals
          submitButonText="Export"
          type={'export'}
          open={openModal === 'Export'}
          handleClose={() => setOpenModal('')}
          handleSubmit={() => setOpenModal('')}
          isFooter={true}
        >
          <Grid
            container
            spacing={2}
            sx={{ padding: '0px 10px 10px 22px', maxWidth: '480px' }}
          >
            <Grid item xs={12}>
              <Typography variant="body2">File Format</Typography>
            </Grid>
            {exportData?.map((item) => (
              <Grid item md={4} xs={12} key={uuidv4()}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name={'name'}
                      onChange={(event) =>
                        handlecheckExportFormats(event, item?.value)
                      }
                      checked={checkExportFormats?.includes(`${item?.value}`)}
                    />
                  }
                  label={item?.label}
                />
              </Grid>
            ))}
          </Grid>
        </ScheduleModals>
      </Grid>

      {openDrawer && (
        <CtaEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setSelectedCheckboxes={setSelectedCheckboxes}
          selectedCheckboxes={selectedCheckboxes}
        />
      )}

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={openModal === 'Delete'}
        handleClose={() => setOpenModal('')}
        handleSubmit={() => setOpenModal('')}
      />
    </Box>
  );
};

export default CTA;
