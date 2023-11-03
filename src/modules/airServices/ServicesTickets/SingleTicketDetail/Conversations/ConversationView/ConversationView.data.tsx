import { conversationViewDataItemI } from './ConversationView.interface';

export const data: conversationViewDataItemI[] = [
  {
    image: 'image1',
    sender: 'John',
    action: 'reply',
    to: 'nickofl@gmail.com',
    message:
      'Hi Guys We have been facing issue  when we try to reach email server 3 Hi Guys .',
    time: '11:02 PM-5 March,  2023',
  },
  {
    image: 'image1',
    sender: 'Nick',
    action: 'note',
    message: 'Yeah Our team is working on it',
    time: '11:02 PM-5 March,  2023',
  },
  {
    image: 'image1',
    sender: 'Elder',
    action: 'forward',
    to: 'elzendorgr@gmail.com',
    message: 'Please look into this matter',
    time: '11:02 PM-5 March,  2023',
  },
];

export const conversationAttachmentFileData = [
  {
    name: 'Picture.pdf',
    size: '12KB',
    type: 'pdf',
  },
];
