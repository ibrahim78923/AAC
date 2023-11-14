const useCalling = () => {
  const formattedPhoneNumber = (phoneNumber: any) => {
    return phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };
  return {
    formattedPhoneNumber,
  };
};

export default useCalling;
