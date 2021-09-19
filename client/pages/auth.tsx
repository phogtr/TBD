import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../config";

interface IauthProps {}

const Auth: React.FC<IauthProps> = ({}) => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/auth`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setData("error");
      });
  }, []);

  return (
    <div>
      <h1>Auth</h1>
      {data ? <h3>{data}</h3> : <h3>No data</h3>}
    </div>
  );
};
export default Auth;
