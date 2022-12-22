import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  userId: any;
  user: any;
  updateUserFormGroup: UntypedFormGroup;
  constructor(private toastrService: ToastrService, private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.authService.setCurrentUserId();
    this.userId = this.authService.getCurrentUserId();
    this.getUserData();
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateUserFormGroup = this.formBuilder.group({
      userId: [this.userId],
      firstName: [Validators.required],
      lastName: [Validators.required],
      username: [Validators.required],
      email: [Validators.required],
      password: [Validators.required],
    })
  }
  getUserData() {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    })
  }

  update() {
    if (this.updateUserFormGroup.valid) {
      let updateModel = Object.assign({}, this.updateUserFormGroup.value);
      this.userService.updateUser(updateModel).subscribe((data) => {
        this.toastrService.success('User updated successfully', 'Success');
      }, (err) => {
        console.log(err)
        if (err.error.errors) {
          var keys = Object.keys(err.error.errors);
          for (let i = 0; i < keys.length; i++) {
            this.toastrService.error(err.error.errors[keys[i]], 'Error');
          }
        }
      })
  }
  }
}
