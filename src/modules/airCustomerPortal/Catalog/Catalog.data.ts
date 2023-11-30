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
export const catalogDetailContent = `<h5>Description:<h5><br/><p> The industry-standard vector graphics software used worldwide by designers to create digital graphics, illustrations,<br/> and typography for all kinds of media: print, web, interactive, video, and mobile. 20GB of cloud storage to keep your files organized<br/> across multiple computers and share your work with colleagues and clients.<p><br/><h5> Features :</h5><p> Touch Type Tool <br/>Images in brushes <br/>Font search <br/> Multiple-file place <br/>CSS extraction<br/> Sync Colors <br/>File Packaging <br/>Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard<br/><br/><h5> System Requirements</h5><h5> Windows :<h5/><ul><li> Intel Pentium 4 or AMD Athlon 64 processor (2GHz or faster)</li><li> Microsoft Windows 7 with Service Pack 1 or Windows 8</li><li> 1GB of RAM (3GB recommended) for 32 bit; 2GB of RAM (8GB recommended) for 64 bit</li><li> 2GB of available hard-disk space for installation;</li></ul><br/> <h5>Mac OS :</h5><ul><li> Multicore Intel processor with 64-bit support</li><li> Mac OS X v10.6.8, v10.7, or v10.8</li><li> 2GB of RAM (8GB recommended)</li><li> 2GB of available hard-disk space for installation</li></ul>`;
