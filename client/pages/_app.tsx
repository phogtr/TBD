import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { UserProvider } from "../context/user.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initialUser={pageProps?.user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
export default MyApp;
