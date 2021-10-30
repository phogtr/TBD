import { GetServerSideProps } from "next";
import React, { BaseSyntheticEvent, useState } from "react";

import { Meta } from "../../components/Meta";

import { getAllDestinationsRequest } from "../../api/destination/destination.api";

interface IDestinationData {
  id: string;
  name: string;
}

interface ICreateTicketProps {
  destinations: IDestinationData[];
}

const CreateTicket: React.FC<ICreateTicketProps> = ({ destinations }) => {
  const [selectedItem, setSelectedItem] = useState(destinations[0].name);

  const formSubmitHandler = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(selectedItem);
  };

  return (
    <div>
      <Meta title="Create Ticket" />
      <h1>Create a Ticket</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>
            Select a destination:
            <select
              value={selectedItem}
              onChange={(e: BaseSyntheticEvent) => setSelectedItem(e.target.value)}
            >
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.name}>
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
  const res = await getAllDestinationsRequest();

  return {
    props: {
      destinations: res.data,
    },
  };
};
