import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDectivate } from './can-deactivate-guard.service';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, CanComponentDectivate, OnDestroy {
  alloEdit: boolean = false;
  countNumber: number = 0;
  private firstobsSubscription: Subscription;
  private secondobsSubscription: Subscription;
  constructor(private route: Router, private actRouter: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.navigate(['../'], { relativeTo: this.actRouter });

    //Observable count
    this.firstobsSubscription = interval(1000).subscribe((count) => {
      this.countNumber = count;
      console.log(this.countNumber);
    });
    // Building a Custom Observable
    const customIntervalObservable = Observable.create((observer: any) => {
      let numberCount = 0;
      setInterval(() => {
        observer.next(numberCount);
        //Complete
        if (numberCount === 2) {
          observer.complete();
        }
        //Error
        if (numberCount > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        numberCount++;
      }, 1000);
    });
    // Call Custom Observable
    this.secondobsSubscription = customIntervalObservable.subscribe(
      (data: any) => {
        console.log('Custome observable ' + data);
      },
      (error: any) => {
        console.log(error);
        alert(error);
      },
      () => {
        console.log('Completed!');
      }
    );
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
  ngOnDestroy(): void {
    //Observable count destroy
    this.firstobsSubscription.unsubscribe();
    this.secondobsSubscription.unsubscribe();
  }
}
