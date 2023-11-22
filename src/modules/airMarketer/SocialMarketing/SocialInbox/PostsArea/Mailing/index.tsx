import { mailingData } from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';
import MailBox from './MailBox';
import { isNullOrEmpty } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

const Mailing = () => {
  return (
    <>
      <MailBox data={mailingData} type={'main'} />
      {!isNullOrEmpty(mailingData?.reply) && (
        <>
          {mailingData?.reply?.map((item: any) => (
            <MailBox data={item} key={uuidv4()} type={'reply'} />
          ))}
        </>
      )}
    </>
  );
};

export default Mailing;
