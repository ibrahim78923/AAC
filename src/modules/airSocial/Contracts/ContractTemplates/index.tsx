import React from 'react';
import Link from 'next/link';
import PlainHeader from '@/components/PlainHeader';
import Search from '@/components/Search';
import TemplateCard from './TemplateCard';
import CreateDraftCard from './CreateDraftCard';
import useContractTemplates from './useContractTemplates';
import { styles } from './ContractTemplates.style';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { IconPlainBack } from '@/assets/icons';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { v4 as uuidv4 } from 'uuid';

export default function ContractTemplates() {
  const {
    router,
    setSearchBy,

    loadingGetTemplates,
    fetchingGetTemplates,
    contractTemplatesData,

    recentlyUsedTemplatesData,
    loadingRecentlyUsedTemplates,
    fetchingRecentlyUsedTemplates,
  } = useContractTemplates();

  return (
    <>
      <PlainHeader>
        <Box sx={styles.toolbar}>
          <Box sx={styles.backButton} onClick={() => router.back()}>
            <IconPlainBack />
          </Box>
          <Box sx={styles.headerTitle}>Create Draft</Box>
        </Box>
      </PlainHeader>

      <Box sx={styles.container}>
        <Box sx={styles.searchBar}>
          <Box sx={styles.search}>
            <Search
              setSearchBy={setSearchBy}
              placeholder="Search for templates"
              backgroundColor="#fff"
              size="small"
              fullWidth
            />
          </Box>
        </Box>

        <Box sx={styles.recentlyUsedItems}>
          <Box sx={styles.recentlyUsedHighlight}>Recently Used</Box>
          {recentlyUsedTemplatesData?.data.map((item: any) => (
            <Box
              key={item._id}
              component={Link}
              sx={styles.recentlyUsedItem}
              href={`${AIR_SOCIAL_CONTRACTS.CONTRACTS_CREATE}?id=${item._id}`}
            >
              {item?.name}
            </Box>
          ))}
        </Box>

        <Box component={'section'} sx={styles.section}>
          <Typography sx={styles.sectionHeading} variant="h3">
            Recently Used
          </Typography>
          <Grid container spacing={'12px'}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <CreateDraftCard
                onClick={() =>
                  router.push(AIR_SOCIAL_CONTRACTS.CONTRACTS_CREATE)
                }
              />
            </Grid>
            {(loadingRecentlyUsedTemplates || fetchingRecentlyUsedTemplates) &&
              Array(5)
                .fill(null)
                .map(() => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={uuidv4()}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={'100%'}
                      height={148}
                      sx={styles?.skeleton}
                    />
                  </Grid>
                ))}
            {recentlyUsedTemplatesData?.data?.map((item: any) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item?._id}>
                <TemplateCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {(loadingGetTemplates || fetchingGetTemplates) && (
          <Box component={'section'} sx={styles.section}>
            <Box sx={{ mb: '18px' }}>
              <Skeleton animation="wave" variant="text" sx={styles?.skeleton} />
            </Box>
            <Grid container spacing={'12px'}>
              {Array(6)
                .fill(null)
                .map(() => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={uuidv4()}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={'100%'}
                      height={148}
                      sx={styles?.skeleton}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        {!(loadingGetTemplates || fetchingGetTemplates) &&
          contractTemplatesData?.data?.map((template: any) => (
            <Box component={'section'} sx={styles.section} key={template?._id}>
              <Typography sx={styles.sectionHeading} variant="h3">
                {template.name}
              </Typography>
              <Grid container spacing={'12px'}>
                {template.templates.map((item: any) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={item?._id}>
                    <TemplateCard data={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
      </Box>
    </>
  );
}
