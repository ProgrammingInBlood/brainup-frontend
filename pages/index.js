import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard";
import HomePage from "../components/HomePage";

function Home() {
  const checkAuth = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  return checkAuth ? <Dashboard /> : <HomePage />;
}

export default Home;
