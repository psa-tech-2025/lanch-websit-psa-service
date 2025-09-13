import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 signtypeType: string = '';
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
            this.router.paramMap.subscribe(params => {
      this.signtypeType = params.get('typee') || '';
    });
  }

}
