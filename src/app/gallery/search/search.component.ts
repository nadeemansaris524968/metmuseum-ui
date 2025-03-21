import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private artService: ArtService, private http: HttpClient) {}

  ngOnInit(): void {
    this.artService.getDepartments();
    this.departmentsSub = this.artService.artDepartmentsChanged.subscribe(
      (data) => {
        this.departments = data;
      }
    );
  }

  onSubmit(searchForm: NgForm) {
    console.log(searchForm.value);
  }

  ngOnDestroy(): void {
    this.departmentsSub.unsubscribe();
  }
}
