
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface CourseCategory {
  value: string;
  label: string;
  icon: string;
  description: string;
}

interface CourseSection {
  title: string;
  subtitle: string;
  icon: string;
  categories: CourseCategory[];
}

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent {

  constructor(private router: Router) {}

  sections: CourseSection[] = [
    {
      title: 'Business & Career',
      subtitle: 'Build professional skills and move confidently toward your career goals.',
      icon: '💼',
      categories: [
        {
          value: 'commerce',
          label: 'Commerce & Finance',
          icon: '📊',
          description: 'Learn finance, accounting and business fundamentals.'
        },
        {
          value: 'marketing',
          label: 'Digital Marketing',
          icon: '📣',
          description: 'Explore SEO, social media and online marketing.'
        },
        {
          value: 'training',
          label: 'Professional Training',
          icon: '🎯',
          description: 'Build practical skills for the workplace.'
        },
        {
          value: 'certificate',
          label: 'Certification Program',
          icon: '🏆',
          description: 'Develop knowledge through structured programs.'
        }
      ]
    },
    {
      title: 'Technology & Innovation',
      subtitle: 'Explore modern technology, programming and emerging AI tools.',
      icon: '💻',
      categories: [
        {
          value: 'technology',
          label: 'IT & Technology',
          icon: '🖥️',
          description: 'Discover IT concepts, tools and digital skills.'
        },
        {
          value: 'programming',
          label: 'Programming',
          icon: '👨‍💻',
          description: 'Practice coding, web development and software skills.'
        },
        {
          value: 'ai',
          label: 'Artificial Intelligence',
          icon: '🤖',
          description: 'Discover AI concepts and practical applications.'
        }
      ]
    },
    {
      title: 'Communication & Personal Growth',
      subtitle: 'Improve communication, confidence and everyday effectiveness.',
      icon: '🌟',
      categories: [
        {
          value: 'english',
          label: 'Spoken English',
          icon: '🗣️',
          description: 'Build speaking, vocabulary and communication skills.'
        },
        {
          value: 'personality',
          label: 'Personality Development',
          icon: '🌟',
          description: 'Strengthen confidence and presentation skills.'
        }
      ]
    },
    {
      title: 'Design & Creativity',
      subtitle: 'Turn creative ideas into practical design and artistic skills.',
      icon: '🎨',
      categories: [
        {
          value: 'design',
          label: 'Graphic & UI Design',
          icon: '🖌️',
          description: 'Explore visual design and user interface concepts.'
        },
        {
          value: 'creative',
          label: 'Creative Arts',
          icon: '🎭',
          description: 'Discover creative activities and artistic expression.'
        }
      ]
    },
    {
      title: 'Live Learning & Events',
      subtitle: 'Take part in interactive learning sessions and focused workshops.',
      icon: '🎥',
      categories: [
        {
          value: 'workshop',
          label: 'Workshop',
          icon: '🛠️',
          description: 'Learn through focused, practical sessions.'
        },
        {
          value: 'webinar',
          label: 'Live Webinar',
          icon: '🎥',
          description: 'Explore online sessions and expert-led discussions.'
        }
      ]
    },
    {
      title: 'Kids & Wellbeing',
      subtitle: 'Discover learning experiences for young minds and everyday wellbeing.',
      icon: '🌱',
      categories: [
        {
          value: 'kids',
          label: 'Kids Learning',
          icon: '🧩',
          description: 'Explore engaging learning activities for children.'
        },
        {
          value: 'wellness',
          label: 'Health & Wellness',
          icon: '🌿',
          description: 'Explore general wellness and healthy lifestyle topics.'
        }
      ]
    }
  ];

  // Open the existing course listing page
  exploreCourses(): void {
    this.router.navigate(['/live/courses']);
  }

  // Open the course listing from any category card
  exploreCategory(category: CourseCategory): void {
    this.router.navigate(['/live/courses'], {
      queryParams: { category: category.value }
    });
  }
}
