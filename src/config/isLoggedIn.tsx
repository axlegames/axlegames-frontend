const IsLoggedIn = (props: any) => {
  if (localStorage.getItem("userId")) return props.children;
  return null;
};

export default IsLoggedIn;
