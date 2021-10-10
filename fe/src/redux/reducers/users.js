const initialState = {
  idUser: 0,
  fullName: "",
  username: "",
  email: "",
  idRole: "",
};

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN":
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default users;
