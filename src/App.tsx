import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PageLoader } from "./components/shared/PageLoader";
import { BootstrapHttpService } from "./http/bootstrap-http.service";
import { queryClient } from "./query-client";
import { Router } from "./Router";
import { useUserStore } from "./store/user.store";

export function App() {
  const [ready, setReady] = useState(false);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    BootstrapHttpService.bootstrap().then((response) => {
      setUserInfo(response);
      setReady(true);
    });
  }, [setUserInfo]);

  useEffect(() => {
    localStorage.setItem("i18nextLng", navigator.language);
  }, []);

  if (!ready)
    return (
      <PageLoader active={!ready}>
        <></>
      </PageLoader>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
