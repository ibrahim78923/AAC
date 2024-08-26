import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { getSession } from '@/utils';
import { FormDataI } from './Properties.interface';
import { ORG_ADMIN } from '@/constants';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import {
  MtCampaignsIcon,
  MtSmsMarketingIcon,
  MtWhatsappMarketingIcon,
  MtEmailMarketingIcon,
  MtTaskIcon,
  MtContactIcon,
  MtCompanyIcon,
  MtDocumentIcon,
  MtMeetingIcon,
  MtDealIcon,
  MtGoalIcon,
  MtQuoteIcon,
  MtDealPipelineIcon,
  MtSalesProductIcon,
  MtTicketIcon,
  MtAssetIcon,
  MtContractIcon,
  MtPurchaseOrderIcon,
  MtLifecycleStageIcon,
  MtSoftwareIcon,
  MtVendorIcon,
  MtAgentsIcon,
  MtRequesterIcon,
  MtTimeEntryIcon,
  MtServiceSettingsIcon,
  MtDepartmentIcon,
} from '@/assets/icons';

export const propertiesProductData = (products: any) => {
  return products?.map((item: any) => ({
    id: item?._id,
    name: item?.name,
    icon: item?.logo?.url,
  }));
};

export const selectCompanyDefaultValues: FormDataI = {
  companyId: null,
};

export const selectCompanyField = (
  activeProduct: any,
  companyAccounts: any,
) => {
  const { user }: any = getSession();
  return [
    {
      componentProps: {
        label: 'Select Company Account',
        name: 'companyId',
        placeholder: 'Select Company Account',
        fullWidth: true,
        required: true,
        disabled: activeProduct === null ? true : false,
        apiQuery: companyAccounts,
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: {
          orgId: user?.organization?._id,
        },
        queryKey: 'orgId',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
  ];
};

export const moduleTypeData = [
  {
    productType: DYNAMIC_FIELDS?.PT_COMMON_MODULE,
    modules: [
      {
        moduleType: DYNAMIC_FIELDS?.MT_CONTACTS,
        icon: <MtContactIcon />,
        title: 'Contacts',
        description:
          'Create and manage fields to capture information about contacts',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_COMPANY,
        icon: <MtCompanyIcon />,
        title: 'Company',
        description:
          'Create and manage fields to capture information about company',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_DOCUMENTS,
        icon: <MtDocumentIcon />,
        title: 'Document',
        description:
          'Create and manage fields to capture information about document',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_DOCUMENT_CREATE,
            icon: <MtDocumentIcon />,
            title: 'Document',
            description:
              'Create and manage fields to capture information about document',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_DOCUMENT_FOLDER,
            icon: <MtDocumentIcon />,
            title: 'Document Folder',
            description:
              'Create and manage fields to capture information about document folder',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_MEETING,
        icon: <MtMeetingIcon />,
        title: 'Meeting',
        description:
          'Create and manage fields to capture information about meeting.',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
    ],
  },
  {
    productType: DYNAMIC_FIELDS?.PT_SALES,
    modules: [
      {
        moduleType: DYNAMIC_FIELDS?.MT_DEAL,
        icon: <MtDealIcon />,
        title: 'Deal',
        description:
          'Create and manage fields to capture information about deal',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_TASK,
        icon: <MtTaskIcon />,
        title: 'Task',
        description:
          'Create and manage fields to capture information about task',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_GOAL,
        icon: <MtGoalIcon />,
        title: 'Goal',
        description:
          'Create and manage fields to capture information about goal',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_QUOTE,
        icon: <MtQuoteIcon />,
        title: 'Quote',
        description:
          'Create and manage fields to capture information about quote',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_DEAL_PIPELINE,
        icon: <MtDealPipelineIcon />,
        title: 'Deals Pipeline',
        description:
          'Create and manage fields to capture information about deal pipeline',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_SALES_PRODUCT,
        icon: <MtSalesProductIcon />,
        title: 'Sales Product',
        description:
          'Create and manage fields to capture information about sales product',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
    ],
  },
  {
    productType: DYNAMIC_FIELDS?.PT_MARKETING,
    modules: [
      {
        moduleType: DYNAMIC_FIELDS?.MT_CAMPAIGNS_PARENT,
        icon: <MtCampaignsIcon />,
        title: 'Campaigns',
        description:
          'Create and manage fields to capture information about campaigns',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_CAMPAIGN_CREATE,
            icon: <MtCampaignsIcon />,
            title: 'Campaign',
            description:
              'Create and manage fields to capture information about projects',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_TASK,
            icon: <MtTaskIcon />,
            title: 'Campaign Task',
            description:
              'Create and manage fields to capture information about projects',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_SMS_MARKETING,
        icon: <MtSmsMarketingIcon />,
        title: 'SMS Marketing',
        description:
          'Create and manage fields to capture information about projects',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_SMS_BROADCAST,
            icon: <MtSmsMarketingIcon />,
            title: 'SMS Broadcast',
            description:
              'Create and manage fields to capture information about projects',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_SMS_TEMPLATE,
            icon: <MtSmsMarketingIcon />,
            title: 'SMS Template',
            description:
              'Create and manage fields to capture information about projects',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },
      {
        moduleType: DYNAMIC_FIELDS?.MT_WHATSAPP_MARKETING,
        icon: <MtWhatsappMarketingIcon />,
        title: 'Whatsapp Marketing',
        description:
          'Create and manage fields to capture information about projects',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_WHATSAPP_BROADCAST,
            icon: <MtWhatsappMarketingIcon />,
            title: 'Whatsapp Broadcast',
            description:
              'Create and manage fields to capture information about projects',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_WHATSAPP_TEMPLATE,
            icon: <MtWhatsappMarketingIcon />,
            title: 'Whatsapp Template',
            description:
              'Create and manage fields to capture information about projects',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },
      {
        moduleType: 'EMAIL_MARKETING_FOLDER',
        icon: <MtEmailMarketingIcon />,
        title: 'Email Marketing Folder',
        description:
          'Create and manage fields to capture information about projects',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
    ],
  },
  {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    modules: [
      {
        moduleType: DYNAMIC_FIELDS?.MT_TICKETS_PARENT,
        icon: <MtTicketIcon />,
        title: 'Tickets',
        description:
          'Create and manage fields to capture information about tickets.',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_TICKETS,
            icon: <MtTicketIcon />,
            title: 'Create Ticket',
            description:
              'Create and manage fields to capture information about tickets.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_TIME_ENTRIES,
            icon: <MtTimeEntryIcon />,
            title: 'Time Entries',
            description:
              'Create and manage fields to capture information about tickets time entries.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_TASK,
            icon: <MtTaskIcon />,
            title: 'Task',
            description:
              'Create and manage fields to capture information about tasks.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },

      {
        moduleType: DYNAMIC_FIELDS?.MT_ASSET_PARENT,
        icon: <MtAssetIcon />,
        title: 'Assets',
        description:
          'Create and manage fields to capture information about assets.',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_ASSET_TYPE,
            icon: <MtAssetIcon />,
            title: 'Assets',
            description:
              'Create and manage fields to capture information about asset type.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_CONTRACT_TYPE,
            icon: <MtContractIcon />,
            title: 'Contracts',
            description:
              'Create and manage fields to capture information about assets contract.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_PURCHASE_ORDER,
            icon: <MtPurchaseOrderIcon />,
            title: 'Purchase Order',
            description:
              'Create and manage fields to capture information about assets purchase order.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },

      {
        moduleType: DYNAMIC_FIELDS?.MT_SERVICES_SETTINGS,
        icon: <MtServiceSettingsIcon />,
        title: 'Services Settings',
        description:
          'Create and manage fields to capture information about settings.',
        multiForm: true,
        route: ORG_ADMIN?.MODULE_FORMS,
        subModule: [
          {
            moduleType: DYNAMIC_FIELDS?.MT_VENDOR,
            icon: <MtVendorIcon />,
            title: 'Vendor',
            description:
              'Create and manage fields to capture information about vendor.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_SOFTWARE,
            icon: <MtSoftwareIcon />,
            title: 'Software',
            description:
              'Create and manage fields to capture information about software.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_DEPARTMENT,
            icon: <MtDepartmentIcon />,
            title: 'Department',
            description:
              'Create and manage fields to capture information about department.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_ADD_REQUESTER,
            icon: <MtRequesterIcon />,
            title: 'Add Requester',
            description:
              'Create and manage fields to capture information about add requester.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
          {
            moduleType: DYNAMIC_FIELDS?.MT_ADD_AGENT,
            icon: <MtAgentsIcon />,
            title: 'Add Agent',
            description:
              'Create and manage fields to capture information about add agent.',
            multiForm: false,
            route: ORG_ADMIN?.DYNAMIC_FIELDS,
          },
        ],
      },
    ],
  },
  {
    productType: 'ORG_ADMIN',
    modules: [
      {
        moduleType: 'LIFE_CYCLE_STAGE',
        icon: <MtLifecycleStageIcon />,
        title: 'Lifecycle stage',
        description:
          'Create and manage fields to capture information about lifecycle stage',
        multiForm: false,
        route: ORG_ADMIN?.DYNAMIC_FIELDS,
      },
    ],
  },
];
