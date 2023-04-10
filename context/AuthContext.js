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
  const [userID, setUserID] = useState(null);

  const registerUser = async (email, name, password) => {
    setIsLoading(true);
    try {
      const data = { "email": email, "name" : name, "password": password };
      const response = await axios.post(`${BASE_URL}/register`, data);
      console.log(`response: ${response.data}`);
      setUserInfo(response.data.user);
      setUserID(response.data.user_id);
      setUserToken(response.data.token);
      console.log(`token: ${response.data.token}`);
      AsyncStorage.setItem("userToken", response.data.token);
      AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user));
      AsyncStorage.setItem("userID", JSON.stringify(response.data.user_id));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    console.log("Starting Login");
    const data = "";

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/login`,
      headers: { 
        'Authorization': 'Basic '+ encode(email + ':' + password)
      },
      data : data
    };
    await axios.request(config)
    .then((response) => {
      setUserInfo(response.data.user);
      setUserID(response.data.user_id);
      setUserToken(response.data.token);
      AsyncStorage.setItem("userToken", response.data.token);
      AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user));
      AsyncStorage.setItem("userID", JSON.stringify(response.data.user_id));
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
    console.log(`ID: ${userID}`);
  };
  const logout = () => {
    console.log('Logging out...');
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userID");
    setIsLoading(false);
    console.log('Logged out...');
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userID = await AsyncStorage.getItem("userID");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
        setUserID(userID);
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
    <AuthContext.Provider value={{ registerUser, login, logout, userToken, userInfo, userID }}>
      {children}
    </AuthContext.Provider>
  );
};
