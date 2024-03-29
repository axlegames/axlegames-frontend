import env from "react-dotenv";

const SERVER = env.IS_DEV_SERVER || "";
let URL = "https://api.axle.games";
if (SERVER) URL = "https://api.axle.games";

console.log(SERVER);

const axlegamesPrefix = URL + "/axlegames/api/v1/";
const userPrefix = axlegamesPrefix + "users";
const gamePrefix = axlegamesPrefix + "games";
const referralPrefix = axlegamesPrefix + "referrals";

const guestPrefix = axlegamesPrefix + "guest";

const headers = () => {
  return {
    headers: { Authorization: localStorage.getItem("accessToken") ?? "" },
  };
};

export {
  URL,
  headers,
  userPrefix,
  axlegamesPrefix,
  guestPrefix,
  gamePrefix,
  referralPrefix,
};
