let SERVER = "PROD";
let URL = "";

if (SERVER === "DEV") URL = "http://localhost:5000";
if (SERVER === "PROD") URL = "http://3.6.78.139:5000";

const axlegamesPrefix = URL + "/axlegames/api/v1/";
const userPrefix = axlegamesPrefix + "users";
const gamePrefix = axlegamesPrefix + "games";

const headers = () => {
  return {
    headers: { Authorization: localStorage.getItem("accessToken") ?? "" },
  };
};

export { URL, headers, userPrefix, axlegamesPrefix, gamePrefix };
