import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'EveryMatrix_NavBar';
  navBarBackground: HTMLElement | null = null;
  selectedIdOfBU: string = 'emBU';
  isIconSelectorToggled: boolean = false;
  isFooterDetailsToggled: boolean = false;
  listOfBu: Array<any> = [
    {id: 'emBU'},
    {id: 'gmBU'}
  ];

  listOfMenus: Record<string, Menu> = {
    player: {
      title: "Player",
      icon: "player",
      submenus: {
        stats: {
          title: "Stats",
          url: "/player/stats",
        },
        settings: {
          title: "Settings",
          url: "/player/settings",
        },
        random: {
          title: "random",
          url: "/player/settings",
        },  
      },
      isOpen: false,
    },
    dashboard: {
      title: "Dashboard",
      icon: "dashboard",
      submenus: {
        overview: {
          title: "Overview",
          url: "/dashboard/overview",
        },
        reports: {
          title: "Reports",
          url: "/dashboard/reports",
        },
      },
      isOpen: false,
    },
  };

  listOfMenusArray = Object.entries(this.listOfMenus);

  highlightStyle = {
    top: '-100px',
    left: '0px',
    width: '0px',
    height: '0px',
    opacity: '0'
  };

  onHover(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const targetRect = target.getBoundingClientRect();

    // Get the parent container
    const parent = document.querySelector('.menu-items-container') as HTMLElement;
    const parentRect = parent.getBoundingClientRect();

    // Calculate position relative to the parent container
    const relativeTop = targetRect.top - parentRect.top;
    const relativeLeft = targetRect.left - parentRect.left;

    this.highlightStyle = {
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
      top: `${relativeTop}px`,
      left: `${relativeLeft}px`,
      opacity: '1'
    };
  }

  // Optionally handle mouse leave
  onLeave(): void {
    this.highlightStyle.top = '-100px';
    this.highlightStyle.opacity = '0';
  }

  ngAfterViewInit(): void {
    // Ensure this runs after the view is fully initialized
    this.navBarBackground = document.querySelector('.nav-bar-background');
    this.navBarBackground?.classList.add('emBackground');
  }

  toggleGamMatrix(selectedBu: string): void { 
    this.isIconSelectorToggled = false;
    this.selectedIdOfBU = this.listOfBu.find((unit: any) => unit.id === selectedBu).id;
  
    switch (this.selectedIdOfBU) {
      case 'emBU':
        this.navBarBackground?.classList.add('emBackground');
        break;
      case 'gmBU':
        this.navBarBackground?.classList.add('gmBackground');
        break;
      default:
        this.navBarBackground?.classList.add('defaultBackground');
        break;
    }
  }

  toggleIconsSelector(): void {
    this.selectedIdOfBU = '';

    if (this.navBarBackground?.classList.contains('emBackground')) {
      this.navBarBackground?.classList.remove('emBackground');
    }
    if (this.navBarBackground?.classList.contains('gmBackground')) {
      this.navBarBackground?.classList.remove('gmBackground');
    }

    this.isIconSelectorToggled = !this.isIconSelectorToggled;
  }

  toggleSubmenu(index: number) {
    this.listOfMenusArray.forEach((menu, i) => {
      if (i !== index) {
        menu[1].isOpen = false;
      }
    });
  
    this.listOfMenusArray[index][1].isOpen = !this.listOfMenusArray[index][1].isOpen;
  }

  toggleFooterContent() {
    this.isFooterDetailsToggled = !this.isFooterDetailsToggled;
  }

}

interface Submenu {
  title: string;
  url: string;
}

interface Menu {
  title: string;
  icon: string;
  submenus: Record<string, Submenu>;
  isOpen: boolean;
}
