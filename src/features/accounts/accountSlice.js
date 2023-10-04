//import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  lone: 0,
  lonePurpose: "",
  isLoading: false,
};

/*
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLone(state, action) {
      if (state.lone > 0) return;
      state.lone = action.payload.amount;
      state.lonePurpose = action.payload.purpose;
      state.balance = state.balance + action.payload.amount;
    },
    payLone(state, action) {
      state.lone = 0;
      state.lonePurpose = "";
      state.balance -= state.lone;
    },
  },
});

export const { deposit, withdraw, requestLone, payLone } = accountSlice.actions;
export default accountSlice.reducer;

*/
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLone":
      if (state.lone > 0) return state;
      return {
        ...state,
        lone: action.payload.amount,
        lonePurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLone":
      return {
        ...state,
        lone: 0,
        lonePurpose: "",
        balance: state.balance - state.lone,
      };

    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/conertingCurrency" });
    //API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;
    // return action

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLone(amount, purpose) {
  return {
    type: "account/requestLone",
    payload: { amount, purpose },
  };
}
export function payLone() {
  return { type: "account/payLone" };
}
