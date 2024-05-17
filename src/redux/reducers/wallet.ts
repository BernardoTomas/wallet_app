import { WalletActionType, WalletStateType } from "../../types"

const INITIAL_STATE= {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
}

const walletReducer = (state: WalletStateType  = INITIAL_STATE, action: WalletActionType) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default walletReducer;