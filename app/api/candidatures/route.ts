import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const bucketName =
  process.env.SUPABASE_CANDIDATURES_BUCKET ?? "candidatures";

const isFile = (value: FormDataEntryValue | null): value is File =>
  typeof value === "object" && value !== null && "arrayBuffer" in value;

const getText = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const getExtension = (file: File, fallback: string) => {
  const parts = file.name.split(".");
  if (parts.length > 1) {
    return parts[parts.length - 1]?.toLowerCase() || fallback;
  }
  return fallback;
};

export async function POST(request: Request) {
  let supabase;

  try {
    supabase = getSupabaseAdmin();
  } catch (error) {
    return NextResponse.json(
      { error: "Supabase n'est pas configure." },
      { status: 500 }
    );
  }

  const form = await request.formData();
  const cvFile = form.get("cv");

  if (!isFile(cvFile)) {
    return NextResponse.json({ error: "Le CV est requis." }, { status: 400 });
  }

  const nom = getText(form, "nom");
  const postnom = getText(form, "postnom");
  const prenom = getText(form, "prenom");
  const sexe = getText(form, "sexe");
  const dateNaissance = getText(form, "dateNaissance");
  const telephone = getText(form, "telephone");
  const email = getText(form, "email");
  const adresse = getText(form, "adresse") || null;
  const etablissement = getText(form, "etablissement");
  const filiere = getText(form, "filiere");
  const niveau = getText(form, "niveau");
  const annee = getText(form, "annee") || null;
  const niveauOutils = getText(form, "niveauOutils") || null;
  const motivation = getText(form, "motivation") || null;
  const competences = getText(form, "competences") || null;

  const requiredFields = [
    nom,
    postnom,
    prenom,
    sexe,
    dateNaissance,
    telephone,
    email,
    etablissement,
    filiere,
    niveau,
  ];

  if (requiredFields.some((value) => !value)) {
    return NextResponse.json(
      { error: "Champs requis manquants." },
      { status: 400 }
    );
  }

  const logicielsRaw = getText(form, "logiciels");
  let logiciels: string[] = [];

  if (logicielsRaw) {
    try {
      logiciels = JSON.parse(logicielsRaw);
    } catch {
      logiciels = [];
    }
  }

  const id = crypto.randomUUID();
  const uploadedPaths: string[] = [];

  const uploadFile = async (file: File, path: string) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from(bucketName).upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (error) {
      throw new Error(error.message);
    }

    uploadedPaths.push(path);
    return path;
  };

  try {
    const cvPath = await uploadFile(
      cvFile,
      `${id}/cv.${getExtension(cvFile, "pdf")}`
    );

    const portfolioFile = form.get("portfolio");
    let portfolioPath: string | null = null;

    if (isFile(portfolioFile)) {
      portfolioPath = await uploadFile(
        portfolioFile,
        `${id}/portfolio.${getExtension(portfolioFile, "pdf")}`
      );
    }

    const payload = {
      id,
      nom,
      postnom,
      prenom,
      sexe,
      date_naissance: dateNaissance,
      telephone,
      email,
      adresse,
      etablissement,
      filiere,
      niveau,
      annee,
      logiciels,
      niveau_outils: niveauOutils,
      motivation,
      competences,
      cv_path: cvPath,
      portfolio_path: portfolioPath,
      status: "recu",
    };

    const { error } = await supabase.from("candidatures").insert(payload);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    if (uploadedPaths.length > 0) {
      await supabase.storage.from(bucketName).remove(uploadedPaths);
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible d'enregistrer la candidature.",
      },
      { status: 500 }
    );
  }
}
