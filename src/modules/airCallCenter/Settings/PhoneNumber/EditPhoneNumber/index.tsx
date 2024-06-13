import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import React from 'react';
import Properties from './Properties';
import CallActions from './CallActions';
import useEditPhoneNumber from './useEditPhoneNumber';

const EditPhoneNumber = (props: any) => {
  const {
    methods,
    maskValue,
    callerIds,
    handleSubmit,
    onSubmit,
    isEditNumberDrawer,
    setIsEditNumberDrawer,
    handleSubmitActions,
    methodsActions,
    isValidation,
    setIsValidation,
    isNewNumber,
    setISNewNumber,
    callerIDCreated,
    setCallerIDCreated,
    isVerification,
    setIsVerification,
  } = useEditPhoneNumber(props);

  return (
    <CommonDrawer
      isDrawerOpen={isEditNumberDrawer}
      onClose={() => setIsEditNumberDrawer(false)}
      title="Edit Phone Number"
      isOk={true}
      okText="Save Changes"
      submitHandler={
        isValidation ? handleSubmit(onSubmit) : handleSubmitActions(onSubmit)
      }
      footer
    >
      <CommonTabs tabsArray={['Properties', 'CallActions']}>
        <Properties
          methods={methods}
          maskValue={maskValue}
          callerIds={callerIds}
          setIsValidation={setIsValidation}
          isNewNumber={isNewNumber}
          setISNewNumber={setISNewNumber}
          callerIDCreated={callerIDCreated}
          setCallerIDCreated={setCallerIDCreated}
          isVerification={isVerification}
          setIsVerification={setIsVerification}
        />
        <CallActions
          methods={methodsActions}
          setIsValidation={setIsValidation}
        />
      </CommonTabs>
    </CommonDrawer>
  );
};

export default EditPhoneNumber;
