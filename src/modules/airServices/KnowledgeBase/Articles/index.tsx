import { Box, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { FolderGreyIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { actionBtnData, articlesTabs, data } from './Articles.data';
import { useArticles } from './useArticles';
import { styles } from './Articles.style';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const Articles = () => {
  const {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    selectedArticlesData,
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
                sx={{ ...tabWrapper(tab, selectedArticlesTab) }}
                onClick={() => handleSelectedArticlesTab(tab)}
              >
                <FolderGreyIcon
                  fill={selectedTabColor(tab, selectedArticlesTab)}
                />
                <Typography
                  color={selectedTabColor(tab, selectedArticlesTab)}
                  textTransform={'capitalize'}
                >
                  {tab}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={7.25} lg={9} xl={10.25}>
          <Grid
            container
            alignItems={'flex-end'}
            justifyContent={'space-between'}
          >
            <Search />
            <SingleDropdownButton
              disabled={!!!selectedArticlesData.length}
              dropdownOptions={actionBtnData}
            />
          </Grid>
          <br />
          <TanstackTable data={data} columns={articlesColumns} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>
      </Grid>
    </>
  );
};
