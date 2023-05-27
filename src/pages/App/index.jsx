import { useContext } from "react";

import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import {
  ShoppingCartContext,
  ShoppingCartProvider,
  initializeLocalStorage,
} from "../../contexts";

import { Home } from "../Home";
import { MyAccount } from "../MyAccount";
import { MyOrders } from "../MyOrders";
import { MyOrder } from "../MyOrder";
import { SignIn } from "../SignIn";
import { NotFound } from "../NotFound";
import { Navbar } from "../../components/NavBar";
import { CheckoutSideMenu } from "../../components/CheckoutSideMenu";

import "./App.css";

const AppRoutes = () => {
  const { account, signOut } = useContext(ShoppingCartContext);
  // Account
  const localAccount = localStorage.getItem("account");
  const parsedAccount = JSON.parse(localAccount);
  // Sign Out
  const sign_Out = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(sign_Out);
  // Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = Object.keys(account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = signOut || parsedSignOut;

  let routes = useRoutes([
    {
      path: "/",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/:category",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

function App() {
  initializeLocalStorage();
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
