import axios from "axios";
import { headers, userPrefix } from "../../config";
import { TokenAuthStatus } from "../../config/auth";

const token = headers() || "";

export interface ProfileModel {
  avatarUrl: string;
  facebookUrl: string;
  favGames: string;
  fullName: string;
  instagramUrl: string;
  linkedInUrl: string;
  isVerified: boolean;
  mediumUrl: string;
  telegramUrl: string;
  twitterUrl: string;
  email: string;
  createdOn: string;
  profileCompletetion: number;
}

export enum AvtarUploadStatus {
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UPLOADED = "UPLOADED",
}
export interface APIHandler {
  error: boolean;
  status?: AvtarUploadStatus;
}
export class ProfileService {
  static getProfile = async (
    username: string
  ): Promise<ProfileModel | TokenAuthStatus> => {
    return (await axios.get(`${userPrefix}/get-profile/${username}`, token))
      .data;
  };

  static updateProfile = async (
    body: any
  ): Promise<APIHandler | TokenAuthStatus> => {
    return (await axios.post(`${userPrefix}/update-profile/`, body, token))
      .data;
  };

  static setAvatarUrl = async (
    data: any
  ): Promise<TokenAuthStatus | APIHandler> =>
    await (
      await axios.post(`${userPrefix}/set-avatar-url`, data, token)
    ).data;
}
