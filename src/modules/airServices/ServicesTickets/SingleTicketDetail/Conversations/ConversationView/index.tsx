// ConversationView.tsx
import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import {
  AvatarConversationImage,
  NoAssociationFoundImage,
} from '@/assets/images';
import { styles } from '../Conversation.styles';
import NoData from '@/components/NoData';
import { DeleteIcon, ShortcutSharpRightIcon } from '@/assets/icons';
import Image from 'next/image';
// ... (other imports)

const ConversationView = ({ selectedValues }) => {
  const theme = useTheme();

  const renderContent = (conversation) => {
    switch (conversation.note) {
      case 'Note':
        return (
          <>
            <Typography
              component="span"
              sx={{ mr: 1 }}
              color={theme?.palette?.primary?.main}
            >
              Sender: {conversation.note}
            </Typography>
            <Typography
              component="span"
              color={theme?.palette?.primary?.main}
              sx={{ mr: 1 }}
            >
              Notify to: {conversation.notify}
            </Typography>
            <Typography
              component="span"
              sx={{ mr: 1 }}
              color={theme?.palette?.primary?.main}
            >
              from or reply: {conversation.from}
            </Typography>
          </>
        );
      case 'Reply':
        return (
          <>
            <Typography
              component="span"
              sx={{ mr: 1 }}
              color={theme?.palette?.primary?.main}
            >
              Sender: {conversation.note}
            </Typography>
            <Typography
              component="span"
              color={theme?.palette?.primary?.main}
              sx={{ mr: 1 }}
            >
              ReplyTo: {conversation.replyTo}
            </Typography>
            <Typography
              component="span"
              sx={{ mr: 1 }}
              color={theme?.palette?.primary?.main}
            >
              from or reply: {conversation.from}
            </Typography>
          </>
        );
      case 'Forward':
        return (
          <>
            <Typography
              component="span"
              sx={{ mr: 1 }}
              color={theme?.palette?.primary?.main}
            >
              Sender: {conversation.note}
            </Typography>
            <Typography
              component="span"
              color={theme?.palette?.primary?.main}
              sx={{ mr: 1 }}
            >
              ForwardTo: {conversation.forwardTo}
            </Typography>
            <Typography
              component="span"
              sx={{ mr: 1 }}
              color={theme?.palette?.primary?.main}
            >
              from or reply: {conversation.from}
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box marginTop={'3.125rem'}>
      {Object.keys(selectedValues).length > 0 ? (
        <Grid container sx={styles?.parent}>
          {Object.entries(selectedValues).map(([key, conversation]) => (
            <Grid
              container
              justifyContent={'space-between'}
              sx={styles?.parent}
              mb={'1.25rem'}
              key={key}
            >
              <Grid item md={8} xs={12} paddingTop={`0 !important`}>
                <Box sx={styles?.leftSideParent}>
                  <Box
                    display={'flex'}
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
                          border: '1px solid black',
                          mt: { md: 0, xs: 2 },
                        }}
                      >
                        {renderContent(conversation)}
                      </Box>
                      <Typography sx={styles?.date}>
                        11:02 PM-5 March, 2023
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={styles?.message(theme)}>
                      Message: {conversation.noteDescription}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} xs={12} paddingTop={`0 !important`}>
                <Box sx={styles?.buttonBox}>
                  <ShortcutSharpRightIcon />
                  <Box
                    sx={{
                      '&:hover': {
                        '.MuiSvgIcon-root': {
                          color: theme?.palette?.error?.main,
                        },
                      },
                    }}
                    className="iconContainer"
                  >
                    <DeleteIcon color={theme?.palette?.custom?.main} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoData
          message="There are no selected conversations"
          image={NoAssociationFoundImage}
        ></NoData>
      )}
    </Box>
  );
};

export default ConversationView;

// // ... (other imports)

// const ConversationView = ({ selectedValues }) => {
//   const theme = useTheme();

//   const renderNoteContent = (conversation) => {
//     switch (conversation.note) {
//       case 'Note':
//         return {
//           primary: `Sender: ${conversation.note}`,
//           secondary: `Notify to: ${conversation.notify}`,
//           tertiary: `from or reply: ${conversation.from}`,
//         };
//       case 'Reply':
//         return {
//           primary: `Sender: ${conversation.note}`,
//           secondary: `ReplyTo: ${conversation.replyTo}`,
//           tertiary: `from or reply: ${conversation.from}`,
//         };
//       case 'Forward':
//         return {
//           primary: `Sender: ${conversation.note}`,
//           secondary: `ForwardTo: ${conversation.forwardTo}`,
//           tertiary: `from or reply: ${conversation.from}`,
//         };
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box marginTop={'3.125rem'}>
//       {Object.keys(selectedValues).length > 0 ? (
//         <Grid container sx={styles?.parent}>
//           {Object.entries(selectedValues).map(([key, conversation]) => (
//             <Grid
//               container
//               justifyContent={'space-between'}
//               sx={styles?.parent}
//               mb={'1.25rem'}
//               key={key}
//             >
//               <Grid item md={8} xs={12} paddingTop={`0 !important`}>
//                 <Box sx={styles?.leftSideParent}>
//                   <Box
//                     display={'flex'}
//                     sx={{ flexDirection: { md: 'row', xs: 'column' } }}
//                   >
//                     <Image
//                       src={AvatarConversationImage?.src}
//                       alt="logo"
//                       width={32}
//                       height={32}
//                     />
//                     <Box sx={{ ml: { md: 2, xs: 0 } }}>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           flexDirection: { md: 'row', xs: 'column' },
//                           border: '1px solid black',
//                           mt: { md: 0, xs: 2 },
//                         }}
//                       >
//                         {renderNoteContent(conversation) && (
//                           <>
//                             <Typography
//                               component="span"
//                               sx={{ mr: 1 }}
//                               color={theme?.palette?.primary?.main}
//                             >
//                               {renderNoteContent(conversation).primary}
//                             </Typography>
//                             {conversation.note === 'Note' && (
//                               <Typography
//                                 component="span"
//                                 color={theme?.palette?.primary?.main}
//                                 sx={{ mr: 1 }}
//                               >
//                                 {renderNoteContent(conversation).secondary}
//                               </Typography>
//                             )}
//                             <Typography
//                               component="span"
//                               sx={{ mr: 1 }}
//                               color={theme?.palette?.primary?.main}
//                             >
//                               {renderNoteContent(conversation).tertiary}
//                             </Typography>
//                           </>
//                         )}
//                       </Box>
//                       <Typography sx={styles?.date}>
//                         11:02 PM-5 March, 2023
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box>
//                     <Typography sx={styles?.message(theme)}>
//                       Message: {conversation.noteDescription}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item md={4} xs={12} paddingTop={`0 !important`}>
//                 <Box sx={styles?.buttonBox}>
//                   <ShortcutSharpRightIcon />
//                   <Box
//                     sx={{
//                       '&:hover': {
//                         '.MuiSvgIcon-root': {
//                           color: theme?.palette?.error?.main,
//                         },
//                       },
//                     }}
//                     className="iconContainer"
//                   >
//                     <DeleteIcon color={theme?.palette?.custom?.main} />
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <NoData
//           message="There are no selected conversations"
//           image={NoAssociationFoundImage}
//         ></NoData>
//       )}
//     </Box>
//   );
// };

// export default ConversationView;
