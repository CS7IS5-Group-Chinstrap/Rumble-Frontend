import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    console.log("Starting Login")
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/login`, { "email" : email, "password" : password },
      {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        }
      })
      .then((res) => {
        console.log(`login sent`)
        console.log(res.data);
        let user = res.data;
        setUserInfo(user);
        setUserToken(user.data.token);
        AsyncStorage.setItem("userToken", user.data.token);
        AsyncStorage.setItem("userInfo", JSON.stringify(user));
        console.log("successful log-in")
      })
      .catch((err) => {
        console.log("ERROR")
        console.log(err.config.headers);
        console.log(err);
        
      })
    setIsLoading(false);
    console.log("login process")
  };
  const logout = () => {
    console.log('Logging out...');
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
    console.log('Logged out...');
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ login, logout, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
