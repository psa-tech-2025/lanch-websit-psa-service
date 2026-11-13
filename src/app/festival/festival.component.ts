import { Component } from '@angular/core';

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class FestivalComponent {

  companyName = 'PSA TECH INDUSTRIAL SERVICES';

  website = 'www.psatechall.com';

  contact = '+91 8668267967';

  festivalTitle = 'दिवाळीच्या हार्दिक शुभेच्छा!';

  festivalMessage =
    'दीपावलीच्या मंगलमय पर्वावर आपल्या जीवनात सुख, समृद्धी, आनंद आणि यशाची नवी पहाट उजाडो.';

  subMessage =
    'आपला व्यवसाय प्रगतीच्या नव्या उंचीवर पोहोचो, हीच मनःपूर्वक शुभेच्छा!';

}