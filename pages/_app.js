import Head from "next/head";
import NavBar from "../components/NavBar";
import "../styles/globals.css";

// This component will be render before any page.
// This is a custom app component that we use to share information between components
// These props are passed automatically by the nextjs framework.
// "Component" will be the page component corresponding to the page being display (index, about etc).
// "pageProps" contain props that we need to pass to the page component.
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <header>
        <NavBar />
      </header>
      {/* Here we are rendering the component representing the page and we pass the props of that page. */}
      <Component {...pageProps} />
    </>
  );
}

export default App;
