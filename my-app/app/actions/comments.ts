"use server"

import { db } from "../lib/db/drizzle"
import { commentsTable } from "../lib/db/schema"
import { revalidatePath } from "next/cache"

export async function addComment (formData: FormData) {
    const comment = formData.get("comment") as string
    const userId = formData.get("userId") as string
    const projectId = formData.get("projectId") as string

    if (!comment || !userId || !projectId) {
        throw new Error ("Le message ne peut pas être vide")
    }

    try {
        await db.insert(commentsTable).values({
            message: comment,
            user_id: userId,
            project_id: Number(projectId)
        })
    revalidatePath('/project', 'layout')
    } catch (error) {
        console.error("Erreur lors de publication de message", error)
    }
}

