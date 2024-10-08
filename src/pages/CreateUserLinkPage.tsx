import UserLinkForm from "../components/user-link/UserLinkForm";

function CreateUserLinkPage() {
  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        Stwórz indywidualny link dostępu
      </h1>
      <UserLinkForm />
    </div>
  );
}

export default CreateUserLinkPage;
