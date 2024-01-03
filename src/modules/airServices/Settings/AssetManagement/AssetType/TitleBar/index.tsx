import { Create, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { styles } from './TitleBar.style';
import AddNewAssetTypesModal from '../AddNewAssetTypesModal';
import { useTitleBar } from './useTitleBar';
const TitleBar = (props?: any) => {
  const {
    methods,
    handleSubmitEditForm,
    openEditAssetTypesModal,
    setEditNewAssetTypesModal,
  } = useTitleBar();
  const { title, handleCollapse, icNotCollapseAble } = props;
  const { palette } = useTheme();

  return (
    <>
      <Box
        borderLeft={`4px solid ${palette?.primary.main}`}
        boxShadow={1}
        borderRadius={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent="space-between"
        gap={1.8}
        px={1.5}
        sx={{
          backgroundColor: palette?.common?.white,
        }}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent="space-between"
          gap={1.8}
        >
          {icNotCollapseAble ? (
            'L'
          ) : (
            <KeyboardArrowDown
              sx={styles?.arrowStyle}
              onClick={handleCollapse}
            />
          )}
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography fontWeight={500} py={1.5} textTransform="capitalize">
            {title}
          </Typography>
        </Box>
        <Create
          sx={styles?.createIconStyle}
          onClick={() => setEditNewAssetTypesModal?.(true)}
        />
      </Box>
      <Box>
        <AddNewAssetTypesModal
          open={openEditAssetTypesModal}
          handleClose={setEditNewAssetTypesModal}
          methods={methods}
          handleSubmit={handleSubmitEditForm}
          modalTitle="Edit Asset Types"
        />
      </Box>
    </>
  );
};

export default TitleBar;
