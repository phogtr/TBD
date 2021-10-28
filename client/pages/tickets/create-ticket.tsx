import { GetServerSideProps } from "next";
import React, { BaseSyntheticEvent, useState } from "react";

import { Meta } from "../../components/Meta";

import { getAllLocationsRequest } from "../../api/location/location.api";

interface ILocationData {
  id: string;
  name: string;
}

interface ICreateTicketProps {
  locations: ILocationData[];
}

const CreateTicket: React.FC<ICreateTicketProps> = ({ locations }) => {
  const [selectedItem, setSelectedItem] = useState(locations[0].name);

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
            Select a location:
            <select
              value={selectedItem}
              onChange={(e: BaseSyntheticEvent) => setSelectedItem(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
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
  const res = await getAllLocationsRequest();

  return {
    props: {
      locations: res.data,
    },
  };
};
