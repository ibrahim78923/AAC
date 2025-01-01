import { AddPeopleDropdown } from '../AddPeopleDropdown';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ShareModal: React.FC<{
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openShare, setOpenShare }) => {
  return (
    <CustomCommonDialog
      isPortalOpen={openShare}
      closePortal={() => setOpenShare(false)}
      dialogMaxWidth={'sm'}
      dialogTitle="Share Survey"
      submitButtonText="Share"
      handleSubmitButton={() => setOpenShare(false)}
      showCancelButton={false}
    >
      <AddPeopleDropdown name="shareSurveyPeople" label="Share With" />
    </CustomCommonDialog>
  );
};
