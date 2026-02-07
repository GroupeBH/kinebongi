import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAdminFromSession } from "@/lib/auth/admin";

const STATUS_OPTIONS = [
  "recu",
  "en_revue",
  "entretien",
  "refuse",
  "accepte",
];

const STATUS_LABELS: Record<string, string> = {
  recu: "Recu",
  en_revue: "En revue",
  entretien: "Entretien",
  refuse: "Refuse",
  accepte: "Accepte",
};

const bucketName =
  process.env.SUPABASE_CANDIDATURES_BUCKET ?? "candidatures";

type Candidature = {
  id: string;
  created_at: string | null;
  nom: string;
  postnom: string;
  prenom: string;
  sexe: string;
  date_naissance: string;
  telephone: string;
  email: string;
  adresse: string | null;
  etablissement: string;
  filiere: string;
  niveau: string;
  annee: string | null;
  logiciels: string[] | null;
  niveau_outils: string | null;
  motivation: string | null;
  competences: string | null;
  cv_path: string | null;
  portfolio_path: string | null;
  status: string | null;
  notes: string | null;
};

const formatDate = (value: string | null) => {
  if (!value) return "-";
  return value.slice(0, 10);
};

async function updateCandidature(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  const notes = String(formData.get("notes") || "");

  if (!id || !STATUS_OPTIONS.includes(status)) {
    return;
  }

  const supabase = getSupabaseAdmin();

  await supabase
    .from("candidatures")
    .update({ status, notes: notes || null })
    .eq("id", id);

  revalidatePath("/admin");
}

export default async function AdminPage() {
  const session = await getAdminFromSession();

  if (!session) {
    redirect("/admin/login");
  }

  const supabase = getSupabaseAdmin();
  const { data: rows, error } = await supabase
    .from("candidatures")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 px-6 py-16">
        <h1 className="font-display text-3xl">Admin kin ebongi</h1>
        <p className="text-sm text-[#8b2c2c]">
          Impossible de charger les candidatures.
        </p>
      </div>
    );
  }

  const candidatures = (rows as Candidature[]) ?? [];

  const enriched = await Promise.all(
    candidatures.map(async (item) => {
      let cvUrl: string | null = null;
      let portfolioUrl: string | null = null;

      if (item.cv_path) {
        const { data: signed } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(item.cv_path, 60 * 60);
        cvUrl = signed?.signedUrl ?? null;
      }

      if (item.portfolio_path) {
        const { data: signed } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(item.portfolio_path, 60 * 60);
        portfolioUrl = signed?.signedUrl ?? null;
      }

      return { ...item, cvUrl, portfolioUrl };
    })
  );

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#7a7d7f]">
            Admin kin ebongi
          </p>
          <h1 className="font-display text-3xl sm:text-4xl">
            Gestion des candidatures
          </h1>
          <p className="text-sm text-[#5b6063]">
            {enriched.length} candidature(s) enregistree(s)
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[#2b3335]"
            type="submit"
          >
            Se deconnecter
          </button>
        </form>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-20">
        {enriched.map((item) => (
          <section
            key={item.id}
            className="rounded-[28px] border border-[var(--line)] bg-white/90 p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">
                  {item.prenom} {item.nom} {item.postnom}
                </p>
                <p className="text-sm text-[#5b6063]">
                  {item.email} - {item.telephone}
                </p>
              </div>
              <div className="rounded-full bg-[#f2e4d8] px-3 py-1 text-xs font-semibold text-[#8a623f]">
                {STATUS_LABELS[item.status || "recu"]}
              </div>
            </div>

            <div className="mt-4 grid gap-4 text-sm text-[#4b5052] md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Parcours
                </p>
                <p className="mt-2">
                  {item.etablissement} - {item.filiere}
                </p>
                <p className="text-xs text-[#7a7d7f]">
                  {item.niveau} {item.annee ? `- ${item.annee}` : ""}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Infos
                </p>
                <p className="mt-2">Sexe: {item.sexe}</p>
                <p className="text-xs text-[#7a7d7f]">
                  Naissance: {formatDate(item.date_naissance)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Date
                </p>
                <p className="mt-2">{formatDate(item.created_at)}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                Logiciels
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(item.logiciels && item.logiciels.length > 0
                  ? item.logiciels
                  : ["Non renseigne"]).map((software) => (
                  <span
                    key={`${item.id}-${software}`}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[#2b3335]"
                  >
                    {software}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[#f8f4f0] p-4 text-sm text-[#4b5052]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Motivation
                </p>
                <p className="mt-2">
                  {item.motivation || "Non renseigne."}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[#f8f4f0] p-4 text-sm text-[#4b5052]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Competences a developper
                </p>
                <p className="mt-2">
                  {item.competences || "Non renseigne."}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              {item.cvUrl ? (
                <a
                  className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[#2b3335]"
                  href={item.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telecharger CV
                </a>
              ) : (
                <span className="text-xs text-[#7a7d7f]">CV manquant</span>
              )}
              {item.portfolioUrl ? (
                <a
                  className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[#2b3335]"
                  href={item.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telecharger portfolio
                </a>
              ) : (
                <span className="text-xs text-[#7a7d7f]">
                  Portfolio non fourni
                </span>
              )}
            </div>

            <form
              className="mt-6 grid gap-4 rounded-2xl border border-[var(--line)] bg-white/70 p-4 md:grid-cols-[1fr_2fr_auto]"
              action={updateCandidature}
            >
              <input name="id" type="hidden" value={item.id} />
              <label className="text-xs font-semibold">
                Statut
                <select
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
                  name="status"
                  defaultValue={item.status || "recu"}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-semibold">
                Notes admin
                <textarea
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
                  name="notes"
                  defaultValue={item.notes || ""}
                  rows={3}
                />
              </label>
              <div className="flex items-end">
                <button
                  className="rounded-full bg-[var(--accent-strong)] px-5 py-3 text-xs font-semibold text-white"
                  type="submit"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </section>
        ))}
      </main>
    </div>
  );
}
