import { UserStateType } from "../../types";

export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';

const submitLoginActionCreator = (email: string) => ({
  type: SUBMIT_LOGIN_FORM,
  payload: email,
})

export {submitLoginActionCreator};