import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-social-media-marketing',
  templateUrl: './social-media-marketing.component.html',
  styleUrls: ['./social-media-marketing.component.css']
})
export class SocialMediaMarketingComponent implements OnInit {
  activeIndex: number | null = 0; // First one expanded
    currentSection: string = '';

    services = [
    {
      title: 'Social Media Strategy',
      description: 'Our experts develop strategic plans aligned with your business goals, ensuring that every post and campaign serves a purpose in driving results.'
    },
    { title: 'Content Creation', description: 'We create compelling and shareable content, including captivating visuals and engaging copy, tailored to each platform and your target audience' },
    { title: 'Community Management', description: 'We actively engage with your audience, responding to comments, inquiries, and feedback, nurturing a loyal community around your brand' },
    { title: 'Paid Social Advertising', description: 'We run targeted paid advertising campaigns on platforms like Facebook, Instagram, Twitter, LinkedIn, and more to expand your reach and drive conversions.' },
    { title: 'Influencer Marketing', description: 'Leverage industry influencers to amplify your brand message and connect with a broader and more engaged audience.' },
    { title: 'Social Analytics', description: 'We continuously analyze data and metrics to measure the performance of your social media efforts, providing insights to refine and optimize your strategy.' },
    { title: 'Pay-Per-Click (PPC) Advertising', description: 'We create and manage highly targeted PPC campaigns on platforms like Google Ads and Bing Ads to ensure your ads reach the right audience.' },
    { title: 'Display Advertising', description: 'Engage your audience with visually appealing display ads on websites, apps, and social media platforms.' },
    { title: 'Video Advertising', description: 'Capture your audience s attention with compelling video ads on platforms like YouTube and social media.' }
  ];

    seoServices = [
    {
      title: 'Keyword Research and Strategy',
      description: 'We start by identifying the most relevant keywords for your industry. Our meticulous research ensures that your website ranks for the terms that matter most.'
    },
    {
      title: 'On-Page Optimization',
      description: 'We optimize your website’s meta tags, headings, content, and internal linking to improve visibility and relevance.'
    },
    {
      title: 'Link Building',
      description: 'We create high-quality backlinks that boost your domain authority and search engine rankings.'
    },
    {
      title: 'Content Creation',
      description: 'Our content experts craft SEO-friendly articles, blogs, and web copy that drives traffic and engagement.'
    },
    {
      title: 'Local SEO',
      description: 'We optimize your business for local searches to help you dominate the local SERPs and maps.'
    },
    {
      title: 'Technical SEO',
      description: 'We fix crawl errors, enhance site speed, and implement structured data to ensure your website is search engine-friendly.'
    },
    {
      title: 'SEO Audits',
      description: 'We perform in-depth SEO audits to identify opportunities and fix issues that may be hurting your rankings.'
    }
  ];
   smoServices = [
    {
      title: 'Social Media Strategy',
      description: 'Our experts develop tailored SMO strategies to boost brand awareness, engagement, and conversions on social media platforms.'
    },
    {
      title: 'Profile Setup and Enhancement',
      description: 'We ensure all your social media profiles are fully optimized, branded, and aligned with your business goals.'
    },
    {
      title: 'Content Creation',
      description: 'Engaging and visually appealing content is created and curated to resonate with your target audience.'
    },
    {
      title: 'Community Management',
      description: 'We manage and interact with your online community, responding to comments and messages to build trust and loyalty.'
    },
    {
      title: 'Analytics and Reporting',
      description: 'Detailed reports on performance metrics to measure the effectiveness of SMO efforts and refine strategies accordingly.'
    }
  ];

  consultingServices = [
    {
      title: 'Strategic Planning',
      description: 'Crafting long-term strategies tailored to your business goals for sustainable growth.'
    },
    {
      title: 'Market Research and Analysis',
      description: 'In-depth market insights to help guide business decisions and identify new opportunities.'
    },
    {
      title: 'Operational Efficiency',
      description: 'Streamlining internal processes to enhance productivity and reduce costs.'
    },
    {
      title: 'Financial Management',
      description: 'Providing expert financial strategies to manage budgets, investments, and profitability.'
    },
    {
      title: 'Marketing and Branding',
      description: 'Developing brand identity and go-to-market strategies to expand market reach.'
    },
    {
      title: 'Sales Optimization',
      description: 'Improving sales processes and performance to maximize revenue.'
    },
    {
      title: 'Leadership Development',
      description: 'Equipping leaders with tools and insights to guide teams and drive organizational success.'
    }
  ];
    smsservices = [
    {
      title: 'Bulk SMS Campaigns',
      description:
        'Supercharge your marketing efforts with our Bulk SMS campaigns. Reach thousands of potential customers instantly with personalized messages. Drive engagement and boost conversions like never before.'
    },
    {
      title: 'Transactional SMS Services',
      description:
        'Deliver important alerts and updates to your customers in real-time using our secure transactional SMS services.'
    },
    {
      title: 'SMS API Integration',
      description:
        'Easily integrate SMS capabilities into your application or CRM with our robust and scalable SMS API.'
    },
    {
      title: 'SMS Analytics and Reporting',
      description:
        'Gain insights into message delivery, open rates, and customer interactions to fine-tune your strategy.'
    },
    {
      title: 'SMS Templates and Personalization',
      description:
        'Use dynamic templates and personalize content to enhance customer experience and improve engagement.'
    }
  ];

  wpservices = [
    {
      title: 'WhatsApp Business Account Setup',
      description:
        'Unlock the full capabilities of WhatsApp Business with our expert account setup services. We’ll configure your account for success, ensuring that you can seamlessly communicate with your customers.'
    },
    {
      title: 'Personalized WhatsApp Campaigns',
      description:
        'Launch customized campaigns with personalized messages that resonate with your target audience and boost engagement.'
    },
    {
      title: 'WhatsApp Automation',
      description:
        'Automate replies, greetings, and workflows to ensure consistent communication with customers without manual effort.'
    },
    {
      title: 'WhatsApp Analytics and Insights',
      description:
        'Monitor campaign performance, read rates, and customer behavior using real-time insights and detailed reports.'
    },
    {
      title: 'WhatsApp Integration',
      description:
        'Seamlessly integrate WhatsApp with your CRM or marketing tools for a unified and efficient customer communication experience.'
    }
  ];
   voiceservices = [
    {
      title: 'Professional Voice Campaigns',
      content: 'Elevate your brand’s voice with our professional voice campaigns. Our skilled voice artists will help you craft compelling messages that leave a lasting impression on your audience.',
      active: true
    },
    {
      title: 'Interactive Voice Response (IVR) Systems',
      content: 'Implement smart IVR systems to direct your callers to the right departments quickly and improve user experience.',
      active: false
    },
    {
      title: 'Voice Broadcasting',
      content: 'Deliver voice messages to a large audience instantly, whether for announcements, promotions, or alerts.',
      active: false
    },
    {
      title: 'Call Analytics and Reporting',
      content: 'Monitor and analyze call data to optimize communication strategies and track campaign performance.',
      active: false
    },
    {
      title: 'Toll-Free Numbers',
      content: 'Build trust and accessibility with toll-free numbers for your customers to reach you at no cost.',
      active: false
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
       this.route.url.subscribe((segments) => {
      if (segments.length > 0) {
        this.currentSection = segments[segments.length - 1].path;
      }
    });
  }

    toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

}
