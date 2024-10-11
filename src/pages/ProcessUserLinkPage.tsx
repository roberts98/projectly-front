import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useProcessUserLink } from "../hooks/user-link/useProcessUserLink.hook";
import { useVerifyUserLink } from "../hooks/user-link/useVerifyUserLink.hook";
import { useTranslation } from "react-i18next";
import { FormGroup } from "../components/form/FormGroup.tsx";
import { Button, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

export function ProcessUserLinkPage() {
  const { t } = useTranslation();
  const { "*": hash } = useParams();
  const { verifyUserLink, isVerifyingError } = useVerifyUserLink();
  const { processUserLink } = useProcessUserLink();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onSubmit(formValues: FieldValues) {
    processUserLink({ passphrase: formValues.passphrase, hash: hash! });
  }

  useEffect(() => {
    if (hash) {
      verifyUserLink(hash);
    }
  }, [hash, verifyUserLink]);

  useEffect(() => {
    if (isVerifyingError) {
      navigate("/");
      toast(t("toasts.userLink.verifyError"), { type: "error" });
    }
  }, [isVerifyingError, navigate, t]);

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        {t("userLink.typography.verify")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup id="passphrase" label={t("userLink.fields.passphrase")}>
          <TextInput
            sizing="lg"
            id="passphrase"
            {...register("passphrase")}
            type="password"
            required
          />
        </FormGroup>
        <Button type="submit" size="xl" className="mt-10 mx-auto">
          {t("userLink.buttons.verify")}
        </Button>
      </form>
    </div>
  );
}
