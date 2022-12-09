import {Action, Selector, State, StateContext} from "@ngxs/store";
import {SecurityStateModel} from "./securityStateModel";
import {Injectable} from "@angular/core";
import {DeleteJWT, SaveJWT} from "../actions/securityAction";

@State<SecurityStateModel>({
  name: 'security',
  defaults: {
    jwt: undefined
  }
})
@Injectable()
export class SecurityState {
  @Selector()
  static isSignin(state: SecurityStateModel) {
    return state.jwt != undefined;
  }
  @Selector()
  static getJWT(state: SecurityStateModel) {
    return state.jwt;
  }

  @Action(SaveJWT)
  add({ setState }: StateContext<SecurityStateModel>, { payload }: SaveJWT) {
    setState({
     jwt: payload
    });
  }

  @Action(DeleteJWT)
  delete({ setState }: StateContext<SecurityStateModel>) {
    setState({
      jwt: undefined
    });
  }
}
