import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './views/content/content.component';

import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: '',
    component: ContentComponent,
    data: {
      title: 'Layout',
    },
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./views/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'product-type',
        loadChildren: () =>
          import('./views/product-type/product-type.module').then(
            (m) => m.ProductTypeModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./views/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'event',
        loadChildren: () =>
          import('./views/event/event.module').then((m) => m.EventModule),
      },
      {
        path: 'advertise',
        loadChildren: () =>
          import('./views/advertise/advertise.module').then(
            (m) => m.AdvertiseModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
