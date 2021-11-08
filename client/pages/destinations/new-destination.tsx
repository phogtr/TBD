import React, { useState } from "react";
import { newDestinationRequest } from "../../api/destination/destination.api";
import { useRouter } from "next/router";

interface INewDestinationProps {}

const NewDestination: React.FC<INewDestinationProps> = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const requestBody = {
      destination: input,
    };
    try {
      await newDestinationRequest(requestBody);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>New Destination</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Enter the name of the destination:
            <input type="input" value={input} onChange={handleInputChange} />
          </label>
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};
export default NewDestination;
