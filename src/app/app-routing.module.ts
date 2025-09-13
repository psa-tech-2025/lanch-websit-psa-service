import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsaServiceComponent } from './data-comp/psa-service/psa-service.component';
import { DevsecopsComponent } from './data-comp/components/devsecops/devsecops.component';
import { DevsecComponent } from './data-comp/devsec/devsec.component';
import { CloudeNativeComponent } from './data-comp/cloude-native/cloude-native.component';
import { PlatformEngineeringComponent } from './data-comp/platform-engineering/platform-engineering.component';
import { AgileDevopsComponent } from './data-comp/agile-devops/agile-devops.component';
import { UiuxDesignComponent } from './data-comp/uiux-design/uiux-design.component';
import { AppDevelopmentComponent } from './data-comp/app-development/app-development.component';
import { SocialMediaMarketingComponent } from './data-comp/digital-marketing/social-media-marketing/social-media-marketing.component';
import { IndustriesInfoComponent } from './industries/industries-info/industries-info.component';
import { AboutUsComponent } from './data-comp/about-us/about-us.component';
import { CareersComponent } from './data-comp/careers/careers.component';
import { ClientdetailsComponent } from './client-details/clientdetails/clientdetails.component';
import { LoginComponent } from './client-details/clientdetails/login/login.component';
import { BlogComponent } from './data-comp/blog/blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'service', component: PsaServiceComponent },
 { path: 'devsecops', component: DevsecopsComponent },
  { path: 'devsec', component: DevsecComponent },
  { path:'cloudnative', component:CloudeNativeComponent},
  {path:'platformengi', component:PlatformEngineeringComponent },
  { path:'agiledevops' , component:AgileDevopsComponent},
  { path: 'uiux', component: UiuxDesignComponent},
  {path: 'mobile-app', component: AppDevelopmentComponent},
  { path: 'digital-marketing/:section', component: SocialMediaMarketingComponent },
    { path: 'industries/:type', component: IndustriesInfoComponent },
    {
      path:'about-us', component:AboutUsComponent
    },
    {
      path:'careers', component:CareersComponent
    },
    {
      path:'contact', component:ClientdetailsComponent
    },
    {
      path:'login', component:LoginComponent
    },
    {
      path:'blog', component: BlogComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
