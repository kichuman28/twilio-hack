import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import signup from "../assets/signup.png";
import InputBoxCustom from "../components/InputBoxCustom";
import PrimaryButton from "../components/PrimaryButton";
//@ts-expect-error No type declaration
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useNavigate } from "react-router-dom";
import { app } from "../utils/Firebase";
import { isFirstLogin, registerUserDetails } from "../utils/FirebaseFunctions";

const MoreDetailsPage = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    country: "",
    weight: "",
    height: "",
    age: "",
  });
  const [Touched, setTouched] = useState({
    fullName: false,
    address: false,
    country: false,
    weight: false,
    height: false,
    age: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };
  const handleMoreDetailsSubmit = () => {
    if (auth.currentUser) {
      registerUserDetails(auth.currentUser.uid, formData).then(() => {
        navigate("/");
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isFirst = await isFirstLogin(user.uid);
        if (!isFirst) {
          navigate("/");
        }
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);
  return (
    <div className="px-4 py-6 sm:px-10 sm:py-10 flex flex-col min-h-screen justify-between lg:max-w-[40%] lg:mx-auto">
      <img src={signup} alt="signup" className="md:w-80 w-44 mx-auto h-auto" />
      <div className="flex flex-col gap-8 sm:gap-16">
        <h2 className="font-bold text-3xl sm:text-5xl w-full sm:w-[75%] leading-snug text-black mx-auto sm:mx-0 text-center sm:text-left">
          We need a few more details to personalize your experience.
        </h2>
        <div className="FormContainer space-y-4 sm:space-y-6">
          <InputBoxCustom
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            type="text"
            error={!formData.fullName && Touched.fullName}
          />
          <InputBoxCustom
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            type="text"
            error={!formData.address && Touched.address}
          />
          <CountrySelect
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: { name: any }) => {
              setFormData((prevData) => ({
                ...prevData,
                country: e.name,
              }));
            }}
            placeHolder="Country of Residence"
          />
          <div className="flex md:flex-col gap-4 flex-1">
            <InputBoxCustom
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (Kg)"
              type="number"
              error={!formData.weight && Touched.weight}
            />
            <InputBoxCustom
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              type="number"
              error={!formData.height && Touched.height}
            />
            <InputBoxCustom
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              type="number"
              error={!formData.age && Touched.age}
            />
          </div>
        </div>
      </div>
      <div className="pt-4 sm:pb-4 w-full sm:w-auto">
        <PrimaryButton
          disabled={
            !formData.fullName ||
            !formData.address ||
            !formData.age ||
            !formData.country ||
            !formData.height ||
            !formData.weight
          }
          label="Continue"
          onClick={handleMoreDetailsSubmit}
        />
      </div>
    </div>
  );
};

export default MoreDetailsPage;
