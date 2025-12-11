"use server";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name) {
        redirect("/auth/signup?error=name-missing");
    }

    if (!email) {
        redirect("/auth/signup?error=email-missing");
    }

    if (!password) {
        redirect("/auth/signup?error=password-missing");
    }

    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        const errorData = await response.json();

        if (errorData.code === "USER_ALREADY_EXISTS") {
            console.error("Ce compte existe déjà");
            redirect("/auth/signup?error=email-used");
        } else {
            console.error("Echec de l'inscription:", errorData.message);
            redirect("/auth/signup?error=generic");
        }
    }

    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
        redirect("/auth/signin?error=email-missing");
    }

    if (!password) {
        redirect("/auth/signin?error=password-missing");
    }

    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        const errorData = await response.json();

        if (errorData.code === "AUTH_USER_NOT_FOUND") {
            console.error("Ce compte n'existe pas");
            redirect("/auth/signin?error=email-missing");
        } else if (errorData.code === "AUTH_INVALID_PASSWORD") {
            console.error("Mot de passe incorrect");
            redirect("/auth/signin?error=password-missing");
        } else {
            console.error("Echec de la connexion:", errorData.message);
            redirect("/auth/signin?error=true");
        }
    }

    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signout = async () => {
    await auth.api.signOut({ headers: await headers() }); // attention à bien passer les headers!
};