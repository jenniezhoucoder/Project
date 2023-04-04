import React, { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";

import api from "../../api/loginApi";

import Login from "../login";
import Logout from "../logout";
import HireForm from "../form/";

import "antd/dist/antd.css";

function Home() {
  const [isLoggdIn, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await api.getCustomerApi();
        if (response.status === StatusCodes.OK) {
          setIsLoggedin(true);
          setIsLoading(false);
        } else if (response.status === StatusCodes.UNAUTHORIZED) {
          setIsLoggedin(false);
          setIsLoading(false);
        } else {
          // throw new Error(
          //   `Get customer API response status error: ${response.status}`
          // );
          setHasError(true);
        }
      } catch (error) {
        // throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
        setHasError(true);
      }
    }
    getCustomer();
  }, []);

  if (hasError) {
    return <p>Error detail</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isLoggdIn ? (
        <Logout handleLogout={() => setIsLoggedin(false)} />
      ) : (
        <Login handleLogin={() => setIsLoggedin(true)} />
      )}
      <HireForm />
    </>
  );
}

export default Home;
