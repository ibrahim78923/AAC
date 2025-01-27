import React from 'react';
import CommonDialog from '@/components/CommonDialog';
// import SigneeCard from '../../../components/SigneeCard';
import { Grid } from '@mui/material';
import SigningOrder from '../../../components/SigneeCard/form-fields/SigningOrder';
import OnBehalfOf from '../../../components/SigneeCard/form-fields/OnBehalfOf';
import SigneeFullName from '../../../components/SigneeCard/form-fields/SigneeFullName';
import SigneeEmail from '../../../components/SigneeCard/form-fields/SigneeEmail';
import SigningDigitally from '../../../components/SigneeCard/form-fields/SigningDigitally';
import PersonalTitle from '../../../components/SigneeCard/form-fields/PersonalTitle';
import { styles } from './styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: () => void;
  partyFields: any;
  signeeFields: any;
  index: any;
}

export default function AddSignee({
  open,
  onClose,
  // methods,
  onSubmit,
  // partyFields,
  // signeeFields,
  index,
}: ModalProps) {
  return (
    <CommonDialog
      title={'Create New Signee'}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Create'}
      cancelText={'Cancel'}
      width={'416px'}
    >
      <>
        {/* <SigneeCard
          numberOfSignees={signeeFields?.length}
          index={signeeFields?.length}
          onDelete={onClose}
        /> */}
        <Grid container spacing={'4px'}>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigningOrder
              data={[]}
              name={`signees.${index + 1}.signingOrder`}
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <OnBehalfOf name={`signees.${index + 1}.onBehalfOf`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <PersonalTitle name={`signees.${index + 1}.personalTitle`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigneeFullName name={`signees.${index + 1}.name`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigneeEmail name={`signees.${index + 1}.email`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigningDigitally />
          </Grid>
        </Grid>
      </>

      {/* <FormProvider methods={methods}>
        <Grid container spacing={'22px'}>
          {AddSigneeFieldsData()?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name} sx={{paddingTop:"10px !important"}}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider> */}
    </CommonDialog>
  );
}
