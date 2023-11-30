const useManage = () => {
  const statusBtnValue: any = (val: any) => {
    switch (val) {
      case 'active':
        return '#EFFFF3';
      case 'pending':
        return '#E5E7EB';
    }
  };

  return {
    statusBtnValue,
  };
};

export default useManage;
