const IsNotLoggedIn = (props: any) => {
  if (localStorage.getItem("userId")) return null;
  return props.children;
};

export default IsNotLoggedIn;
