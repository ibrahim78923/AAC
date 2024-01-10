import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const relatedTicketDataArray = [
  {
    id: 1457,
    ticketDescription: 'Password Management Policy',
  },
  {
    id: 2564,
    ticketDescription: 'Expense Reimbursement Policy',
  },
];

export const knowledgeBaseTicketEditorData = `<p>Both bear markets and bull markets represent tremendous opportunities to make money, and the key to success is to use strategies and ideas that can generate profits under a variety of conditions. This requires consistency, discipline, focus, and the ability to take advantage of fear and greed. This article will help familiarize you with investments that can prosper in up or down markets. A bear market is defined as a drop of 20% or more in a market average. Generally, bear markets occur during economic recessions or depressions, when pessimism prevails. But amid the rubble lie opportunities to make money for those who know how to use the right tools. Here are some ways to profit in bear markets</p><p><br></p><h4>Ways to Profit in Bear Markets</h4><p><br></p><h5>1. Short Positions</h5><p>Taking a short position, also called short selling, occurs when you borrow shares and sell them in anticipation the stock will fall in the future. If it works as planned and the share price drops, you buy those shares at the lower price to cover the short position and make a profit on the difference. For example, if you short ABC stock at $35 per share and the stock falls to $20, you can buy the shares back at $20 to close out the short position. Your overall profit, therefore, would be $15 per share.</p><p><br></p><h5>2. Put Options</h5><p>A put option is the right to sell a stock at a particular strike price until a certain date in the future, called the expiration date. The money you pay for the option is called a premium. A put option increases in value as the underlying stock falls. If the stock moves below the put's strike price, you can either exercise the right to sell the stock at the higher strike price or sell the put option for a profit.</p><p><br></p><h5>3. Short ETFs</h5><p>A short exchange-traded fund (ETF), also called an inverse ETF, produces returns that are the inverse of a particular index. For example, an ETF that performs inversely to the Nasdaq-100 will drop about 25% if that index rises by 25%. But if the index falls 25%, the ETF will rise proportionally. This inverse relationship makes short/inverse ETFs appropriate for investors who want to profit from a downturn in the markets, or who wish to hedge long positions against such a downturn.</p>`;

export const feedbackValidationSchema = Yup?.object()?.shape({
  information: Yup?.string(),
  understand: Yup?.string(),
  content: Yup?.string(),
  link: Yup?.string(),
  comment: Yup?.string(),
});
export const feedbackDefaultValues = {
  information: '',
  understand: '',
  content: '',
  link: '',
  comment: '',
};

export const feedbackDataArray = [
  {
    id: 2355,
    componentProps: {
      name: 'information',
      label: 'Need More Information',
    },
    component: RHFCheckbox,
  },
  {
    id: 4567,
    componentProps: {
      name: 'understand',
      label: 'Difficult to Understand',
    },
    component: RHFCheckbox,
  },
  {
    id: 3467,
    componentProps: {
      name: 'content',
      label: 'Inaccurate/irrelevant content',
    },
    component: RHFCheckbox,
  },
  {
    id: 5476,
    componentProps: {
      name: 'link',
      label: 'Missing/broken link',
    },
    component: RHFCheckbox,
  },
  {
    id: 6547,
    componentProps: {
      name: 'comment',
      label: 'Comment here',
      placeholder: 'Write something',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
];
