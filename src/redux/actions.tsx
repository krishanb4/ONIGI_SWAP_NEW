import * as types from "./actionConstants";

interface SetBalanceAction {
  type: typeof types.SET_BALANCE;
  payload: {
    corebalance: number;
    bscbalance: number;
    enterAmount: string;
  };
}

export type BalanceAction = SetBalanceAction;

export const setBalance = (balance: {
  corebalance: number;
  bscbalance: number;
  enterAmount: string;
}): SetBalanceAction => ({
  type: types.SET_BALANCE,
  payload: balance,
});
