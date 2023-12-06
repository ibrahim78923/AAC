import { Box, Button, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { FilterIcon, FolderGreyIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';

import { articlesTabs, data } from './Articles.data';
import { useArticles } from './useArticles';
import { styles } from './Articles.style';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { AlertModals } from '@/components/AlertModals';
import { MoveFolderModal } from './MoveFolderModal';

export const Articles = () => {
  const {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    selectedArticlesData,
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    moveFolderModal,
    setMoveFolderModal,
    dropdownOptions,
    theme,
  } = useArticles();

  const { tabWrapper, selectedTabColor } = styles();

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={4} md={3.75} lg={3} xl={1.75}>
          <Box sx={{ m: '0.75rem 1.5rem 0.75rem 0 ' }}>
            {articlesTabs?.map((tab: string) => (
              <Box
                key={uuidv4()}
                sx={{ ...tabWrapper(tab, selectedArticlesTab, theme) }}
                onClick={() => handleSelectedArticlesTab(tab)}
              >
                <FolderGreyIcon
                  fill={selectedTabColor(tab, selectedArticlesTab, theme)}
                />
                <Typography
                  color={selectedTabColor(tab, selectedArticlesTab, theme)}
                  textTransform={'capitalize'}
                >
                  {tab}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={7.25} lg={9} xl={10.25}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Search placeholder="Search Here" />
            <Box display={'flex'} gap={1}>
              <SingleDropdownButton
                disabled={!!!selectedArticlesData?.length}
                dropdownOptions={dropdownOptions}
              />
              <Button
                variant="outlined"
                size="large"
                startIcon={<FilterIcon />}
                color="secondary"
              >
                Filter
              </Button>
            </Box>
          </Box>
          <br />
          <TanstackTable data={data} columns={articlesColumns} isPagination />
        </Grid>
      </Grid>
      <AlertModals
        type="delete"
        message="Do you want to delete the selected article?"
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleSubmitBtn={handleDeleteSubmit}
      />
      <MoveFolderModal
        moveFolderModal={moveFolderModal}
        setMoveFolderModal={setMoveFolderModal}
      />
    </>
  );
};
