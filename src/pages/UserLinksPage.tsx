import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PageLoader } from "../components/shared/PageLoader.tsx";
import { useUserLink } from "../hooks/user-link/useUserLinks.hook.ts";
import QRCode from "react-qr-code";

export function UserLinksPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userLink, isLoadingLink } = useUserLink();

  useEffect(() => {
    if (!isLoadingLink && !userLink) {
      toast(t("toasts.userLink.empty"), { type: "info" });
      navigate("/user-links/create");
    }
  }, [isLoadingLink, userLink, t, navigate]);

  if (isLoadingLink) {
    return <PageLoader active={true} />;
  }

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        {t("userLink.typography.own")}
      </h1>
      <div className="flex justify-center">
        {userLink && (
          <QRCode
            size={400}
            value={`https://roberts98.github.io/projectly-front/#/user-links/process/${userLink.hash}`}
          />
        )}
      </div>
    </div>
  );
}
