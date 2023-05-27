import { createContext, useState, useEffect } from "react";

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem("account");
  const signOutInLocalStorage = localStorage.getItem("sign-out");

  let parsedAccount;
  let parsedSignOut;

  if (!accountInLocalStorage) {
    localStorage.setItem("account", JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false));
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
};

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {

  // My account
  const [account, setAccount] = useState({})

  // Sign out
  const [signOut, setSignOut] = useState(false)
  
  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart · Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByTitle.length > 0) {
      setFilteredItems(filteredItemsByTitle(items, searchByTitle));
    } else {
      setFilteredItems(items);
    }
  }, [items, searchByTitle]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        account,
        setAccount,
        signOut,
        setSignOut,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
