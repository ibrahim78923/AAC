import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import TemplateFrame from '../TemplateFrame';
import TemplateBasic from '../TemplateBasic';
import { BuildingIcon, ProfileCircleIcon } from '@/assets/icons/index';
import { AvatarCompanyImage, AvatarContactImage } from '@/assets/images';
import { buyerContactList, buyerCompanyList } from '@/mock/modules/Quotes';
import { styles } from './StepBuyerInfo.style';

const StepBuyerInfo = ({
  dataContacts,
  dataCompanies,
  openAddContact,
  openAddCompany,
}: any) => {
  return (
    <Grid container spacing={'40px'}>
      <Grid item xs={5}>
        <Box>
          {dataContacts?.length !== 0 && (
            <>
              <Box sx={styles?.rowBuyerInfo}>
                <Typography variant="h4" sx={styles?.buyerInfoTitle}>
                  Buyer Information
                </Typography>
                <Button
                  variant="outlined"
                  className="small"
                  sx={styles?.btnAddMore}
                  onClick={openAddContact}
                >
                  Add more contact
                </Button>
              </Box>
              <Typography variant="body1" sx={styles?.buyerInfoPara}>
                Select the buyer contact information that you would like to
                appear in the quote
              </Typography>
              <Box sx={styles?.contactsCont}>
                <Typography variant="h6" sx={styles?.contactsHeading}>
                  Buyer’s Contact
                </Typography>
                <Box component="ul" sx={styles?.contactsList}>
                  {buyerContactList?.map((item: any) => (
                    <Box component="li" sx={styles?.listItem} key={item.id}>
                      <Box sx={styles?.itemIcon}>
                        <Avatar
                          src={AvatarContactImage.src}
                          sx={styles?.itemAvatar}
                        ></Avatar>
                      </Box>
                      <Box sx={styles?.itemDetail}>
                        <Box sx={styles?.itemTitle}>{item.owner}</Box>
                        <Box sx={styles?.itemText}>{item.title}</Box>
                        <Box sx={styles?.itemText}>{item.email}</Box>
                        <Box sx={styles?.itemText}>{item.phoneNumber}</Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}
          {dataContacts.length === 0 && (
            <Box sx={styles?.button} onClick={openAddContact}>
              <Box sx={{ mr: '8px', display: 'inline-flex' }}>
                <ProfileCircleIcon />
              </Box>
              Add Contact
            </Box>
          )}
        </Box>
        <Box sx={styles?.companyInformation}>
          {dataCompanies.length !== 0 ? (
            <Box sx={styles?.contactsCont}>
              <Typography variant="h6" sx={styles?.contactsHeading}>
                Buyer’s Company
              </Typography>
              <Box component="ul" sx={styles?.contactsList}>
                {buyerCompanyList?.map((item: any) => (
                  <Box component="li" sx={styles?.listItem} key={item.id}>
                    <Box sx={styles?.itemIcon}>
                      <Avatar
                        src={AvatarCompanyImage.src}
                        sx={styles?.itemAvatar}
                      ></Avatar>
                    </Box>
                    <Box sx={styles?.itemDetail}>
                      <Box sx={styles?.itemTitle}>{item.owner}</Box>
                      <Box sx={styles?.itemText}>{item.title}</Box>
                      <Box sx={styles?.itemText}>{item.email}</Box>
                      <Box sx={styles?.itemText}>{item.phoneNumber}</Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={styles?.button} onClick={openAddCompany}>
              <Box sx={{ mr: '8px', display: 'inline-flex' }}>
                <BuildingIcon />
              </Box>
              Add Company
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={7}>
        <TemplateFrame>
          <TemplateBasic />
          {/* <TemplatePlaceholder /> */}
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default StepBuyerInfo;
