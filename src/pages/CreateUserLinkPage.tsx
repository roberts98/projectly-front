import { useNavigate } from "react-router-dom";
import { UserLinkForm } from "../components/user-link/UserLinkForm";
import { useUserLink } from "../hooks/user-link/useUserLinks.hook";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function CreateUserLinkPage() {
  const { t } = useTranslation();
  const { userLink } = useUserLink();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLink) {
      navigate("/user-links/list");
      toast(t("toasts.userLink.alreadyOwned"), { type: "info" });
    }
  }, [userLink, navigate, t]);

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        {t("userLink.typography.new")}
      </h1>
      <UserLinkForm />
    </div>
  );
}
