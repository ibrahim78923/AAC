import React from 'react';
import PlainHeader from '@/components/PlainHeader';
import HeaderCreateContract from './components/HeaderCreateContract';
import { Box, Button, Grid } from '@mui/material';
import { styles } from './CreateContract.style';
import PreviewToggle from './components/PreviewToggle';
import useCreateContract from './useCreateContract';
import { FormProvider } from '@/components/ReactHookForm';
import ContractTitle from './form-fields/ContractTitle';
import ContractLogo from './form-fields/ContractLogo';
import PartyCard from './components/PartyCard';
import AddPartyCard from './components/AddPartyCard';

export default function CreateContract() {
  const {
    activeView,
    handlePreviewToggle,
    parties,
    handleAddParty,
    handleDeleteParty,
    methods,
    handleSubmit,
    onSubmit,
  } = useCreateContract();

  return (
    <>
      <PlainHeader>
        <HeaderCreateContract
          onClickShare={() => alert('Share')}
          onClickMore={() => alert('More')}
          onClickSave={() => alert('Save')}
          onClickSign={() => alert('Sign')}
        />
      </PlainHeader>

      <Box sx={styles?.container}>
        <Box sx={styles?.contentRow}>
          <Box sx={styles?.content}>
            <Box sx={styles.contentTopbar}>
              <PreviewToggle
                active={activeView}
                handleToggle={handlePreviewToggle}
              />
            </Box>
            {activeView === 'create' && (
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={'30px'}>
                  <Grid item xs={12} md={8}>
                    <ContractTitle />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ContractLogo />
                  </Grid>
                </Grid>

                <Box sx={styles?.headingBar}>
                  <Box sx={styles?.headingBarTitle}>Parties</Box>
                </Box>

                <Grid container spacing={'30px'}>
                  {parties.map((party, index) => (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={party?._id}
                      sx={styles?.partyCardgridItem}
                    >
                      <PartyCard
                        onDelete={() =>
                          index !== 0 && handleDeleteParty(party._id)
                        }
                      />
                    </Grid>
                  ))}

                  {parties.length < 3 && (
                    <Grid item xs={12} md={4}>
                      <AddPartyCard onClick={handleAddParty} />
                    </Grid>
                  )}
                </Grid>

                <Button
                  type={'submit'}
                  variant={'contained'}
                  className={'small'}
                  fullWidth
                >
                  Sign & Send
                </Button>
              </FormProvider>
            )}
            {activeView === 'preview' && (
              <Box>
                <Button>Preview</Button>
              </Box>
            )}
          </Box>

          <Box sx={styles?.sidebar}>Sidebar</Box>
        </Box>
      </Box>
    </>
  );
}
