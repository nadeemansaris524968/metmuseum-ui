import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppConstants } from '../../shared/constants/AppConstants';
import { ArtDepartment } from '../../shared/model/art-department.model';
import { ArtService } from '../../shared/services/art.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnDestroy {
  departments: ArtDepartment[];
  departmentsSub: Subscription;
  idQuery: number;
  titleQuery: string = '';
  departmentIdQuery: number;
  @ViewChild('searchById') searchByIdForm: NgForm;
  @ViewChild('searchByOther') searchByOtherForm: NgForm;

  constructor(private artService: ArtService) {}

  ngOnInit(): void {
    if (localStorage.getItem(AppConstants.ID_QUERY)) {
      this.idQuery = parseInt(localStorage.getItem(AppConstants.ID_QUERY));
    }
    if (localStorage.getItem(AppConstants.DEPARTMENT_QUERY)) {
      const departmentQuery: { title: string; departmentId: string } =
        JSON.parse(localStorage.getItem(AppConstants.DEPARTMENT_QUERY));
      this.titleQuery = departmentQuery.title;
      this.departmentIdQuery = parseInt(departmentQuery.departmentId);
    }
    this.artService.getDepartments();
    this.departmentsSub = this.artService.artDepartmentsChanged.subscribe(
      (data) => {
        this.departments = data;
      }
    );
  }

  onSubmitById(searchByIdForm: NgForm) {
    this.artService.getArtObjectById(searchByIdForm.value.objectID);
    localStorage.setItem(AppConstants.ID_QUERY, searchByIdForm.value.objectID);
    localStorage.removeItem(AppConstants.DEPARTMENT_QUERY);
  }

  onSubmitByOther(searchByOtherForm: NgForm) {
    this.artService.getArtObjectsBySearch(searchByOtherForm.value);
    localStorage.setItem(
      AppConstants.DEPARTMENT_QUERY,
      JSON.stringify(searchByOtherForm.value)
    );
    localStorage.removeItem(AppConstants.ID_QUERY);
  }

  ngOnDestroy(): void {
    this.departmentsSub.unsubscribe();
  }
}
