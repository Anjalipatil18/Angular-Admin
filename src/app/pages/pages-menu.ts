import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'icon-Dashboard ',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  {
    title: 'App Text Settings',
    icon: 'TextSettings',
    children: [
      {
        title: 'Language',
        link: '/pages/text-settings/language',
      },
      {
        title: 'Support Text',
        link: '/pages/text-settings/support-text/user',
        // children: [
        //   {
        //     title: 'User',
        //     link: '/pages/text-settings/support-text/user',
        //   },
        //   {
        //     title: 'Agents',
        //     link: '/pages/text-settings/support-text/agents',
        //   },
        // ]
      },
      {
        title: 'FAQ',
        link: '/pages/text-settings/faq/faq-data',
      },
      {
        title: 'Report Reasons',
        link: '/pages/text-settings/report-reasons',
      },
      {
        title: 'Privacy Policy',
        link: '/pages/text-settings/privacy',
      },
      {
        title: 'Terms And Conditions',
        link: '/pages/text-settings/terms',
      },
    ],
  },
  {
    title: 'App Config',
    icon: 'adminUsers',
    link: '/pages/app-config',
    home: true,
  },
  {
    title: 'Cities',
    icon: 'icon-city',
    link: '/pages/countries',
    home: true,
  },
  {
    title: 'Brands & Models',
    icon: 'icon-brands',
    link: '/pages/models',
    home: true,
  },
  {
    title: 'Colors',
    icon: 'icon-colors',
    link: '/pages/colors',
    home: true,
  },
  {
    title: 'Logs',
    icon: 'icon-Logs',
    children: [
      {
        title: 'SMS Logs',
        link: '/pages/logs/sms-logs',
      },
      {
        title: 'Email Logs',
        link: '/pages/logs/email-logs',
      },
    ],
  },
  {
    title: 'Admin Users',
    icon: 'icon-adminUsers',
    link: '/pages/admin-users',
    home: true,
  },
  {
    title: 'Users',
    icon: 'icon-Users',
    link: '/pages/users',
    home: true,
  },
  {
    title: 'Attributes',
    icon: 'icon-Attr',
    link: '/pages/attributes',
    home: true,
  },
  // {
  //   title: 'Exchange Rate Settings',
  //   icon: 'icon-ratings',
  //   link: '/pages/exchange-rate-settings',
  //   home: true,
  // },
  {
    title: 'Attribute Group',
    icon: 'icon-AttrGroups',
    link: '/pages/attribute-group',
    home: true,
  },
  {
    title: 'Asset Types',
    icon: 'icon-AssetsType',
    link: '/pages/asset-type',
    home: true,
  },
  {
    title: 'Ads',
    icon: 'icon-Tags',
    link: '/pages/ads',
    home: true,
  },
  {
    title: 'Promoters',
    icon: 'icon-promoter',
    link: '/pages/promoters',
    home: true,
  },
  {
    title: 'Seller Attributes',
    icon: 'icon-seller',
    link: '/pages/seller-attributes',
    home: true,
  },
  // {
  //   title: 'Ratings',
  //   icon: 'icon-ratings ',
  //   link: '/pages/rating',
  //   home: true,
  // },
  {
    title: 'Seller',
    icon: 'icon-sellers',
    link: '/pages/seller',
    home: true,
  },
  {
    title: 'Taxes',
    icon: 'icon-Taxes',
    link: '/pages/taxes',
    home: true,
  },
  {
    title: 'Units',
    icon: 'icon-Taxes',
    link: '/pages/units',
    home: true,
  },
  {
    title: 'Promotion Plan',
    icon: 'icon-Tags',
    link: '/pages/promotion-plan',
    home: true,
  },
  {
    title: 'Website Banners',
    icon: 'icon-sellers',
    link: '/pages/website-banner',
    home: true,
  },
  // {
  //   title: 'Scenes',
  //   icon: 'icon-Tags ',
  //   link: '/pages/scenes',
  //   home: true,
  // },
];
