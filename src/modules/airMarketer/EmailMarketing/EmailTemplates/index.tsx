import React, { useState } from 'react';
import DotsBold from '@/assets/icons/modules/airMarketer/SocialInbox/dots-bold';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { templatesCardsArray } from './EmailTemplates.data';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import Search from '@/components/Search';
import { PlusIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';

const EmailTemplates = () => {
  const [search, setSearch] = useState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();
  return (
    <Box>
      <Grid container spacing={2} sx={{ marginY: '30px' }}>
        <Grid item lg={6} xs={12} sx={{ paddingTop: '8px !important' }}>
          <Typography variant="h5">All Template</Typography>
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ paddingTop: '0px !important', textAlign: 'end' }}
        >
          <Search
            size="small"
            label="Search Here"
            searchBy={search}
            setSearchBy={setSearch}
          />
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            sx={{ marginLeft: '15px' }}
            onClick={() =>
              router.push(`${AIR_MARKETER?.CREATE_EMAIL_TEMPLATES}`)
            }
          >
            Create New Template
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {templatesCardsArray?.map((item: any) => (
          <Grid key={uuidv4()} item lg={4} md={6} xs={12}>
            <Card
              sx={{
                borderRadius: '12px',
                border: ' 1px solid var(--Stroke-Color-200, #E5E7EB)',
              }}
            >
              <Box
                sx={{
                  background: 'var(--TextColor-100, #F3F4F6)',
                  display: 'flex',
                }}
              >
                <Image
                  src={item?.image}
                  alt="gaga"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              </Box>
              <CardContent sx={{ padding: '20px' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body3" fontWeight={600}>
                    {item?.title}
                  </Typography>
                  <Button
                    id="basic-button"
                    aria-controls={'basic-menu'}
                    aria-haspopup="true"
                    aria-expanded={'true'}
                    color="inherit"
                    onClick={handleActionsMenuClick}
                    sx={{ height: 'fit-Content', minWidth: '5px' }}
                  >
                    <DotsBold />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={actionMenuOpen}
                    onClose={handleActionsMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        router.push(`${AIR_MARKETER?.CREATE_EMAIL_TEMPLATES}`)
                      }
                    >
                      Edit
                    </MenuItem>

                    <MenuItem sx={{ color: 'red' }}>Delete</MenuItem>
                  </Menu>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  className="small"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    router.push(`${AIR_MARKETER?.CREATE_EMAIL_TEMPLATES}`)
                  }
                >
                  <Typography variant="body3" fontWeight={400}>
                    Use this Template
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmailTemplates;
