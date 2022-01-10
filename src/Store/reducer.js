const initState = {
  showCartBox: false,
};
//ACTION
const SWITCH_CART_BOX = "switch_cart_box";
const switchCartBox = (payload) => {
  return {
    type: SWITCH_CART_BOX,
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
    default:
      throw new Error("Invalid action!");
  }
}
export { initState };
export { switchCartBox };
export default reducer;
