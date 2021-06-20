import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@maa/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'hb-admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId: number;
  roles = [
    {
      id: 100,
      title: 'Root',
    },
    {
      id: 101,
      title: 'Admin',
    },
    {
      id: 102,
      title: 'Customer',
    },
  ];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: [null, Validators.required],
      role_id: [null, Validators.required],
    });
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.full_name} is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!',
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.full_name.setValue(user.full_name);
          this.userForm.email.setValue(user.email);
          this.userForm.contact.setValue(user.contact);
          this.userForm.role_id.setValue(user.role_id);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      full_name: this.userForm.full_name.value,
      email: this.userForm.email.value,
      contact: this.userForm.contact.value,
      role_id: this.userForm.role_id.value,
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancle() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }
}
