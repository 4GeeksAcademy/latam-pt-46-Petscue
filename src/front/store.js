export const initialStore = () => {
  return {
    users: [],
    token: localStorage.getItem("token") || "",
    user: null,
    favorites: [],
    filters: { age: "", breed: "" },
    showFavorites: false,
    role: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGUP":
      return {
        ...store,
        users: [...store.users, action.payload],
      };
    case "LOGIN":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return { ...store, token: "", user: null };

    case "SET_FAVORITES":
      return {
        ...store,
        favorites: action.payload,
      };

    case "TOGGLE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.includes(action.payload)
          ? store.favorites.filter((id) => id !== action.payload)
          : [...store.favorites, action.payload],
      };

    case "SET_FILTERS":
      return {
        ...store,
        filters: action.payload,
      };

    case "SET_ROLE":
      return {
        ...store,
        role: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
