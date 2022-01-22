const initState = {
  showCartBox: false,
  authenticated: false,
};
//ACTION
const SWITCH_CART_BOX = "switch_cart_box";
const switchCartBox = (payload) => {
  return {
    type: SWITCH_CART_BOX,
    payload,
  };
};
const AUTHENTICATED = "authenticated";
const authenticated = (payload) => {
  return {
    type: AUTHENTICATED,
    payload,
  };
};
function reducer(state, action) {
  switch (action.type) {
    case SWITCH_CART_BOX:
      return {
        ...state,
        showCartBox: action.payload,
      };
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload,
      };
    default:
      throw new Error("Invalid action!");
  }
}
export { initState };
export { switchCartBox };
export { authenticated };
export default reducer;
