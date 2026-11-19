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
import { BlogComponent } from './data-comp/blog/blog.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './auth/admin-dashboard/admin-dashboard.component';
import { PsamarketplaceComponent } from './auth/psamarketplace/psamarketplace.component';
import { BusinessComponent } from './business/business/business.component';
import { GovtSchoolComponent } from './govt-school/govt-school/govt-school.component';
import { GovtHospitalComponent } from './govt-hospital/govt-hospital/govt-hospital.component';
import { AffordableWebsiteComponent } from './offer/affordable-website/affordable-website.component';
import { WebsiteOfferComponent } from './offer/website-offer/website-offer.component';
import { BusinessPartnershipComponent } from './offer/business-partnership/business-partnership.component';
import { MarathiBusinessOpportunityComponent } from './opportunity/marathi-business-opportunity/marathi-business-opportunity.component';
import { BusinessWebsiteMarathiComponent } from './offer/business-website-marathi/business-website-marathi.component';
import { HomeComponent } from './pages/home/home.component';
import { FestivalComponent } from './festival/festival.component';
import { ExcelManagerComponent } from './common/excel-manager/excel-manager.component';
import { GramPanchayatWebsiteComponent } from './pages/gram-panchayat-website/gram-panchayat-website.component';
import { GrampanchayatContactComponent } from './common/grampanchayat-contact/grampanchayat-contact.component';

const routes: Routes = [

  // Default route: Open Home page
    {
    path: 'excel-manager',
    component: ExcelManagerComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Home page
  {
    path: 'home',
    component: HomeComponent
  },

  // Services
  { path: 'service', component: PsaServiceComponent },
  { path: 'devsecops', component: DevsecopsComponent },
  { path: 'devsec', component: DevsecComponent },
  { path: 'cloudnative', component: CloudeNativeComponent },
  { path: 'platformengi', component: PlatformEngineeringComponent },
  { path: 'agiledevops', component: AgileDevopsComponent },
  { path: 'uiux', component: UiuxDesignComponent },
  { path: 'mobile-app', component: AppDevelopmentComponent },

  // Digital Marketing
  {
    path: 'digital-marketing/:section',
    component: SocialMediaMarketingComponent
  },

  // Industries
  {
    path: 'industries/:type',
    component: IndustriesInfoComponent
  },

  // About Us
  {
    path: 'about-us',
    component: AboutUsComponent
  },

  // Careers
  {
    path: 'careers',
    component: CareersComponent
  },

  // Login
  {
    path: 'login',
    component: LoginComponent
  },

  // Blog
  {
    path: 'blog',
    component: BlogComponent
  },

  // Admin Dashboard
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent
  },

  // Marketplace
  {
    path: 'market',
    component: PsamarketplaceComponent
  },

  // Business
  {
    path: 'business-website',
    component: BusinessComponent
  },

  // Government School
  {
    path: 'govt-school',
    component: GovtSchoolComponent
  },

  // Government Hospital
  {
    path: 'govt-hospital',
    component: GovtHospitalComponent
  },

  // Website Offers
  {
    path: 'affordable-website',
    component: AffordableWebsiteComponent
  },

  {
    path: 'website-offer',
    component: WebsiteOfferComponent
  },

  {
    path: 'business-partnership',
    component: BusinessPartnershipComponent
  },

  {
    path: 'offer-business-opportunity',
    component: MarathiBusinessOpportunityComponent
  },

  {
    path: 'business-website-marathi',
    component: BusinessWebsiteMarathiComponent
  },

  // WhatsApp Campaign
  {
    path: 'whatsapp-campaign',
    loadChildren: () =>
      import('./whatsapp-campaign/whatsapp-campaign.module')
        .then(m => m.WhatsappCampaignModule)
  },

  // Tech Module
  {
    path: 'tech',
    loadChildren: () =>
      import('./tech/tech.module')
        .then(m => m.TechModule)
  },

  // Live Module
  {
    path: 'live',
    loadChildren: () =>
      import('./live/live.module')
        .then(m => m.LiveModule)
  },
    {
    path: 'festival',
    component: FestivalComponent
  },
  {
  path: 'gram-panchayat-website',
  component: GramPanchayatWebsiteComponent
},
{
  path: 'grampanchayat-contact',
  component: GrampanchayatContactComponent
},
  
  // Keep wildcard route LAST
  {
    path: '**',
    redirectTo: 'home'
  },



];
  
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
