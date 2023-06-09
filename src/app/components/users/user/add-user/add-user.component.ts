import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/auth/users.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  error: string;
  hobbies: ['Learn Code'];
  addUserForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService) {}
  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        zipcode: ['', Validators.required],
        geolocation: this.fb.group({
          lat: ['', Validators.required],
          long: ['', Validators.required],
        }),
      }),
      phone: ['', Validators.required],
      hobbies: this.fb.array([]),
    });
    setTimeout(() => {
      this.addUserForm.setValue({
        email: 'dadasthete@gmail.com',
        username: 'dadabhau',
        password: 'test@123',
        name: {
          firstname: 'Dadabhau',
          lastname: 'Thete',
        },
        address: {
          city: 'Pune',
          street: 'Laxminagar',
          number: '1234567890',
          zipcode: '12345',
          geolocation: {
            lat: '2475876585685',
            long: '98798657868',
          },
        },
        phone: '43758437675685',
        hobbies: '',
      });
    });
    this.addUserForm.patchValue({
      email: 'dadasthete987@gmail.com',
      username: 'dada',
      password: 'test@12356',
    });
  }
  get myArray(): FormArray {
    return this.addUserForm.get('hobbies') as FormArray;
  }
  addArrayElement() {
    const arrayElement = this.fb.group({
      // Define form controls inside the array element
      // Example:
      hobbies: ['', Validators.required],
    });

    this.myArray.push(arrayElement);
  }

  removeArrayElement(index: number) {
    this.myArray.removeAt(index);
  }
  submitForm() {
    const user: User[] = this.addUserForm.value;
    console.log(user);
    this.userService.addUser(user).subscribe(
      (res) => {
        console.log(res);
        alert('Data Saved!' + JSON.stringify(res));
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
    this.addUserForm.reset();
  }
}
