import { useState } from "react";
import OTPInput from "react-otp-input";
import PrimaryButton from "../components/PrimaryButton";

const OTPVerifyPage = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="px-10 py-10 flex flex-col h-screen justify-between lg:max-w-[40%] lg:mx-auto">
      <div className="flex gap-16 flex-col">
        <h2 className="font-bold text-5xl w-[75%] leading-snug text-black">
          Verify your OTP{" "}
        </h2>
        <p>An OTP has sent to your mobile number, enter your otp to proceed</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          containerStyle={"flex justify-center"}
          skipDefaultStyles
          inputStyle={
            "border-slate-800 border-opacity-10 border-2 rounded-md bg-secondary py-8 mx-2 w-16 text-black text-center"
          }
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div>
        <PrimaryButton label="Continue" onClick={() => {}} />
      </div>
    </div>
  );
};

export default OTPVerifyPage;
