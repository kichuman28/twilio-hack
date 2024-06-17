import { ChangeEvent, useEffect, useState } from "react";
import InputBoxCustom from "../components/InputBoxCustom";
import PrimaryButton from "../components/PrimaryButton";
import { handleRegistration } from "../utils/FirebaseFunctions";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/Firebase";

const SignupPage = () => {
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
    phone: "",
  });
  const [Error, setError] = useState<string | null>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignup = async () => {
    handleRegistration(FormData)
      .then(() => {
        setError(null);
        navigate("/otp-verify", { state: { phone: FormData.phone } });
      })
      .catch((error) => {
        error.message.split(": ")[1]
          ? setError(error.message.split(": ")[1])
          : setError(error.message);
      });
  };
  return (
    <div className="px-10 py-10 flex flex-col h-screen justify-between lg:max-w-[40%] lg:mx-auto">
      <div className="flex gap-16 flex-col">
        <h2 className="font-bold text-5xl w-[75%] leading-snug text-black">
          Hola, Create an Account
        </h2>
        <div className="FormContainer">
          <InputBoxCustom
            name="email"
            value={FormData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            error={false}
          />
          <InputBoxCustom
            name="phone"
            value={FormData.phone}
            onChange={handleChange}
            placeholder="Phone No. (With Country Code)"
            type="number"
            error={false}
          />
          <InputBoxCustom
            name="password"
            value={FormData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            error={false}
          />
          <p className="font-bold text-red-600">{Error}</p>
        </div>
      </div>
      <div>
        <p className="text-center underline my-1">
          Already got an account? sign in
        </p>
        <PrimaryButton
          disabled={!FormData.email || !FormData.password || !FormData.phone}
          label="Sign up"
          onClick={handleSignup}
        />
      </div>
    </div>
  );
};

export default SignupPage;
