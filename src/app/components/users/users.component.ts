import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/auth/users.service';
import { User } from '../../interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  error = null;
  getMessage: string = '';
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.allUserList();
    // this.getMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe((data) => {
      this.getMessage = data['message'];
    });
  }

  allUserList() {
    this.userService.getAlluser().subscribe(
      (res: User[]) => {
        this.users = res;
        console.log(this.users);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }
  removeUser(id: any) {
    alert('Are want remove or delete user');
    this.userService.deleteUser(id).subscribe(
      (res) => {
        console.log('User Delete Succussfully!');
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }
  onLogin() {
    this.authService.login();
  }
  logOut() {
    this.authService.logout();
  }
}
