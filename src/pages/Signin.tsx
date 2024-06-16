import { ChangeEvent, useState } from "react";
import InputBoxCustom from "../components/InputBoxCustom";
import PrimaryButton from "../components/PrimaryButton";
import { handleLogin } from "../utils/FirebaseFunctions";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignin = async () => {
    handleLogin(FormData)
      .then(() => {
        navigate("/");
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
          Welcome back! Let's continue your goals.{" "}
        </h2>
        <div className="FormContainer">
          <InputBoxCustom
            name="email"
            value={FormData.email}
            onChange={handleChange}
            placeholder="Email"
            type="text"
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
          New to Platform? Create an account{" "}
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
