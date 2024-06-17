import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { app } from "../utils/Firebase";

type Props = { children: JSX.Element };

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
