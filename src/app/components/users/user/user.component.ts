import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/auth/users.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;
  error = null;
  constructor(
    public actRoute: ActivatedRoute,
    private route: Router,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    let getid = this.actRoute.snapshot.params['id'];
    this.userDetails(getid);
  }

  userDetails(id: any) {
    this.userService.getUser(id).subscribe(
      (res: User[]) => {
        this.user = res;
        console.log(this.user);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }
}
