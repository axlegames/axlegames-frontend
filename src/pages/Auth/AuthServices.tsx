import axios from "axios";
import { userPrefix, headers } from "../../config";

export class AuthServices {
  static register = async (data: any) =>
    await axios.post(`${userPrefix}/register`, data);

  static login = async (data: any) =>
    await axios.post(`${userPrefix}/login`, data);

  static loginGoogle = async (data: any) =>
    await axios.post(`${userPrefix}/google-login`, data);

  static forgotPasswordRequest = async (data: any) =>
    await axios.post(`${userPrefix}/forgot-password/request`, data);

  static changePasswordRequest = async (data: any, params: any) =>
    await axios.post(`${userPrefix}/change-password/${params}`, data);

  static validateToken = async (params: any) =>
    await axios.post(`${userPrefix}/validate/${params}`);

  static createSession = (data: any) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("session", new Date(Date.now()).toString());
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("name", data.name);
  };

  static setWalletAddress = async (data: any) =>
    await axios.post(`${userPrefix}/set-wallet-address`, data, headers());
}
