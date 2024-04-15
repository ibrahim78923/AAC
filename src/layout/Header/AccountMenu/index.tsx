import React, { useState } from 'react';
import Image from 'next/image';

import { Box, useTheme, Popover, Typography } from '@mui/material';

import {
  getActivePermissionsSession,
  isNullOrEmpty,
  stringArraysEqual,
} from '@/utils';

import { CrossImage, HomeMenuImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './AccountMenu.style';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import {
  useGetAuthAccountsQuery,
  usePostAuthAccountSelectMutation,
} from '@/services/auth';
import { getRoutes } from '@/layout/Layout.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { generateImage } from '@/utils/avatarUtils';

const role = 'sales';
const AccountMenu = () => {
  const theme = useTheme();
  const { setActiveProduct, setPermissions } = useAuth();
  const router = useRouter();
  const { data: accountsData } = useGetAuthAccountsQuery({});
  const [PostAuthAccountSelect] = usePostAuthAccountSelectMutation();
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [activePermissions, setActivePermissions] = useState<any>([]);

  const findModulePermissionKey = async (product: any, id: string) => {
    const payload = { account: id };
    try {
      const response = await PostAuthAccountSelect(payload)?.unwrap();

      const routes = getRoutes(product);

      if (response?.data && routes) {
        setPermissions();
        setSelectedProduct(routes);
      } else {
        enqueueSnackbar('No Permissions and Product Available', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    return false;
  };

  const permissionsFromLocalStorage = getActivePermissionsSession();
  const permissionsHandler = () => {
    for (const modulePermission of selectedProduct) {
      const componentPermissionsDictionary: any = {};
      modulePermission?.permissions?.forEach((value: any) => {
        componentPermissionsDictionary[value] = true;
      });
      for (const permission of permissionsFromLocalStorage) {
        if (componentPermissionsDictionary[permission]) {
          return router?.push(modulePermission?.key);
          // Return the module permission path
        }
      }
    }
  };
  if (!stringArraysEqual(permissionsFromLocalStorage, activePermissions)) {
    permissionsHandler();
    setActivePermissions(permissionsFromLocalStorage);
  }
  const [openPopver, setOpenPopover] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpenPopover(event?.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const isOpenPopover = Boolean(openPopver);
  const id = isOpenPopover ? 'simple-popover' : undefined;
  return (
    <div>
      <Box onClick={handleClick}>
        <Image
          src={HomeMenuImage}
          alt="dropdown"
          style={{ cursor: 'pointer' }}
        />
      </Box>

      <Popover
        id={id}
        open={isOpenPopover}
        anchorEl={openPopver}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          marginTop: '20px',
          '& .MuiPopover-paper': {
            height: '93vh',
            width: '450px',
          },
        }}
      >
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            <Typography variant="subtitle1">My Accounts</Typography>
            <Typography
              variant="subtitle2"
              onClick={handleClose}
              sx={{ cursor: 'pointer' }}
            >
              <Image src={CrossImage} alt="cross-image" />
            </Typography>
          </Box>
          <Box>
            {!isNullOrEmpty(accountsData) &&
              accountsData?.data?.map((item) => {
                return (
                  <Box sx={{ px: 2 }} key={uuidv4()}>
                    <Box sx={styles?.mainBox(item, role, theme)}>
                      <Box style={styles?.cartBox(item, role, theme)}>
                        <Image
                          src={generateImage(item?.logo?.url)}
                          width={25}
                          height={25}
                          alt="product"
                          style={{
                            filter:
                              item?.role === role
                                ? 'brightness(100) grayscale(100%)'
                                : '',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ marginLeft: '10px' }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>

                    <Box>
                      {item?.accounts?.map((subitem) => {
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'baseline',
                              padding: '10px 0px 10px 45px',
                            }}
                            key={uuidv4()}
                          >
                            <Typography
                              sx={styles?.radioCircle(theme)}
                            ></Typography>
                            <Box>
                              <Typography
                                variant="body1"
                                onClick={() => {
                                  findModulePermissionKey(
                                    item?.name,
                                    subitem?._id,
                                  );
                                  setActiveProduct(item);
                                }}
                              >
                                {subitem?.company?.accountName}
                              </Typography>
                              <Typography variant="body2">
                                {subitem?.websiteLink}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </>
      </Popover>
    </div>
  );
};

export default AccountMenu;
