import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor() { }
  jobs = [
    // { title: 'Java Developer', experience: '2+ Years' },
    // { title: 'Business Analyst', experience: '3+ Years' },
    // { title: 'Digital IT Solution Sales Specialist', experience: '10-15 Years' },
    // { title: 'Team Lead Java', experience: '8+ Years' },
    // { title: 'UI Developer', experience: '2+ Years' },
    // { title: 'OCP - Redhat OpenShift Container Platform Admin L3 Role', experience: '5-9 Years' },
    // { title: 'Redhat OCP Admin – L2', experience: '3-6 Years' }
  ];

  benefits = [
      { title: 'Innovative Technology', content: 'Engage with the latest tools and frameworks to stay ahead in your field.' },
  { title: 'Exciting Challenges', content: 'Take on projects that push your skills and creativity.' },
  { title: 'Career Advancement', content: 'Grow professionally with mentorship and learning opportunities.' },
  { title: 'Team Collaboration', content: 'Work alongside skilled colleagues in a supportive environment.' },
  { title: 'Rewarding Packages', content: 'Receive competitive salaries and performance-based incentives.' },
  { title: 'Diversity & Inclusion', content: 'Join a workplace that values different perspectives and backgrounds.' },
  { title: 'Meaningful Impact', content: 'Contribute to initiatives that positively affect communities and businesses.' },
  { title: 'Skill Development', content: 'Access resources and training to continually enhance your expertise.' },
  { title: 'Open Communication', content: 'Enjoy a culture of transparency, honesty, and mutual trust.' }
    
  ];

  selectedIndex: number | null = null;

  toggleDropdown(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  ngOnInit(): void {
  }

}
