import { CanActivateFn } from '@angular/router';




function canActivate() {
  throw new Error('Function not implemented.');
}
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
