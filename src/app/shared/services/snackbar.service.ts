import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable()
export class SnackbarService{

  constructor(private snackBar: MatSnackBar){}

  success(title: any) {
    this.snackBar.open(title, "", {
      duration: 3000,
      panelClass: 'snackbar-success'
    });
  }
  info(title: any) {
    this.snackBar.open(title, '', {
      duration: 3000,
      panelClass: 'snackbar-info'
    });
  }
  warning(title: any) {
    this.snackBar.open(title, "Dismiss", {
      duration: 3000,
      panelClass: 'snackbar-warning'
    });
  }
  error(title: any) {
    this.snackBar.open(title, "Dismiss", {
      duration: 3000,
      panelClass: 'snackbar-error'
    });
  }
  wait(title: any) {
    this.snackBar.open(title, "Dismiss", {
      duration: 3000,
      panelClass: 'snackbar-wait'
    });
  }
}
