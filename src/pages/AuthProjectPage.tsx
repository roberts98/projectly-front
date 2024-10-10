import { ProjectAuthorizeForm } from "../components/project/ProjectAuthorizeForm.tsx";

interface Props {
  projectId: number;
}

export function AuthProjectPage({ projectId }: Props) {
  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">Autoryzacja projektu</h1>
      <ProjectAuthorizeForm projectId={projectId} />
    </div>
  );
}
