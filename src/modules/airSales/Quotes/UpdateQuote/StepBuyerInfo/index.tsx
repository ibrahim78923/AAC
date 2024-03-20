import { Box, Grid, Typography, Button, Avatar, Checkbox } from '@mui/material';
import TemplateFrame from '../TemplateFrame';
import TemplateBasic from '../TemplateBasic';
import {
  // BuildingIcon,
  // BuildingIcon,
  GrayPlusIcon,
  // ProfileCircleIcon,
} from '@/assets/icons/index';
import {
  AvatarCompanyImage,
  AvatarContactImage,
  CrossCircleImage,
} from '@/assets/images';
import { styles } from './StepBuyerInfo.style';
import Image from 'next/image';
import { AlertModals } from '@/components/AlertModals';
import { useState } from 'react';
// import useUpdateQuote from '../useUpdateQuote';
import useUpdateQuote from '../useUpdateQuote';

const StepBuyerInfo = ({
  // dataContacts,
  // dataCompanies,
  openAddContact,
  openAddCompany,
}: any) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const handleChange = (e: any, id: any) => {
    if (e.target.checked) {
      setSelectedId([...selectedId, id]);
    } else {
      const filteredId = selectedId.filter((item: string) => item !== id);
      setSelectedId(filteredId);
    }
  };

  const { dataGetQuoteById }: any = useUpdateQuote();
  const contactData = dataGetQuoteById?.data?.deal;

  const handleCompanyChange = (e: any, id: any) => {
    if (e.target.checked) {
      setSelectedCompany([...selectedCompany, id]);
    } else {
      const filteredCompanyId = selectedCompany?.filter((val) => val !== id);
      setSelectedCompany(filteredCompanyId);
    }
  };
  // console.log(selectedCompany);

  return (
    <>
      <Grid container spacing={'40px'}>
        <Grid item xs={5}>
          <Box>
            {/* {dataContacts?.length !== 0 && ( */}
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
                  startIcon={<GrayPlusIcon />}
                >
                  Add contact
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
                  {contactData &&
                    contactData[0]?.contacts?.map((item: any) => (
                      <Box component="li" sx={styles?.listItem} key={item?.id}>
                        <Box sx={styles?.itemIcon}>
                          <Avatar
                            src={AvatarContactImage?.src}
                            sx={styles?.itemAvatar}
                          ></Avatar>
                          {/* <CrossCircleImage /> */}
                        </Box>
                        <Box sx={styles?.itemDetail}>
                          <Box sx={styles?.itemTitle}>
                            {/* {item?.owner} */}
                            {item?.name}
                            <Image
                              src={CrossCircleImage}
                              alt="delIcon"
                              onClick={handleDeleteModal}
                            />
                          </Box>
                          <Box sx={styles?.itemText}>{item?.name}</Box>
                          <Box sx={styles?.itemText}>{item?.email}</Box>
                          <Box sx={styles?.itemText}>{item?.phoneNumber}</Box>
                        </Box>
                        <Box mt={-0.7}>
                          <Checkbox
                            checked={selectedId?.includes(item?._id)}
                            onChange={(e: any) => handleChange(e, item?._id)}
                          />
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </>
            {/* )} */}
            {/* {dataContacts?.length === 0 && (
            <Box sx={styles?.button} onClick={openAddContact}>
              <Box sx={{ mr: '8px', display: 'inline-flex' }}>
                <ProfileCircleIcon />
              </Box>
              Add Contact
            </Box>
          )} */}
          </Box>
          <Box sx={styles?.companyInformation}>
            <Box sx={styles?.contactsCont}>
              <Box sx={styles?.rowBuyerInfo}>
                <Typography variant="h4" sx={styles?.buyerInfoTitle}>
                  Buyer’s Company
                </Typography>
                <Button
                  variant="outlined"
                  className="small"
                  sx={styles?.btnAddMore}
                  onClick={openAddCompany}
                  startIcon={<GrayPlusIcon />}
                >
                  Add Company
                </Button>
              </Box>
              <Box component="ul" sx={styles?.contactsList}>
                {contactData &&
                  contactData[0]?.companies?.map((item: any) => (
                    <Box component="li" sx={styles?.listItem} key={item?.id}>
                      <Box sx={styles?.itemIcon}>
                        <Avatar
                          src={AvatarCompanyImage?.src}
                          sx={styles?.itemAvatar}
                        ></Avatar>
                      </Box>
                      <Box sx={styles?.itemDetail}>
                        <Box sx={styles?.itemTitle}>
                          {item?.name}
                          <Box sx={{ cursor: 'pointer' }}>
                            <Image
                              src={CrossCircleImage}
                              alt="delIcon"
                              onClick={handleDeleteModal}
                            />
                          </Box>
                        </Box>
                        <Box sx={styles?.itemText}> {item?.name}</Box>
                        <Box sx={styles?.itemText}>{item?.owner[0]?.email}</Box>
                        <Box sx={styles?.itemText}>
                          {item?.owner[0]?.phoneNumber}
                        </Box>
                      </Box>
                      <Box mt={-0.7}>
                        <Checkbox
                          checked={selectedCompany?.includes(item?._id)}
                          onChange={(e: any) =>
                            handleCompanyChange(e, item._id)
                          }
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <TemplateFrame>
            <TemplateBasic />
            {/* <TemplatePlaceholder /> */}
          </TemplateFrame>
        </Grid>
      </Grid>
      <AlertModals
        message="Are u sure u wnat to delete this?"
        type="delete"
        open={deleteModal}
        handleClose={handleDeleteModal}
        handleSubmitBtn={handleDeleteModal}
      />
    </>
  );
};

export default StepBuyerInfo;
