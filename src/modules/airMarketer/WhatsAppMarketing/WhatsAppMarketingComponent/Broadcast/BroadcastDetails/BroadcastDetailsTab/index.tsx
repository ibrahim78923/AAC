import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from '@mui/material';
import Search from '@/components/Search';
import DetailsTable from './DetailsTable';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styles } from './BroadcastDetailsTab.style';
import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useBroadcastDetails from '../useBroadcastDetails';
import Image from 'next/image';
import StatusCards from '../../../Dashboard/StatusCards';
import { STATUS_CONTANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

const BroadcastDetailsTab = ({
  isLoading,
  broadcastDetails,
  recordStatus,
}: any) => {
  const {
    updateBroadcastLoading,
    handleDeleteRecipient,
    setOpenModalDelete,
    handleCloseDelete,
    openModalDelete,
    updatedRecords,
    setFilters,
    filters,
  } = useBroadcastDetails(broadcastDetails);

  const exportToCSV: any = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}_${currentDate
      .getHours()
      .toString()
      .padStart(2, '0')}-${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const fileName = `Whatsapp_Marketing_Data_${formattedDate}.csv`;

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'First Name,Last Name,Phone Number,Status',
        ...updatedRecords?.map(
          (val: any) =>
            `${val?.firstName},${val?.lastName},="${val?.phoneNumber}",${val?.messageStatus}`,
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    enqueueSnackbar('File Exported Successfully', { variant: 'success' });
  };

  return (
    <>
      <Box sx={{ p: '0 24px' }}>
        {isLoading ? (
          <Skeleton height={250} width={600} />
        ) : (
          <>
            {broadcastDetails?.status !== STATUS_CONTANTS?.DRAFT &&
              broadcastDetails?.status !== STATUS_CONTANTS?.SCHEDULED && (
                <StatusCards
                  whatsappAnalytics={broadcastDetails?.statisticsData}
                  loading={isLoading}
                />
              )}

            <Box sx={styles?.media} mt={3}>
              <Image
                height={150}
                width={500}
                src={
                  broadcastDetails?.template[0]?.types?.['twilio/media']
                    ?.media[0]
                }
                alt="broadcast_image"
              />
            </Box>
            <Box sx={styles?.previewDetails}>{broadcastDetails?.detail}</Box>
          </>
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ pt: '32px', pb: '16px' }}
        >
          <Search
            size="small"
            placeholder="Search Here"
            onChange={(e: any) => {
              setFilters({ ...filters, search: e?.target?.value });
            }}
          />
          <Box sx={{ gap: 1, display: 'flex' }}>
            <FormControl size="small">
              <Select
                sx={{ height: '36px' }}
                value={filters?.status}
                onChange={(e: any) => {
                  setFilters({ ...filters, status: e?.target?.value });
                }}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'sent'}>Sent</MenuItem>
                <MenuItem value={'delivered'}>Delivered</MenuItem>
                <MenuItem value={'undelivered'}>Undelivered</MenuItem>
                <MenuItem value={'read'}>Read</MenuItem>
                <MenuItem value={'failed'}>Failed</MenuItem>
              </Select>
            </FormControl>
            <Button
              className="small"
              color="inherit"
              variant="outlined"
              endIcon={<GetAppIcon />}
              onClick={() => exportToCSV()}
            >
              Export
            </Button>
          </Box>
        </Stack>
      </Box>

      <DetailsTable
        setOpenModalDelete={setOpenModalDelete}
        recepientsData={updatedRecords}
        loading={isLoading}
        recordStatus={recordStatus}
      />

      {openModalDelete?.isToggle && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={openModalDelete?.isToggle}
          handleClose={handleCloseDelete}
          handleSubmitBtn={() => {
            handleDeleteRecipient(openModalDelete?.recipientId);
          }}
          loading={updateBroadcastLoading}
        />
      )}
    </>
  );
};

export default BroadcastDetailsTab;
