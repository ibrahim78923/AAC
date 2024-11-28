import React from 'react';
import PlainHeader from '@/components/PlainHeader';
import { styles } from './ContractTemplates.style';
import { Box, Grid, Typography } from '@mui/material';
import { IconPlainBack } from '@/assets/icons';
import Search from '@/components/Search';
import { mockTemplates, mockRecentlyUsed } from './Templates.data';
import TemplateCard from './TemplateCard';
import CreateDraftCard from './CreateDraftCard';
import Link from 'next/link';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import useContractTemplates from './useContractTemplates';

export default function ContractTemplates() {
  const { router, setSearchBy } = useContractTemplates();

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
          {mockRecentlyUsed.map((item: any) => (
            <Box
              key={item._id}
              component={Link}
              sx={styles.recentlyUsedItem}
              href={`${AIR_SOCIAL_CONTRACTS.CONTRACTS_CREATE}?id=${item._id}`}
            >
              {item.title}
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
            {mockRecentlyUsed.map((item: any) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item?._id}>
                <TemplateCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {mockTemplates.map((template: any) => (
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
