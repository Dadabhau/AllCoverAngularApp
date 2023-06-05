import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/auth/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  getId: any;
  error = null;
  editUserForm: User = new User();
  @ViewChild('userEditForm') editForm!: NgForm;
  constructor(
    private userService: UsersService,
    public actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getId = this.actRoute.snapshot.params['id'];
    console.log(this.getId);
    this.userDetails(this.getId);
  }
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  userDetails(id: any) {
    this.userService.getUser(id).subscribe((res: any) => {
      var resultData = res;
      console.log(resultData);
      if (resultData) {
        this.editUserForm.id = resultData.id;
        this.editUserForm.email = resultData.email;
        this.editUserForm.username = resultData.username;
        this.editUserForm.password = resultData.password;
        this.editUserForm.firstname = resultData.name.firstname;
        this.editUserForm.lastname = resultData.name.lastname;
        this.editUserForm.city = resultData.address.city;
        this.editUserForm.street = resultData.address.street;
        this.editUserForm.number = resultData.address.number;
        this.editUserForm.zipcode = resultData.address.zipcode;
        this.editUserForm.lat = resultData.address.geolocation.lat;
        this.editUserForm.long = resultData.address.geolocation.long;
        this.editUserForm.phone = resultData.phone;
      }
    });
  }

  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.valid) {
      this.userService.updateUser(this.getId, this.editForm.value).subscribe(
        (res) => {
          console.log('Data Saved!');
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      );
    }
  }
}
