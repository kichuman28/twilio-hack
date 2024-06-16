import InputBoxCustom from "../components/InputBoxCustom";
import PrimaryButton from "../components/PrimaryButton";

const FamilyIdPage = () => {
  return (
    <div className="px-10 py-10 flex flex-col h-screen justify-between lg:max-w-[40%] lg:mx-auto">
      <div className="flex gap-16 flex-col">
        <h2 className="font-bold text-5xl w-[75%] leading-snug text-black">
          Welcome back! Let's continue your goals.{" "}
        </h2>
        <div className="FormContainer">
          <InputBoxCustom
            name="Email"
            value={""}
            onChange={() => {}}
            placeholder="Email"
            type="text"
            error={false}
          />
          <InputBoxCustom
            name="Password"
            value={""}
            onChange={() => {}}
            placeholder="Password"
            type="password"
            error={false}
          />
        </div>
      </div>
      <div>
        <p className="text-center underline my-1">
          New to Platform? Create an account{" "}
        </p>
        <PrimaryButton label="Sign in" onClick={() => {}} />
      </div>
    </div>
  );
};

export default FamilyIdPage;
