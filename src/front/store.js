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

    case "TOGGLE_FAVORITE":
      const id = action.payload;
      const isFavorite = store.favorites.includes(id);
      return {
        ...store,
        favorites: isFavorite
          ? store.favorites.filter((fav) => fav !== id)
          : [...store.favorites, id],
      };

    case "SET_FILTERS":
      return {
        ...store,
        filters: action.payload,
      };

    case "SET_SHOW_FAVORITES":
      return {
        ...store,
        showFavorites: action.payload,
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
