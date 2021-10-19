const initialState = {
    idUser: 0,
    fullName: "",
    username: "",
    email: "",
    idRole: "",
    isLogin: false,
    idWarehouse: null,
  };
  
  const admins = (state = initialState, { type, payload }) => {
    switch (type) {
      case "ADMIN_LOGIN":
        return { ...state, ...payload, isLogin: true };
      case "ADMIN_CHECK_LOGIN":
      return {...state, ...payload, isLogin: true };
      case "ADMIN_LOGOUT":
        return { ...initialState, isLogin: false };
      case "ADMIN_WAREHOUSE":
        return {...state, idWarehouse:payload}
      default:
        return state;
    }
  };
  
  export default admins;