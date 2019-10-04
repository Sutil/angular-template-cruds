import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { EXPANSION_PANEL_ANIMATION_TIMING, MatIconRegistry, MatSidenav } from '@angular/material';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { rgbaToHex } from '../extractrgba';

@Component({
  selector: 'wtc-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['pages.component.scss'],
  animations: [
    trigger(
      'expandMenu',
      [
        state('true', style({
          'transform-origin': 'top',
          height: '*',
          transform: 'scaleY(1)',
        })),
        state('false', style({
          'transform-origin': 'top',
          height: '0px',
          transform: 'scaleY(0)',
        })),
        transition(
          'true <=> false', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
      ]),
  ],
})
export class PagesComponent implements AfterViewInit{
  isLoading = false;

  private _navigationSub: Subscription;

  constructor(
    breakpointObserver: BreakpointObserver,
    private overlayContainer: OverlayContainer,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
    private meta: Meta,
  ) {
    breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.TabletPortrait,
      ])
      .subscribe(
        result => { this.navMode = result.matches ? 'over' : 'side'; });

    const addIcon =
      function (iconName: string, iconUrl: string = `assets/icons/${iconName}.svg`) {
        iconRegistry.addSvgIcon(
          iconName, sanitizer.bypassSecurityTrustResourceUrl(iconUrl));
      };

    addIcon('fornecedor');
    addIcon('filial');
    addIcon('produto');
    addIcon('regional');

    if (!this._navigationSub) {
      this._navigationSub = this.router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart && !this.isLoading) {
          this.isLoading = true;
        }

        if (event instanceof NavigationEnd || event instanceof NavigationCancel ||
          event instanceof NavigationError && this.isLoading) {
          this.isLoading = false;
        }
      });
    }

  }

  ngAfterViewInit() {
    const el = document.querySelector('.mat-sidenav');
    const st = window.getComputedStyle(el);
    const rgba = st.getPropertyValue('background-color');

    const color = rgbaToHex(rgba);
    this.meta.addTag({name: 'theme-color', content: color});
  }


  isDark = false;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.overlayContainer.getContainerElement().classList.toggle('dark-theme');
  }

  closeSidenavIfIsMobile() {
    if (this.isMobilie()) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.logout();
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  navMode: 'over' | 'push' | 'side' = 'side';

  sideBarOpened = !this.isMobilie();

  isMobilie() {
    return window.screen.width < 960;
  }

  menu = [
    {
      name: 'Planning',
      link: ['.', 'consultas'],
      open: true,
      children: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          link: ['dashboard'],
        },
      ],
    },
    {
      name: 'Administration',
      link: ['.', 'administracao'],
      open: true,
      children: [
        {
          name: 'Resources',
          icon: 'link',
          link: ['recurso'],
        },
        {
          name: 'Users',
          icon: 'account_circle',
          link: ['usuario'],
        },
        {
          name: 'Profiles',
          icon: 'supervisor_account',
          link: ['perfil'],
        },
      ],
    },
    {
      name: 'Configurations',
      link: ['.', 'configuracao'],
      open: true,
      children: [
        {
          name: 'Profile User',
          icon: 'account_balance',
          link: ['usuario_perfil_organizacao'],
        },
      ],
    },
    {
      name: 'Customs Cruds',
      link: ['.', 'cadastros'],
      open: true,
      children: [
        {
          name: 'Business',
          icon: 'business',
          link: ['filial'],
        },
        {
          name: 'Brand',
          icon: 'branding_watermark',
          link: ['brand'],
        },
        {
          name: 'Model',
          icon: 'directions_car',
          link: ['model'],
        },
        {
          name: 'Owner',
          icon: 'person',
          link: ['owner'],
        },
      ],
    },
  ];
}
