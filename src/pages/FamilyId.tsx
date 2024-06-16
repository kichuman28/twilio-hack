import { useState, ChangeEvent } from "react";
import InputBoxCustom from "../components/InputBoxCustom";
import PrimaryButton from "../components/PrimaryButton";
import family from '../assets/family.png';

const FamilyIdPage = () => {
  const [formData, setFormData] = useState({
    familyid: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="px-4 sm:px-10 flex flex-col min-h-screen justify-evenly lg:max-w-[40%] lg:mx-auto">
      <img 
        src={family} 
        alt="family" 
        className="h-52 w-auto mx-auto" 
      />
      <div className="flex flex-col md:gap-2">
        <h2 className="font-bold text-5xl w-full leading-snug text-black mx-auto sm:mx-0 text-center">
          Join Your Family.
        </h2>
        <div className="FormContainer space-y-4 sm:space-y-6">
          <InputBoxCustom
            name="familyid"
            value={formData.familyid}
            onChange={handleChange}
            placeholder="Family ID"
            type="text"
            error={!formData.familyid}
          />
          <h3 className="text-sm font-medium text-center sm:text-base">If you don't have a family created by any of your family members, you can create one.</h3>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <PrimaryButton label="Create a Family" onClick={() => {}} />
        <PrimaryButton label="Continue" onClick={() => {}} />
      </div>
    </div>
  );
};

export default FamilyIdPage;
