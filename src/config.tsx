const SERVER = process.env.IS_DEV_SERVER;
let URL = "";

if (SERVER === "true") URL = "http://localhost:5001";
if (SERVER !== "false") URL = "https://api.axlegames.io";

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
