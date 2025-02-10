import { Box } from '@mui/material';
import Search from '@/components/Search';
import { ExportButton } from '@/components/Buttons/ExportButton';
import { EXPORT_TYPE } from '@/constants/strings';
import { HeaderPropsI } from '../Installations.interface';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { useHeader } from './useHeader';
import { INSTALLATION_PORTAL_ACTION } from '../Installations.data';
import AddDevice from '../AddDevice';

export const Header = (props: HeaderPropsI) => {
  const { selectedDeviceList, isPortalOpen, setIsPortalOpen } = props;

  const {
    handleOpenDelete,
    handleSearch,
    handleAddDevice,
    getInstallationListDataExport,
  } = useHeader(props);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box ml={0.5}>
          <Search label="Search Here" setSearchBy={handleSearch} />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <CustomButton
            hasIcon={false}
            disabled={!!!selectedDeviceList?.length}
            onClick={handleOpenDelete}
          >
            Remove Device
          </CustomButton>
          <ExportButton
            handleCsvExport={() =>
              getInstallationListDataExport(EXPORT_TYPE?.CSV)
            }
            handleExcelExport={() =>
              getInstallationListDataExport(EXPORT_TYPE?.XLS)
            }
          />
          <AddNewItemButton name="Add Device" onClick={handleAddDevice} />
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === INSTALLATION_PORTAL_ACTION?.ADD_DEVICE && (
          <AddDevice
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
          />
        )}
    </>
  );
};
