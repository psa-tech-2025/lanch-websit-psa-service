import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-industries-info',
  templateUrl: './industries-info.component.html',
  styleUrls: ['./industries-info.component.css']
})
export class IndustriesInfoComponent implements OnInit {
  industryType: string = '';
  constructor(private router:ActivatedRoute) { }

services = [
  {
    title: 'Website Design',
    image: 'assets/scorllabale/app.webp',
    description: 'We create responsive and modern websites tailored for your business.',
    route:'/devsecops'
  },
  {
    title: 'App Development',
    image: 'assets/scorllabale/digi.webp',
    description: 'Stay ahead of the curve with custom mobile and web applications.',
     route:'/mobile-app'
  },
  {
    title: 'Digital Marketing',
    image: 'assets/scorllabale/web-development (1).jpg',
    description: 'Boost your online presence and get more leads with our marketing services.',
     route:'/digital-marketing/smm'
  },
  {
    title: 'Website Redesign',
    image: 'assets/scorllabale/app.webp',
    description: 'We enhance existing websites with fresh designs and better performance.',
     route:'/uiux'
  }
];


  ngOnInit(): void {
        this.router.paramMap.subscribe(params => {
      this.industryType = params.get('type') || '';
    });
  }

}
