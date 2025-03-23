import { Component, OnInit } from '@angular/core';
import { AppConstants } from './shared/constants/AppConstants';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'metmuseum-ui';

  ngOnInit(): void {
    localStorage.removeItem(AppConstants.CURRENT_PAGE_NUMBER);
    localStorage.removeItem(AppConstants.ID_QUERY);
    localStorage.removeItem(AppConstants.DEPARTMENT_QUERY);
  }
}
