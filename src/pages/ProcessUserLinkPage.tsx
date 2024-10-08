import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useProcessUserLink } from "../hooks/user-link/useProcessUserLink.hook";
import { useVerifyUserLink } from "../hooks/user-link/useVerifyUserLink.hook";

function ProcessUserLinkPage() {
  const { "*": hash } = useParams();
  const { verifyUserLink, isError } = useVerifyUserLink();
  const { processUserLink } = useProcessUserLink();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (hash) {
      verifyUserLink(hash);
    }
  }, [hash, verifyUserLink]);

  function onSubmit(formValues: FieldValues) {
    processUserLink({ passphrase: formValues.passphrase, hash: hash! });
  }

  if (isError) return <div>Błąd</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("passphrase")}
        type="password"
        placeholder="Hasło dostępu"
        required
      />
      <button type="submit">Weryfikuj</button>
    </form>
  );
}

export default ProcessUserLinkPage;
