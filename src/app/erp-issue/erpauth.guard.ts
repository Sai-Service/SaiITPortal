import { inject } from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';


export const erpauthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const role =sessionStorage.getItem('role');

    if(role != null){
      return true;
    }
    else{
      router.navigateByUrl('/logincommonerp')
      return false;
    }
};
