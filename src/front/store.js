export const initialStore = () => {
  return {
    token: localStorage.getItem("token") || "",
    user: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return { ...store, token: "", user: null };

    default:
      throw Error("Unknown action.");
  }
}
