import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/stroe";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  component: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
  if (!user) {
    navigate("/login");
  }
  return <>{user && component}</>;
};

export default PrivateRoute;
 