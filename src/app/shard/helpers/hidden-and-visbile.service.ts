import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HiddenAndVisbileService {
  constructor() { }
  HiddenAndVisible(...args: any) {
    const elmentOne = document.getElementById(args[0].index) as HTMLElement
    // for hidden and visbale
    if (elmentOne.style.display == 'none') {
      elmentOne.style.display = args[0].display
      //if found  elment two
      if (args[0].indexTwo) {
        const elementTwo = document.getElementById(args[0].indexTwo) as HTMLElement
        elementTwo.style.display = 'none'
      }
      //if the prams found will make change for icons
      if (args[0].indexIconOne && args[0].indexIconTwo) {
        const elmentAngleRight = document.getElementById(args[0].indexIconOne) as HTMLElement
        elmentAngleRight.style.display = "none"
        const elmentAngleUp = document.getElementById(args[0].indexIconTwo) as HTMLElement
        elmentAngleUp.style.display = "inline-block"

      }
    } else {
      elmentOne.style.display = "none"
      //if found  elment two
      if (args[0].indexTwo) {
        const elementTwo = document.getElementById(args[0].indexTwo) as HTMLElement
        elementTwo.style.display = args[0].display
      }
      //if the prams found will make change for icons
      if (args[0].indexIconOne && args[0].indexIconTwo) {
        const elmentAngleRight = document.getElementById(args[0].indexIconOne) as HTMLElement
        elmentAngleRight.style.display = "inline-block"
        const elmentAngleUp = document.getElementById(args[0].indexIconTwo) as HTMLElement
        elmentAngleUp.style.display = "none"

      }
    }
  }

}
