import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psa-tech',
  templateUrl: './psa-tech.component.html',
  styleUrls: ['./psa-tech.component.css']
})
export class PsaTechComponent implements OnInit {

  constructor(private router: Router) {}

  openPage(page: 'product' | 'courses' | 'jobs'): void {
    this.router.navigate(['/tech', page]);
  }

  ngOnInit(): void {
  }

}
