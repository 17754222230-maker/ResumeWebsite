import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/knowledge";
import ProjectDetailView from "@/components/ProjectDetailView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
