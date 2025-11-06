import { Component, OnInit } from '@angular/core';
import { MarketService, NewsItem } from '../market.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-psamarketplace',
  templateUrl: './psamarketplace.component.html',
  styleUrls: ['./psamarketplace.component.css']
})
export class PsamarketplaceComponent implements OnInit {

  newsList: NewsItem[] = [];
  paginatedNews: NewsItem[] = [];
  selectedNews: NewsItem = { title: '', category: '', date: '', content: '' };
  selectedFile: File | null = null;
  selectedViewPost: NewsItem | null = null;  // ✅ For modal view
  showForm = false;
  isAdmin = false;

  // Pagination
  itemsPerPage = 2;
  currentPage = 1;
  totalPages = 1;

  constructor(private newsService: MarketService, private auth: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isLoggedIn();
    this.loadNews();
  }

  loadNews() {
    this.newsService.getAll().subscribe((news) => {
      this.newsList = news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.calculatePagination();
    });
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.newsList.length / this.itemsPerPage);
    this.updatePaginatedNews();
  }

  updatePaginatedNews() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedNews = this.newsList.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedNews();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedNews();
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.selectedNews = { title: '', category: '', date: '', content: '' };
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveNews() {
    if (this.selectedNews.id) {
      this.newsService.update(this.selectedNews.id, this.selectedNews, this.selectedFile || undefined)
        .then(() => this.cancel());
    } else {
      this.newsService.add(this.selectedNews, this.selectedFile || undefined)
        .then(() => this.cancel());
    }
  }

  edit(news: NewsItem) {
    this.selectedNews = { ...news };
    this.showForm = true;
  }

  delete(id?: string, imageUrl?: string) {
    if (id && confirm('Are you sure to delete this news?')) {
      this.newsService.delete(id, imageUrl);
    }
  }

  cancel() {
    this.showForm = false;
    this.selectedNews = { title: '', category: '', date: '', content: '' };
    this.selectedFile = null;
  }

  /** ✅ Open post modal */
  openPost(item: NewsItem) {
    this.selectedViewPost = item;
    document.body.style.overflow = 'hidden'; // disable background scroll
  }

  /** ✅ Close post modal */
  closePost() {
    this.selectedViewPost = null;
    document.body.style.overflow = 'auto';
  }

  getEmbedUrl(url: string): string {
    if (!url) return '';
    if (url.includes('youtube.com')) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}`;
    }
    if (url.includes('instagram.com')) {
      return `https://www.instagram.com/p/${url.split('/p/')[1]?.split('/')[0]}/embed`;
    }
    return url;
  }
}
