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

export const services = [
  {
    id: 1,
    title: 'All Services',
    description:
      'Browse the list of all services  offered and raise a request.',
    image: ServiceFeaturedImage,
  },
  {
    id: 2,
    title: 'Software installation',
    description:
      'Browse the list of  Softer ware installation services  offered and raise a request.',
    image: SoftwareFeaturedImage,
  },
  {
    id: 3,
    title: 'PM Tools',
    description:
      'Browse the list of project management services  offered and raise a request..',
    image: PmFeaturedImage,
  },
  {
    id: 4,
    title: 'Hardware',
    description:
      'Browse the list of hardware services  offered and raise a request.',
    image: HardwareFeaturedImage,
  },
];
export const allsServices = [
  {
    id: 1,
    title: 'Adobe Photoshop CC',
    serviceId: 'Software installation',
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
    serviceId: 'Software installation',
    description: 'Request for Adobe illustrator CC',
    price: '$ 700.00',
    image: CatalogSkillIllustratorImage,
  },
  {
    id: 3,
    title: 'Adobe Premier Pro CC',
    serviceId: 'Software installation',
    description: 'Request for Adobe Premier Pro CC',
    price: '$ 700.00',
    image: CatalogAdobePremiereImage,
  },
  {
    id: 4,
    title: 'Data Backup',
    serviceId: 'PM Tools',
    description: 'Request for Data backup for all your data',
    price: '$ 700.00',
    image: CatalogDatabaseImage,
    serviceDescription:
      'Request to backup all your data This will periodically backup all your data on our backup servers so you don`t miss anything because of complications during a release or any such unforeseen scenario.',
  },
  {
    id: 5,
    title: 'Dell Monitor',
    serviceId: 'Hardware',
    description: 'Request for New Dell Monitor',
    price: '$ 700.00',
    image: CatalogKyoDeviceLaptopImage,
  },
  {
    id: 6,
    title: 'Adobe XD CC',
    serviceId: 'Software installation',
    description: 'Request for Adobe XD CC',
    price: '$ 700.00',
    image: CatalogSkillXdImage,
  },
  {
    id: 7,
    title: 'Adobe InDesign',
    serviceId: 'Software installation',
    description: 'Request for Adobe In design',
    price: '$ 700.00',
    image: CatalogHopstarterSoftwareAdobeImage,
  },
  {
    id: 8,
    title: 'Logitech Wireless Mouse',
    serviceId: 'Hardware',
    description: 'Raise a request  for Wireless Mouse',
    price: '$ 700.00',
    image: CatalogLogitechMouseImage,
  },
  {
    id: 9,
    title: 'Zoo  Pro',
    serviceId: 'PM Tools',
    description: 'Request for Zoom Pro',
    price: '$ 700.00',
    image: CatalogGroupZoomImage,
  },
  {
    id: 10,
    title: 'Apple iMac',
    serviceId: 'Software installation',
    description: 'Request for Apple iMac',
    price: '$ 700.00',
    image: CatalogAppleProductsImacImage,
  },
  {
    id: 11,
    title: 'Apple MacBook',
    serviceId: 'Hardware',
    description: 'Raise a request  for Apple MacBook',
    price: '$ 700.00',
    image: CatalogMetroUiOsAppleImage,
  },
  {
    id: 12,
    title: 'Windows Laptop',
    serviceId: 'PM Tools',
    description: 'Request for New Laptop',
    price: '$ 700.00',
    image: CatalogPhuzionDeviceLaptopImage,
  },
];
