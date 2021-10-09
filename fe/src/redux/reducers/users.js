const initialState = {
  idUser: 0,
  fullName: "",
  username: "",
  email: "",
  idRole: "",
  isLogin: false,
};

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN":
      return { ...state, ...payload };
    case "USER_CHECK_LOGIN":
      return { ...state, isLogin: true };
    case "USER_LOGOUT":
      return { initialState, isLogin: false };
    default:
      return state;
  }
};

export default users;
