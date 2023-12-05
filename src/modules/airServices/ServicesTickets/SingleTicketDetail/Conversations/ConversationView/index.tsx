import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import {
  AvatarConversationImage,
  NoAssociationFoundImage,
} from '@/assets/images';
import { styles } from '../Conversation.styles';
import NoData from '@/components/NoData';
import { ConversationSelectedValuesI } from '../Conversation.interface';
import { useConversationView } from './useConversationView';
import { menuOptionsAddConversation } from '../Conversation.data';
import ConversationMenu from '../ConversationMenu';
import { AlertModals } from '@/components/AlertModals';
import { TICKETS_CONVERSATION_VALUE } from '@/constants/strings';

const ConversationView: React.FC<{
  selectedValues: ConversationSelectedValuesI;
  open: boolean;
  handleClickButtonMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  addConversation: HTMLElement | null;
  handleCloseButtonMenu: (e: any) => void;
  setSelectedItem: (value: any) => void;
}> = ({
  selectedValues,
  open,
  handleClickButtonMenu,
  addConversation,
  handleCloseButtonMenu,
  setSelectedItem,
}) => {
  const {
    conversationActionIcon,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
  } = useConversationView();

  const theme = useTheme();

  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format('h:mm A -D MMMM, YYYY'),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('h:mm A -D MMMM, YYYY'));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const renderConversationItem = ([id, conversationData]) => {
    const transformedData = Object?.entries(conversationData)?.map(
      ([key, value]) => {
        const itemData = () => {
          switch (key) {
            case TICKETS_CONVERSATION_VALUE.FILE: {
              return {
                name: value?.name,
                size: value?.size,
                type: value?.type,
              };
            }
            case TICKETS_CONVERSATION_VALUE.DESCRIPTION: {
              return { description: value };
            }
            default:
              return value;
          }
        };

        return itemData();
      },
    );

    const actionType =
      conversationData?.note ||
      conversationData?.reply ||
      conversationData?.forward;

    return (
      <>
        <Grid
          container
          justifyContent="space-between"
          sx={styles?.parent}
          mb="1.25rem"
          key={id}
          gap={2}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Grid item lg={5} xs={12} paddingTop="0 !important" flex={1}>
            <Box sx={styles?.leftSideParent}>
              <Box
                display="flex"
                sx={{ flexDirection: { md: 'row', xs: 'column' } }}
              >
                <Image
                  src={AvatarConversationImage?.src}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <Box sx={{ ml: { md: 2, xs: 0 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { md: 'row', xs: 'column' },
                      mt: { md: 0, xs: 2 },
                    }}
                  >
                    {transformedData
                      ?.filter((value) => !value?.name && !value?.size)
                      ?.map((value) => (
                        <Typography
                          key={uuidv4()}
                          component="span"
                          sx={{
                            mr: 1,
                            color: theme?.palette?.primary?.main,
                          }}
                        >
                          {!value?.description && (
                            <Typography>{value}</Typography>
                          )}
                        </Typography>
                      ))}
                  </Box>
                  <Typography sx={styles?.date}>{currentTime}</Typography>
                </Box>
              </Box>
              <Box>
                <div
                  dangerouslySetInnerHTML={{
                    __html: transformedData?.find((value) => value?.description)
                      ?.description,
                  }}
                ></div>
              </Box>
            </Box>
          </Grid>
          <Grid lg={3} xs={12}>
            {transformedData
              ?.filter((value) => value?.name || value?.size)
              ?.map((value) => (
                <Typography
                  key={uuidv4()}
                  component="span"
                  sx={{
                    mr: 1,
                    color: theme?.palette?.primary?.main,
                  }}
                >
                  <>
                    <Typography> {value?.name} </Typography>
                    {value?.size && (
                      <Typography>
                        {' '}
                        {`${(value?.size / 1024).toFixed(2)} KB`}{' '}
                      </Typography>
                    )}
                  </>
                </Typography>
              ))}
          </Grid>
          <Grid item lg={3} xs={12} paddingTop="0 !important">
            <Box sx={styles?.buttonBox}>
              {conversationActionIcon(actionType)}
            </Box>
          </Grid>
        </Grid>
        <Box>
          <AlertModals
            message="Are you sure you want to delete this conversation?"
            type="delete"
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleSubmit={handleDelete}
          />
        </Box>
      </>
    );
  };

  return (
    <Box>
      {Object?.entries(selectedValues)?.length > 0 ? (
        <Grid container marginTop={2}>
          {Object?.entries(selectedValues)?.map(renderConversationItem)}
        </Grid>
      ) : (
        <>
          <Box marginTop={-10}>
            <NoData
              message="There are no conversation available"
              image={NoAssociationFoundImage}
            >
              <ConversationMenu
                open={open}
                handleClickButtonMenu={handleClickButtonMenu}
                addConversation={addConversation}
                handleCloseButtonMenu={handleCloseButtonMenu}
                setSelectedItem={setSelectedItem}
                menuOptionsAddConversation={menuOptionsAddConversation}
              />
            </NoData>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ConversationView;
