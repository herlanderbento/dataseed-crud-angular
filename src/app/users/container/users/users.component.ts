import { Component } from '@angular/core';
import { UserModel } from '../../model/user';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users$: Observable<UserModel[]> | null = null;

  constructor(
    private userServices: UserService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  public refresh(): void {
    this.users$ = this.userServices.list().pipe(
      catchError(() => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  public onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  public async onAdd() {
    await this.router.navigate(['user'], { relativeTo: this.route });
  }

  public async onEdit(user: UserModel) {
    console.log(user);
    await this.router.navigate(['user', user.id], { relativeTo: this.route });
  }

  public onRemove(user: UserModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse usuario?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.userServices.delete(user.id).subscribe({
            next: () => {
              this.refresh();
            },
            error: () => {
              this.onError('Erro ao tentar remover usuario.');
            },
            complete: () => {
              this.snackBar.open('Usuario removido com sucesso!', 'X', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            },
          });
        }
      },
    });
  }
}
