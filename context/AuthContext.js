import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./../config";
import { encode } from 'base-64';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    console.log("Starting Login");
    const data = "";

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://52.49.73.0/login',
      headers: { 
        'Authorization': 'Basic '+ encode(email + ':' + password)
      },
      data : data
    };
    console.log(config);
    axios.request(config)
    .then((response) => {
      setUserInfo(response.data);
      setUserToken(response.data.token);
      AsyncStorage.setItem("userToken", response.data.token);
      AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
    console.log(`info: ${JSON.stringify(userInfo)}`);
    console.log(`token: ${userToken}`);
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
