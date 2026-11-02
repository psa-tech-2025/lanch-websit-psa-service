
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  menuOpen = false;

  whatsappUrl = 'https://wa.me/918668267967';
  partnerWhatsappUrl = 'https://wa.me/918668267967';
  
showFloatingNav = true;

toggleFloatingNav(): void {
  this.showFloatingNav = !this.showFloatingNav;
}


  aiFeatures = [
    {
      icon: 'bi-robot',
      color: 'purple',
      title: 'AI Chatbot Solutions',
      description: 'Intelligent chatbot solutions to improve customer communication and support.'
    },
    {
      icon: 'bi-stars',
      color: 'blue',
      title: 'AI Content Generation',
      description: 'Create useful content, ideas and digital marketing material with AI.'
    },
    {
      icon: 'bi-gear-wide-connected',
      color: 'green',
      title: 'Business Automation',
      description: 'Automate repetitive business activities and improve productivity.'
    },
    {
      icon: 'bi-whatsapp',
      color: 'teal',
      title: 'WhatsApp Automation',
      description: 'Smart WhatsApp communication and customer engagement solutions.'
    },
    {
      icon: 'bi-graph-up',
      color: 'orange',
      title: 'AI Data Analysis',
      description: 'Use intelligent data analysis to support better business decisions.'
    },
    {
      icon: 'bi-headset',
      color: 'pink',
      title: 'AI Customer Support',
      description: 'Modern AI-powered customer support and assistance solutions.'
    }
  ];

  services = [
    {
      icon: 'bi-code-slash',
      color: 'blue',
      title: 'Web Development',
      description: 'Professional and responsive websites for businesses, startups and organizations.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-phone',
      color: 'purple',
      title: 'App Development',
      description: 'Custom mobile and web applications designed for your business requirements.',
      link: 'https://www.psatechall.com'
    },
    // {
    //   icon: 'bi-cloud-check',
    //   color: 'cyan',
    //   title: 'Cloud Services',
    //   description: 'Cloud hosting, deployment, infrastructure and scalable cloud solutions.',
    //   link: 'https://www.psatechall.com'
    // },
    // {
    //   icon: 'bi-shield-check',
    //   color: 'green',
    //   title: 'DevSecOps',
    //   description: 'Secure development, CI/CD automation and modern DevOps solutions.',
    //   link: 'https://www.psatechall.com'
    // },
    {
      icon: 'bi-megaphone',
      color: 'orange',
      title: 'Digital Marketing',
      description: 'Social media promotion, online branding and digital marketing services.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-calendar-event',
      color: 'red',
      title: 'Event Management',
      description: 'Digital event planning, participant management and event technology solutions.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-qr-code',
      color: 'dark',
      title: 'QR Code Solutions',
      description: 'QR code solutions for businesses, products, events and digital profiles.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-file-earmark-text',
      color: 'teal',
      title: 'Online Forms',
      description: 'Digital forms, online applications and data collection solutions.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-briefcase',
      color: 'purple',
      title: 'Jobs & Careers',
      description: 'Career information, job opportunities and professional guidance.',
      link: 'https://www.psatechall.com'
    }
  ];

  audiences = [
    {
      icon: 'bi-buildings',
      color: 'blue',
      title: 'Businesses',
      description: 'Digital solutions, websites, applications and technology support for businesses.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-mortarboard',
      color: 'purple',
      title: 'Students',
      description: 'Technical courses, practical learning and professional skill development.',
      link: 'https://www.psatechall.com'
    },
    {
      icon: 'bi-person-workspace',
      color: 'orange',
      title: 'Job Seekers',
      description: 'Career guidance, job updates and personality development opportunities.',
      link: 'https://www.psatechall.com'
    }
  ];

  eventServices = [
    {
      icon: 'bi-calendar-check',
      color: 'blue',
      title: 'Event Planning',
      description: 'Plan and organize professional events with digital support.'
    },
    {
      icon: 'bi-qr-code',
      color: 'purple',
      title: 'QR Code Entry',
      description: 'Use QR-based solutions for event identification and entry.'
    },
    {
      icon: 'bi-people',
      color: 'green',
      title: 'Participant Management',
      description: 'Manage participant information and event records.'
    },
    {
      icon: 'bi-bar-chart',
      color: 'orange',
      title: 'Event Reports',
      description: 'Organize event information and view participation reports.'
    }
  ];

  eventTypes = [
    {
      id: 'corporate',
      icon: 'bi-building',
      color: 'blue',
      category: 'BUSINESS',
      title: 'Corporate Events',
      description: 'Business meetings, conferences, seminars and corporate programs.'
    },
    {
      id: 'education',
      icon: 'bi-mortarboard',
      color: 'purple',
      category: 'EDUCATION',
      title: 'Educational Events',
      description: 'School programs, workshops, training sessions and educational events.'
    },
    {
      id: 'social',
      icon: 'bi-people',
      color: 'orange',
      category: 'COMMUNITY',
      title: 'Social Events',
      description: 'Community programs, cultural events and public gatherings.'
    }
  ];

  partnerBenefits = [
    {
      icon: 'bi-wallet2',
      title: '₹0 Upfront Investment',
      description: 'Explore the PSA TECH partner opportunity without an upfront joining fee.'
    },
    {
      icon: 'bi-people',
      title: 'Build Your Network',
      description: 'Connect with businesses and potential customers.'
    },
    {
      icon: 'bi-cash-coin',
      title: 'Referral Commission',
      description: 'Earn commission on eligible referrals and completed transactions.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Grow Together',
      description: 'Promote digital services and build business relationships.'
    }
  ];

  learningAreas = [
    { icon: 'bi-code-slash', color: 'blue', title: 'Web Development' },
    { icon: 'bi-phone', color: 'purple', title: 'App Development' },
    { icon: 'bi-robot', color: 'green', title: 'Artificial Intelligence' },
    // { icon: 'bi-cloud', color: 'cyan', title: 'Cloud Computing' },
    // { icon: 'bi-shield-check', color: 'orange', title: 'Cyber Security' },
    { icon: 'bi-chat-dots', color: 'pink', title: 'English Speaking' },
    { icon: 'bi-person-check', color: 'teal', title: 'Personality Development' },
    { icon: 'bi-briefcase', color: 'dark', title: 'Career Development' }
  ];

  whyChooseUs = [
    {
      icon: 'bi-lightning-charge',
      title: 'Modern Technology',
      description: 'Explore modern technology and digital solutions.'
    },
    {
      icon: 'bi-person-check',
      title: 'Professional Support',
      description: 'Get support for your digital and business requirements.'
    },
    {
      icon: 'bi-currency-rupee',
      title: 'Affordable Solutions',
      description: 'Practical solutions designed for different business needs.'
    },
    {
      icon: 'bi-headset',
      title: 'Customer Focus',
      description: 'Solutions focused on customer needs and business growth.'
    }
  ];

  // MOBILE MENU

// WHATSAPP CONFIGURATION
whatsappNumber = '918668267967';

// Generate WhatsApp link with requirement-specific message
getWhatsappUrl(requirement: string = 'General Enquiry'): string {
  const message = `Hello PSA TECH!

I would like to enquire about: ${requirement}.

Please share the details and guide me about the process, requirements and quotation.

Thank you.`;

  return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// ENQUIRY FORM
generatedEnquiryId = '';
enquirySubmitted = false;
enquiryError = '';

createEnquiry(event: Event, name: string, mobile: string): void {
  event.preventDefault();

  this.enquiryError = '';
  this.enquirySubmitted = false;

  const cleanName = name.trim();
  const cleanMobile = mobile.trim();

  if (cleanName.length < 2) {
    this.enquiryError = 'Please enter a valid name.';
    return;
  }

  if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
    this.enquiryError = 'Please enter a valid 10-digit mobile number.';
    return;
  }

  // Temporary frontend ID. Use backend-generated ID for production.
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(100000 + Math.random() * 900000);

  this.generatedEnquiryId = `PSA-ENQ-${datePart}-${randomPart}`;
  this.enquirySubmitted = true;
}

// MOBILE MENU
toggleMenu(): void {
  this.menuOpen = !this.menuOpen;
}

closeMenu(): void {
  this.menuOpen = false;
}

// RIGHT SIDE PAGE NAVIGATION
activeSection = 'home';

pageSections = [
  { id: 'home', name: 'Home', icon: 'bi-house-fill' },
  { id: 'about', name: 'About Us', icon: 'bi-building' },
  { id: 'services', name: 'Technology & Services', icon: 'bi-laptop' },
  { id: 'ai-solutions', name: 'AI Solutions', icon: 'bi-robot' },
  { id: 'courses', name: 'Education', icon: 'bi-mortarboard' },
  { id: 'events', name: 'Event Management', icon: 'bi-calendar-event' },
  { id: 'business-partner', name: 'Business Partner', icon: 'bi-people' },
  { id: 'amc-services', name: 'Annual AMC', icon: 'bi-tools' },
  { id: 'audience', name: 'Who We Serve', icon: 'bi-person-hearts' },
  { id: 'why-us', name: 'Why PSA TECH', icon: 'bi-patch-check' },
  { id: 'contact', name: 'Contact', icon: 'bi-telephone' }
];



  // SMOOTH SAME-PAGE SCROLLING
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (section) {
      this.activeSection = sectionId;

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // DETECT ACTIVE SECTION WHILE SCROLLING

@HostListener('window:scroll')
onWindowScroll(): void {
  const offset = 180;

  const visibleSections = this.pageSections
    .map(section => ({
      id: section.id,
      element: document.getElementById(section.id)
    }))
    .filter(item => item.element !== null)
    .map(item => ({
      id: item.id,
      top: item.element!.getBoundingClientRect().top
    }))
    .filter(item => item.top <= offset)
    .sort((a, b) => b.top - a.top);

  const newActiveSection = visibleSections.length
    ? visibleSections[0].id
    : 'home';

  // Reopen navigation when the active section changes
  if (newActiveSection !== this.activeSection) {
    this.activeSection = newActiveSection;
    this.showFloatingNav = true;
  }
}


}








