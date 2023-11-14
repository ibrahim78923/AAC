// import Image from 'next/image';

// import { Box, Button, Divider, Grid,  SvgIcon, Typography } from '@mui/material'

// import CommonModal from '@/components/CommonModal'

// import { styles } from './style';

// import { ActionsIcon, CloseModalIcon, CommentIcon, FillCheckboxIcon, LikeIcon, MultipleUserIcon, ShareIcon } from '@/assets/icons';
// import { NatureFreekImage, SeaImage } from '@/assets/images';

// const PostBoxModalBox = ({ open, onClose }: any) => {
//   return (
//     <>
//       <CommonModal
//         open={open}
//         handleClose={onClose}
//         title=""
//         okText=""
//         cancelText=""
//         submitIcon
//         footer={false}
//         footerFill
//         headerIcon
//       >
//         <Box mt="-20px" textAlign="end" >
//           <SvgIcon onClick={onClose} sx={{ cursor: "pointer" }}>
//             <CloseModalIcon />
//           </SvgIcon>
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: "end", mb: "25px" }}>
//           <Typography sx={styles?.postedStyle} variant='h5'>Posted <FillCheckboxIcon /></Typography>
//         </Box>
//         <Grid container>
//           <Grid item xs={8} borderRadius="8px" border="1px solid #DADDE1">
//             <Box display="flex" justifyContent='space-between' padding="15px">
//               <Box display='flex' gap={1.5}>
//                 <Box>
//                   <Image src={NatureFreekImage} alt="image" />
//                 </Box>
//                 <Box>
//                   <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>Nature Freek</Typography>
//                   <Box sx={{ display: 'flex', alignItems: "center", gap: 1, }}>
//                     <Typography variant='body4'>5 min .</Typography>
//                     <MultipleUserIcon />
//                   </Box>
//                 </Box>
//               </Box>
//               <Box>
//                 <SvgIcon>
//                   <ActionsIcon />
//                 </SvgIcon>
//               </Box>
//             </Box>
//             <Box sx={{ padding: "10px" }}>
//               <Typography sx={{ color: "#1D2129" }}>Hey guys! I really love the city pop hit Plastic Love and I'm working on a new cover of it! 😊😊😊😊</Typography>
//               <Typography sx={{ color: "#50ABF1" }}>@zackben#nature #beauty #mountain #travel</Typography>
//             </Box>

//             <Image src={SeaImage} alt="image" />

//             <Divider sx={{ my: "10px" }} />

//             <Box sx={{ display: "flex", justifyContent: "space-around", mb: "10px", alignItems: "center" }}>
//               <Button disableRipple sx={{ color: "#606770", fontSize: "500" }} startIcon={<LikeIcon />}>3.6 k</Button>
//               <Button sx={{ color: "#606770", fontSize: "500" }} startIcon={<CommentIcon />}>2.1 k</Button>
//               <Button sx={{ color: "#606770", fontSize: "500" }} startIcon={<ShareIcon />}>2.6 k</Button>
//             </Box>
//           </Grid>

//           {/* <Grid item>
//             <Typography> <BiAcivityIcon /> Activity</Typography>
//             <Box sx={{ maxWidth: 400 }}>
//               <Paper square elevation={0} sx={{ p: 3 }}>
//                 <Typography>All steps completed - you re finished</Typography>
//                 <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//                   Reset
//                 </Button>
//               </Paper>

//             </Box>
//           </Grid> */}
//         </Grid>
//       </CommonModal>
//     </>
//   )
// }
// export default PostBoxModalBox
import React from 'react';

const index = () => {
  return <div></div>;
};

export default index;
