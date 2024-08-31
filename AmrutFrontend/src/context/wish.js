import { useState, useContext, createContext, useEffect } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let existingWishlistItems = localStorage.getItem('wishlist');
    if (existingWishlistItems) setWishlist(JSON.parse(existingWishlistItems));
  }, []);

  return (
    <WishlistContext.Provider value={[wishlist, setWishlist]}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook
const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };
