import AuthForm from "../components/project/AuthForm";

interface Props {
  projectId: number;
}

function AuthProjectPage({ projectId }: Props) {
  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">Autoryzacja projektu</h1>
      <AuthForm projectId={projectId} />
    </div>
  );
}

export default AuthProjectPage;
