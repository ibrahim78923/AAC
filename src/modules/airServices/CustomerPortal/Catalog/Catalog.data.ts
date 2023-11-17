import {
  HardwareFeaturedImage,
  PmFeaturedImage,
  ServiceFeaturedImage,
  SoftwareFeaturedImage,
  CatalogDatabaseImage,
  CatalogAdobePremiereImage,
  CatalogSkillIllustratorImage,
  CatalogLogosAdobePhotoshopImage,
  CatalogKyoDeviceLaptopImage,
  CatalogSkillXdImage,
  CatalogHopstarterSoftwareAdobeImage,
  CatalogLogitechMouseImage,
  CatalogGroupZoomImage,
  CatalogAppleProductsImacImage,
  CatalogMetroUiOsAppleImage,
  CatalogPhuzionDeviceLaptopImage,
} from '@/assets/images';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';

export const services = [
  {
    id: 1,
    title: CATALOG_SERVICE_TYPES?.ALL,
    description:
      'Browse the list of all services  offered and raise a request.',
    image: ServiceFeaturedImage,
  },
  {
    id: 2,
    title: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description:
      'Browse the list of  Softer ware installation services  offered and raise a request.',
    image: SoftwareFeaturedImage,
  },
  {
    id: 3,
    title: CATALOG_SERVICE_TYPES?.PM_TOOLS,
    description:
      'Browse the list of project management services  offered and raise a request..',
    image: PmFeaturedImage,
  },
  {
    id: 4,
    title: CATALOG_SERVICE_TYPES?.HARDWARE,
    description:
      'Browse the list of hardware services  offered and raise a request.',
    image: HardwareFeaturedImage,
  },
];
export const allServices = [
  {
    id: 1,
    title: 'Adobe Photoshop CC',
    serviceId: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description: 'Request for Adobe Photoshop CC',
    price: '$ 700.00',
    image: CatalogLogosAdobePhotoshopImage,
    serviceDescription:
      ' The industry-standard vector graphics software used worldwide by designers to create digital graphics, illustrations, and typography for all kinds of media: print, web, interactive, video, and mobile. 20GB of cloud storage to keep your files organized across multiple computers and share your work with colleagues and clients. ',
    feature:
      'Touch Type Tool  Images in brushes Font search Multiple-file place CSS extraction Sync Colors File Packaging ',
    platform:
      'Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard ',
  },
  {
    id: 2,
    title: 'Adobe illustrator CC',
    serviceId: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description: 'Request for Adobe illustrator CC',
    price: '$ 700.00',
    image: CatalogSkillIllustratorImage,
  },
  {
    id: 3,
    title: 'Adobe Premier Pro CC',
    serviceId: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description: 'Request for Adobe Premier Pro CC',
    price: '$ 700.00',
    image: CatalogAdobePremiereImage,
  },
  {
    id: 4,
    title: 'Data Backup',
    serviceId: CATALOG_SERVICE_TYPES?.PM_TOOLS,
    description: 'Request for Data backup for all your data',
    price: '$ 700.00',
    image: CatalogDatabaseImage,
    serviceDescription:
      'Request to backup all your data This will periodically backup all your data on our backup servers so you don`t miss anything because of complications during a release or any such unforeseen scenario.',
  },
  {
    id: 5,
    title: 'Dell Monitor',
    serviceId: CATALOG_SERVICE_TYPES?.HARDWARE,
    description: 'Request for New Dell Monitor',
    price: '$ 700.00',
    image: CatalogKyoDeviceLaptopImage,
  },
  {
    id: 6,
    title: 'Adobe XD CC',
    serviceId: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description: 'Request for Adobe XD CC',
    price: '$ 700.00',
    image: CatalogSkillXdImage,
  },
  {
    id: 7,
    title: 'Adobe InDesign',
    serviceId: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description: 'Request for Adobe In design',
    price: '$ 700.00',
    image: CatalogHopstarterSoftwareAdobeImage,
  },
  {
    id: 8,
    title: 'Logitech Wireless Mouse',
    serviceId: CATALOG_SERVICE_TYPES?.HARDWARE,
    description: 'Raise a request  for Wireless Mouse',
    price: '$ 700.00',
    image: CatalogLogitechMouseImage,
  },
  {
    id: 9,
    title: 'Zoo  Pro',
    serviceId: CATALOG_SERVICE_TYPES?.PM_TOOLS,
    description: 'Request for Zoom Pro',
    price: '$ 700.00',
    image: CatalogGroupZoomImage,
  },
  {
    id: 10,
    title: 'Apple iMac',
    serviceId: CATALOG_SERVICE_TYPES?.SOFTWARE_INSTALLATION,
    description: 'Request for Apple iMac',
    price: '$ 700.00',
    image: CatalogAppleProductsImacImage,
  },
  {
    id: 11,
    title: 'Apple MacBook',
    serviceId: CATALOG_SERVICE_TYPES?.HARDWARE,
    description: 'Raise a request  for Apple MacBook',
    price: '$ 700.00',
    image: CatalogMetroUiOsAppleImage,
  },
  {
    id: 12,
    title: 'Windows Laptop',
    serviceId: CATALOG_SERVICE_TYPES?.PM_TOOLS,
    description: 'Request for New Laptop',
    price: '$ 700.00',
    image: CatalogPhuzionDeviceLaptopImage,
  },
];
