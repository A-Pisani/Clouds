import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util"

export interface User {
  uid : string;
  displayName: string;
  email: string;
  editor: boolean;
  //this data will be collected once the user signs-in with Google
}
