import {
  HardwareFeaturedImage,
  PmFeaturedImage,
  SoftwareFeaturedImage,
  CatalogLogosAdobePhotoshopImage,
  CatalogSkillIllustratorImage,
  ServiceCatalogPmToolsAsanaImage,
  ServiceCatalogPmToolsTroolsImage,
  ServiceCatalogHardwareTrelloImage,
  ServiceCatalogHardwareAsanaImage,
  ServiceCatalogSoftwareAdobePhotoshopImage,
} from '@/assets/images';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';

export const services = [
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

export const allServicesData = [
  {
    id: 1,
    image: CatalogLogosAdobePhotoshopImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 2,
    image: CatalogLogosAdobePhotoshopImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 3,
    image: CatalogLogosAdobePhotoshopImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 4,
    image: CatalogSkillIllustratorImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 5,
    image: CatalogSkillIllustratorImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 6,
    image: CatalogSkillIllustratorImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 7,
    image: ServiceCatalogSoftwareAdobePhotoshopImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Software Installation',
  },
  {
    id: 8,
    image: ServiceCatalogPmToolsAsanaImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'PM Tools',
  },
  {
    id: 9,
    image: ServiceCatalogPmToolsTroolsImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'PM Tools',
  },
  {
    id: 10,
    image: ServiceCatalogHardwareAsanaImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Hardware',
  },
  {
    id: 11,
    image: ServiceCatalogHardwareTrelloImage,
    title: 'Adobe Photoshop CC',
    userType: 'Permanent',
    status: 'Published',
    categoryName: 'Hardware',
  },
];
