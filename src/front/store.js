export const initialStore = () => {
  return {
    users: [],
    token: localStorage.getItem("token") || "",
    user: null,
    favorites: [],
    filters: { age: "", breed: "" },
    role: null,
    currentPet: null,
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
      const id = action.payload;
      const isFavorite = store.favorites.includes(id);
      return {
        ...store,
        favorites: isFavorite
          ? store.favorites.filter((favId) => favId !== id)
          : [...store.favorites, id],
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
    
    case "SET_CURRENT_PET":
      return{
        ...store,
        currentPet: action.payload
      }

    default:
      throw Error("Unknown action.");
  }
}
