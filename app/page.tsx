"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const router = useRouter();

  // Function to calculate age based on DOB
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) {
      const calculatedAge = calculateAge(dob);
      const birthDate = new Date(dob);
      const day = birthDate.getDate();
      const month = birthDate.toLocaleString('default', { month: 'long' }); // Get full month name
  
      router.push(`/output?name=${encodeURIComponent(name)}&age=${calculatedAge}&day=${day}&month=${encodeURIComponent(month)}`);
    } else {
      alert("Please enter a valid date of birth!");
    }
  };
  

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-white text-black">
      <div className="flex flex-col gap-10 items-center bg-slate-100 p-10 rounded-3xl">
        <h1 className="xs:text-[30px] text-xl font-bold text-center">Enter Your Details</h1>
        <p className="text-center xs:text-lg text-base">Submit your information and then celebrate your Birthday! 🎉</p>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Input for Name */}
          <label htmlFor="name" className="text-base xs:text-2xl mb-1">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-1 border-black outline-double xs:w-[400px] w-auto mb-14 xs:h-8 xs:text-xl"
          />

          {/* Input for Date of Birth */}
          <label htmlFor="dob" className="text-base xs:text-2xl mb-1">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="border-1 border-black outline-double xs:w-[400px] w-auto mb-14 xs:h-8 xs:text-xl"
            />

          {/* Submit Button */}
          <button type="submit" className="mt-3 w-32 xs:w-60 xs:h-10 bg-black mx-auto text-white rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
