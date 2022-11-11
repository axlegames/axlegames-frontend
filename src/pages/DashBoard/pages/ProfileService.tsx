import axios from "axios";
import { userPrefix } from "../../../config";

export class ProfileService {
  static getProfile = async (username: string) => {
    return axios.get(`${userPrefix}/get-profile/${username}`);
  };

  static updateProfile = async (body: any) => {
    return axios.post(`${userPrefix}/update-profile/`, body);
  };

  static setAvatarUrl = async (data: any) =>
    await axios.post(`${userPrefix}/set-avatar-url`, data);
}
