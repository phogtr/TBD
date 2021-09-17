import Head from "next/head";
import React from "react";

interface IMetaProps {
  title?: string;
}

export const Meta: React.FC<IMetaProps> = ({ title = "Next" }) => {
  return (
    <Head>
      {title !== "Next" ? "" : <link rel="icon" href="/favicon.ico" />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Head>
  );
};
