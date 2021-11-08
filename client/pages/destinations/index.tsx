import { GetServerSideProps } from "next";
import React from "react";
import { getAvailableDestinationRequest } from "../../api/destination/destination.api";
import { IDestination } from "../../interface";

interface IDestinationsProps {
  destinations: IDestination[];
}

const Destinations: React.FC<IDestinationsProps> = ({ destinations }) => {
  return (
    <div>
      <h1>Destinations</h1>
      <div>
        {destinations.map((d) => (
          <div key={d.id}>{d.destination}</div>
        ))}
      </div>
    </div>
  );
};
export default Destinations;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAvailableDestinationRequest();

  return {
    props: {
      destinations: res.data,
    },
  };
};
