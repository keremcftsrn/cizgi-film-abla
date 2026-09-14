import { PrismaClient } from '@prisma/client';
import ProjectsClient from './ProjectsClient';
export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export default async function AdminProjeler() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="pb-24">
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Yakındaki Projeler 🚀</h1>
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}