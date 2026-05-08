import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveLoginData = () => {
    try {
      const encodedToken = localStorage.getItem("token");
      if (encodedToken) {
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
      }
    } catch (error) {
      console.error("Invalid Token", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginData, setLoginData, saveLoginData, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
