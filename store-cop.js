//

import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  lone: 0,
  lonePurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

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

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// store.dispatch({
//   type: "account/requestLone",
//   payload: { amount: 1000, purpose: "Buy a cheap Car." },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLone" });

// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLone(amount, purpose) {
  return {
    type: "account/requestLone",
    payload: { amount, purpose },
  };
}
function payLone() {
  return { type: "account/payLone" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLone(1000, "Buy a cheap Car"));
console.log(store.getState());

store.dispatch(payLone());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("Sandeep Prajapati", 1452451));
console.log(store.getState());
