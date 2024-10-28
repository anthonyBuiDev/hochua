
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';


const WorkspaceIdpage = async () => {
  const user = await auth();

  if (!user) redirect("auth/login");

  return <div>Workspace Id</div>;
};

export default WorkspaceIdpage;
