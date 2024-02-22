import { AgentImg } from '@/assets/images';
import { AGENT_REQUEST_STATUS } from '@/constants/strings';

export const agentRequestData = (requesterData: any) => [
  {
    id: 1,
    image: AgentImg,
    name: `${requesterData?.firstName} ${requesterData?.lastName}`,
    role: 'HR manager',
    date: '10/07/2022',
    approve: 'Approve',
    reject: 'Reject',
    status: AGENT_REQUEST_STATUS?.PENDING,
    requestedOn: 'Request on Tue, 4 Apr 1:14 AM',
  },
  {
    id: 2,
    image: AgentImg,
    name: 'Sophia Arthur',
    role: 'HR manager',
    date: '10/07/2022',
    approve: 'Approve',
    reject: 'Reject',
    status: AGENT_REQUEST_STATUS?.REJECTED,
    requestedOn: 'Request on Tue, 4 Apr 1:14 AM',
  },
  {
    id: 3,
    image: AgentImg,
    name: 'Sophia Arthur',
    role: 'HR manager',
    date: '10/07/2022',
    approve: 'Approve',
    reject: 'Reject',
    status: AGENT_REQUEST_STATUS?.PENDING,
    requestedOn: 'Request on Tue, 4 Apr 1:14 AM',
  },
  {
    id: 4,
    image: AgentImg,
    name: 'Sophia Arthur',
    role: 'HR manager',
    date: '10/07/2022',
    approve: 'Approve',
    reject: 'Reject',
    status: AGENT_REQUEST_STATUS?.APPROVED,
    requestedOn: 'Request on Tue, 4 Apr 1:14 AM',
  },
];
