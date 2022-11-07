let SERVER = "DEV";
let URL = "";

if (SERVER === "DEV") URL = "http://localhost:5000";
if (SERVER === "PROD") URL = "https://api.axlegames.io";

const axlegamesPrefix = URL + "/axlegames/api/v1/";
const userPrefix = axlegamesPrefix + "users";
const gamePrefix = axlegamesPrefix + "games";

const headers = () => {
  return {
    headers: { Authorization: localStorage.getItem("accessToken") ?? "" },
  };
};

export { URL, headers, userPrefix, axlegamesPrefix, gamePrefix };
