import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCommonModule } from './common/common.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SpinnersInterceptor } from './common/shared/loader/spinners.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserinfoComponent } from './userDetails/userinfo/userinfo.component';
import { DiolougeModule } from './share/Diolouge/diolouge/diolouge.module';
import { PsaServiceComponent } from './data-comp/psa-service/psa-service.component';
import { HeaderComponent } from './common/shared/header/header.component';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BlogComponent } from './data-comp/blog/blog.component';
import { NavControlsComponent } from './data-comp/nav-controls/nav-controls.component';
import { AdminDashboardComponent } from './auth/admin-dashboard/admin-dashboard.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import {AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NavheaderComponent } from './auth/navheader/navheader.component';
import { LoginComponent } from './auth/login/login.component';
import { PsamarketplaceComponent } from './auth/psamarketplace/psamarketplace.component';
import { SafeUrlPipe } from './auth/safe-url.pipe';
export function HttpLoaderFactory(http: HttpClient) {
  const prefix = (document?.baseURI || './') + 'assets/i18n/';
  return new TranslateHttpLoader(http, prefix, '.json');
}

@NgModule({
  declarations: [
        AppComponent,
        UserinfoComponent,
        PsaServiceComponent,
        DevsecopsComponent,
        DevsecComponent,
        CloudeNativeComponent,
        PlatformEngineeringComponent,
        AgileDevopsComponent,
        UiuxDesignComponent,
        AppDevelopmentComponent,
        SocialMediaMarketingComponent,
        IndustriesInfoComponent,
        AboutUsComponent,
        CareersComponent,
        ClientdetailsComponent,
        BlogComponent,
        NavControlsComponent,
        AdminDashboardComponent,
        NavheaderComponent,
        LoginComponent,
        PsamarketplaceComponent,
        SafeUrlPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyCommonModule,
    DiolougeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Firestore
    provideFirestore(() => getFirestore()),
    // Storage
    provideStorage(() => getStorage()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass:SpinnersInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
