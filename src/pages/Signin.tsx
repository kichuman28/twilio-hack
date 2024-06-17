import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBoxCustom from "../components/InputBoxCustom";
import PrimaryButton from "../components/PrimaryButton";
import { app } from "../utils/Firebase";
import { handleLogin } from "../utils/FirebaseFunctions";

const SigninPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignin = async () => {
    try {
      await handleLogin(FormData);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.message?.split(": ")[1] || error.message;
      setError(errorMessage);
    }
  };
  return (
    <div className="px-10 py-10 flex flex-col h-screen justify-between lg:max-w-[40%] lg:mx-auto">
      <div className="flex gap-16 flex-col">
        <h2 className="font-bold text-5xl w-[75%] leading-snug text-black">
          Welcome back! Let's continue your goals.
        </h2>
        <div className="FormContainer">
          <InputBoxCustom
            name="email"
            value={FormData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            error={!!Error}
          />
          <InputBoxCustom
            name="password"
            value={FormData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            error={!!Error}
          />
          {Error && <p className="font-bold text-red-600">{Error}</p>}
        </div>
      </div>
      <div>
        <p className="text-center underline my-1">
          New to Platform? Create an account
        </p>
        <PrimaryButton
          disabled={!FormData.email || !FormData.password}
          label="Sign in"
          onClick={handleSignin}
        />
      </div>
    </div>
  );
};

export default SigninPage;
