import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

import { getAllDestinationsRequest, removeDestinationRequest } from "../../api/destination/destination.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { AuthUser, Destination } from "../../interface";

interface DestinationsProps {
  destinations: Destination[];
  user?: AuthUser;
}

const Destinations: React.FC<DestinationsProps> = ({ destinations, user }) => {
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
            {d.destination}{" "}
            {d.ticket?.userId === user?.userId && d.ticket?.status === "PRIVATE" && (
              <span>
                <b>Owned</b>
              </span>
            )}
            {d.ticket?.userId === user?.userId && d.ticket?.status === "AVAILABLE" && (
              <span>
                <b>Selling</b>
              </span>
            )}
            {d.ticket?.userId !== user?.userId && d.ticket?.status === "AVAILABLE" && (
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

const fetchAllDestinations = () => {
  return async (_context: GetServerSidePropsContext, authUser: AuthUser) => {
    const res = await getAllDestinationsRequest();
    return {
      props: {
        destinations: res.data,
        user: authUser,
      },
    };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchAllDestinations());
