import { Theme } from "@twilio-paste/core/theme";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation";

const MyApp: React.FC<React.PropsWithChildren<AppProps>> = ({
  Component,
  pageProps,
}) => {
  return (
    <Theme.Provider theme="default">
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </Theme.Provider>
  );
};

export default MyApp;
