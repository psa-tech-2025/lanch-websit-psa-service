import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) {}


  updateMetaData(data: {
    title: string;
    description: string;
    url: string;
  }): void {

    // Page Title
    this.titleService.setTitle(data.title);


    // Normal SEO
    this.meta.updateTag({
      name: 'description',
      content: data.description
    });


    // Open Graph Text Metadata
    this.meta.updateTag({
      property: 'og:type',
      content: 'website'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: data.title
    });

    this.meta.updateTag({
      property: 'og:description',
      content: data.description
    });

    this.meta.updateTag({
      property: 'og:url',
      content: data.url
    });

    this.meta.updateTag({
      property: 'og:site_name',
      content: 'PSA TECH'
    });


    // Twitter Text Metadata
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: data.title
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: data.description
    });

  }

}