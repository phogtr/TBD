import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  getAllDestinationsRequest,
  // getAvailableDestinationRequest,
  removeDestinationRequest,
} from "../../api/destination/destination.api";
import { IDestination } from "../../interface";

interface IDestinationsProps {
  destinations: IDestination[];
}

const Destinations: React.FC<IDestinationsProps> = ({ destinations }) => {
  const router = useRouter();

  const onClickRemoveHandler = async (id: string) => {
    await removeDestinationRequest(id);
    router.push("/destinations");
  };

  return (
    <div>
      <h1>Destinations</h1>
      <div>
        {destinations.map((d) => (
          <div key={d.id}>
            {d.destination}
            <button onClick={() => onClickRemoveHandler(d.id)}>remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Destinations;

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await getAvailableDestinationRequest();
  const res = await getAllDestinationsRequest();

  return {
    props: {
      destinations: res.data,
    },
  };
};
