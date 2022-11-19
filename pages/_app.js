import "../styles/globals.css";
import { SiteStateProvider } from "../context/SiteStateContext.js";

function MyApp({ Component, pageProps }) {
  return (
    <SiteStateProvider>
      <Component {...pageProps} />;
    </SiteStateProvider>
  );
}

export default MyApp;
