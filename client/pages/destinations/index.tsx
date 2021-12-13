import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getAllDestinationsRequest, removeDestinationRequest } from "../../api/destination/destination.api";
import { Destination } from "../../interface";

interface DestinationsProps {
  destinations: Destination[];
}

const Destinations: React.FC<DestinationsProps> = ({ destinations }) => {
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
            {d.ticket?.id && d.ticket?.status === "AVAILABLE" && (
              <button
                onClick={() => {
                  router.push("/tickets/market");
                }}
              >
                Ticket Available
              </button>
            )}
            {/* <button onClick={() => onClickRemoveHandler(d.id)}>remove</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Destinations;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAllDestinationsRequest();

  return {
    props: {
      destinations: res.data,
    },
  };
};
