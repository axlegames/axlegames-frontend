import { FC } from "react";
import { Navigate } from "react-router-dom";

interface PropType {
  element: React.FC;
  isAuth: boolean;
}

const PrivateRoute: FC<PropType> = (props) => {
  if (props.isAuth) return <props.element />;
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
