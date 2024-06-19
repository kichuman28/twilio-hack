import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { app } from "../utils/Firebase";
import { isFirstLogin } from "../utils/FirebaseFunctions";

const ProtectedRoute: React.FC = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstLogin, setFirstLogin] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const isFirst = await isFirstLogin(user.uid);
        setFirstLogin(isFirst);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/signin");
  }

  if (user && firstLogin === true) {
    navigate("/more-details");
  }

  return <Outlet />;
};

export default ProtectedRoute;
