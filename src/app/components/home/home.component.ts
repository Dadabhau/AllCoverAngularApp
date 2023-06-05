import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDectivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, CanComponentDectivate {
  alloEdit: boolean = false;
  constructor(private route: Router, private actRouter: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.navigate(['../'], { relativeTo: this.actRouter });
  }
  changeRoute() {
    this.alloEdit = true;
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.alloEdit) {
      return false;
    }
    if (this.alloEdit === true) {
      return confirm('Do you want to discard the changes?');
    } else {
      return false;
    }
  }
}
