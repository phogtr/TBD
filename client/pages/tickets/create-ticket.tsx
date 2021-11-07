import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";

import { Meta } from "../../components/Meta";

import { IDestination } from "../../interface";
import { getAvailableDestinationRequest } from "../../api/destination/destination.api";
import { createTicketRequest } from "../../api/ticket/ticket.api";

interface ICreateTicketProps {
  destinations: IDestination[];
}

const CreateTicket: React.FC<ICreateTicketProps> = ({ destinations }) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(destinations[0].id);

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      location: selectedItem,
    };
    try {
      await createTicketRequest(requestBody);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Meta title="Create Ticket" />
      <h1>Create a Ticket</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>
            Select a destination:
            <select value={selectedItem} onChange={onSelectHandler}>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" value="submit">
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateTicket;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAvailableDestinationRequest();

  return {
    props: {
      destinations: res.data,
    },
  };
};
