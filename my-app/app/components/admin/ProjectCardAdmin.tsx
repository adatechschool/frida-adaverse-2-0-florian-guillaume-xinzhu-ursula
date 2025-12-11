"use client"

import { publishProject, deleteProject } from "@/app/actions/project"
import { useState } from "react"
import ProjectImage from "../ProjectImage"
import type { ProjectWithRelations } from "@/app/types"

type Props = {
  projectId: number
  project: ProjectWithRelations
}

export default function ProjectCardAdmin({ projectId, project }: Props) {
  const [loading, setLoading] = useState(false)
  const p = project.students_projects
  const isPublished = !!p.published_at

  const handlePublish = async () => {
    setLoading(true)
    await publishProject(projectId)
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await deleteProject(projectId)
    setLoading(false)
  }

  return (
    <div className="group block bg-white rounded-xl shadow-md overflow-hidden border-2 border-yellow-400 border-dashed relative">

      {/* Badge si non publié */}
      {!isPublished && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            ⏳ En attente de validation
          </span>
        </div>
      )}

      <ProjectImage
        githubUrl={p.github_url}
        projectName={p.name}
        height="h-48"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-700">
          {p.name}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>📅</span>
          {isPublished
            ? new Date(p.published_at!).toLocaleDateString("fr-FR")
            : "En attente de publication"}
        </p>

        {/* ✅ Boutons affichés uniquement si NON publié */}
        {!isPublished && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition-all disabled:opacity-50"
            >
              ✓ PUBLIER
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition-all disabled:opacity-50"
            >
              ✗ REFUSER
            </button>
          </div>
        )}

        {/* ✅ Optionnel : badge si déjà publié */}
        {isPublished && (
          <div className="mt-4 text-green-600 font-semibold text-sm">
            ✅ Projet publié
          </div>
        )}
      </div>
    </div>
  )
}