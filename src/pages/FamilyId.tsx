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
    <div className="px-4 py-6 sm:px-10 sm:py-10 flex flex-col min-h-screen justify-evenly lg:max-w-[40%] lg:mx-auto">
      <img 
        src={family} 
        alt="family" 
        className="mb-4 sm:mb-8 w-full max-w-md sm:max-w-lg lg:max-w-full mx-auto" 
      />
      <div className="flex flex-col gap-8 sm:gap-16">
        <h2 className="font-bold text-4xl sm:text-5xl w-full sm:w-[75%] leading-snug text-black mx-auto sm:mx-0 text-center sm:text-left">
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
          <h3 className="text-sm sm:text-base">If you don't have a family created by any of your family members, you can create one.</h3>
        </div>
      </div>
      <div className="pt-4 sm:pb-4 w-full sm:w-auto">
        <PrimaryButton label="Continue" onClick={() => {}} />
      </div>
    </div>
  );
};

export default FamilyIdPage;
