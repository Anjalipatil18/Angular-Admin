import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: "dashboard",
      //   loadChildren: "./dashboard/dashboard.module#DashboardModule",
      //   data: {
      //     title: "Dashboard",
      //     breadcrumb: [
      //       {
      //         label: "Dashboard",
      //         url: "pages"
      //       }
      //     ]
      //   }
      // },
      {
        path: 'text-settings',
        loadChildren: './text-settings/text-settings.module#TextSettingsModule',
      },
      {
        path: 'admin-users',
        loadChildren: './admin-users/admin-users.module#AdminUsersModule',
      },
      {
        path: 'app-config',
        loadChildren: './app-config/app-config.module#AppConfigModule',
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
      },
      {
        path: 'logs',
        loadChildren: './logs/logs.module#LogsModule',
      },
      {
        path: 'attributes',
        loadChildren: './attributes/attributes.module#AttributesModule',
      },
      {
        path: 'attribute-group',
        loadChildren:
          './attribute-group/attribute-group.module#AttributeGroupModule',
      },
      {
        path: 'asset-type',
        loadChildren: './asset-type/asset-type.module#AssetTypeModule',
      },
      {
        path: 'ads',
        loadChildren: './tags/tags.module#TagsModule',
      },
      {
        path: 'taxes',
        loadChildren: './taxes/taxes.module#TaxesModule',
      },
      {
        path: 'units',
        loadChildren: './units/units.module#UnitsModule',
      },
      {
        path: 'promotion-plan',
        loadChildren:
          './promotion-plan/promotion-plan.module#PromotionPlanModule',
      },
      {
        path: 'website-banner',
        loadChildren:
          './website-banner/website-banner.module#WebsiteBannerModule',
      },
      {
        path: 'promoters',
        loadChildren: './promotors/promotors.module#PromotorsModule',
      },
      {
        path: 'seller-attributes',
        loadChildren:
          './seller-attributes/seller-attributes.module#SellerAttributesModule',
      },
      {
        path: 'rating',
        loadChildren: './rating/rating.module#RatingModule',
      },
      {
        path: 'models',
        loadChildren: './models/models.module#ModelsModule',
      },
      {
        path: 'countries',
        loadChildren: './country/country.module#CountryModule',
      },
      {
        path: 'scenes',
        loadChildren: './scenes/scenes.module#ScenesModule',
      },
      {
        path: 'colors',
        loadChildren: './colors/colors.module#ColorsModule',
      },
      {
        path: 'seller',
        loadChildren: './seller/seller.module#SellerModule',
      },

      { path: '', redirectTo: 'text-settings', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
