import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy {

  menuOpen = false;


toggleMenu() {
  this.menuOpen = !this.menuOpen;
  if (this.menuOpen) {
    document.body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open'); // ✅ Add this
  } else {
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open'); // ✅ Add this
  }
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: Event) {
  const target = event.target as HTMLElement;
  const clickedInside = target.closest('.navbar');
if (this.menuOpen) {
  document.body.classList.add('menu-open');
  document.documentElement.classList.add('menu-open');
}
 else {
  document.body.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
}
}

  isDigitalOpen = false;

toggleDigital() {
  this.isDigitalOpen = !this.isDigitalOpen;
}

  constructor(private translate: TranslateService ) {
     this.translate.setDefaultLang('en');
    // / normalize browser codes like en-US -> en, hi-IN -> hi, etc.
  const browser = translate.getBrowserLang() || 'en';
  const lang = browser.toLowerCase().startsWith('hi') ? 'hi'
            : browser.toLowerCase().startsWith('mr') ? 'mr'
            : 'en';

  translate.use(lang);   // ✅ make sure we actually load en.json
}
      switchLang(lang: string) {
    this.translate.use(lang);
  }


ngOnInit(): void {
  document.addEventListener('wheel', this.preventScrollWhenMenuOpen, { passive: false });
  document.addEventListener('keydown', this.preventScrollWhenMenuOpen, { passive: false });
  document.addEventListener('touchmove', this.preventScrollWhenMenuOpen, { passive: false });
}

ngOnDestroy(): void {
  document.removeEventListener('wheel', this.preventScrollWhenMenuOpen);
  document.removeEventListener('keydown', this.preventScrollWhenMenuOpen);
  document.removeEventListener('touchmove', this.preventScrollWhenMenuOpen);
}

preventScrollWhenMenuOpen = (event: Event) => {
  const menu = document.querySelector('.nav-menu');
  if (this.menuOpen && menu && !menu.contains(event.target as Node)) {
    event.preventDefault();
  }
}

@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.nav-menu') && !target.closest('.hamburger')) {
    this.menuOpen = false;
  }
}

}
