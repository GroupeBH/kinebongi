"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FormState = {
  nom: string;
  postnom: string;
  prenom: string;
  sexe: string;
  dateNaissance: string;
  telephone: string;
  email: string;
  adresse: string;
  etablissement: string;
  filiere: string;
  niveau: string;
  annee: string;
  logiciels: string[];
  niveauOutils: string;
  motivation: string;
  competences: string;
  cv: File | null;
  portfolio: File | null;
};

export default function Home() {
  const highlights = [
    {
      title: "Studio architecture + investissement",
      description:
        "Tu rejoins une cellule qui concoit des projets financables et desirables, du concept au dossier investisseur.",
    },
    {
      title: "Co-conception avec la communaute",
      description:
        "Chaque projet est co-investi par des membres. Tu apprends a designer avec des retours reels.",
    },
    {
      title: "Impact local mesurable",
      description:
        "Nos projets creent des espaces a forte valeur d'usage dans les villes emergentes.",
    },
  ];

  const programSteps = [
    {
      title: "Immersion atelier",
      desc: "Brief clients, maquettes rapides, et comprehension des objectifs d'investissement.",
      tone: "bg-[#f3e2d2]",
    },
    {
      title: "Sprints de projet",
      desc: "Tu travailles par cycles courts avec BIM, rendus et simulations de couts.",
      tone: "bg-[#e1ecf0]",
    },
    {
      title: "Production & pitch",
      desc: "Livrables finaux, pitch deck investisseur et accompagnement du lancement.",
      tone: "bg-[#efe4d8]",
    },
  ];

  const roles = [
    {
      title: "Stagiaire architecture conceptuelle",
      location: "Hybride - Dakar",
      duration: "6 mois",
      tags: ["Concept", "Maquettes", "Recherche"],
    },
    {
      title: "Stagiaire BIM & coordination",
      location: "Remote - Afrique/Europe",
      duration: "4 a 6 mois",
      tags: ["BIM", "Coordination", "Revit"],
    },
    {
      title: "Stagiaire design urbain",
      location: "Sur site - Abidjan",
      duration: "5 mois",
      tags: ["Urbanisme", "Mobilite", "Carto"],
    },
    {
      title: "Stagiaire visualisation 3D",
      location: "Remote",
      duration: "3 a 5 mois",
      tags: ["3D", "Lumion", "Storytelling"],
    },
  ];

  const projects = [
    {
      name: "Residence Baobab",
      location: "Dakar",
      status: "Collecte ouverte",
      progress: "68%",
      investors: "128 co-investisseurs",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Les Terrasses du Fleuve",
      location: "Abidjan",
      status: "Etude de faisabilite",
      progress: "42%",
      investors: "76 co-investisseurs",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Ateliers Horizon",
      location: "Lome",
      status: "Prochainement",
      progress: "19%",
      investors: "En pre-inscription",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const recruitment = [
    {
      step: "01",
      title: "Portfolio & motivation",
      desc: "On regarde tes projets, ta demarche et ta curiosite.",
    },
    {
      step: "02",
      title: "Mini case study",
      desc: "Un brief de 48h pour evaluer ton approche et ta rigueur.",
    },
    {
      step: "03",
      title: "Entretien studio",
      desc: "Discussion avec l'equipe conception et investissement.",
    },
    {
      step: "04",
      title: "Offre & onboarding",
      desc: "Plan d'apprentissage, mentorat et objectifs du stage.",
    },
  ];

  const testimonials = [
    {
      name: "Mariam K.",
      role: "Stagiaire architecture 2025",
      quote:
        "Le feedback des co-investisseurs change la maniere de penser un projet. On apprend vite et bien.",
    },
    {
      name: "Etienne L.",
      role: "BIM coordinator",
      quote:
        "kin ebongi m'a permis de connecter les attentes business avec les choix techniques.",
    },
    {
      name: "Assia D.",
      role: "Architecte junior",
      quote:
        "L'ambiance studio est exigeante mais bienveillante. On sent l'impact concret.",
    },
  ];

  const steps = [
    "Identite",
    "Parcours",
    "Competences",
    "Motivation",
    "Documents",
  ];

  const softwareOptions = [
    "AutoCAD",
    "Revit",
    "ArchiCAD",
    "SketchUp",
    "Civil 3D",
  ];

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    nom: "",
    postnom: "",
    prenom: "",
    sexe: "",
    dateNaissance: "",
    telephone: "",
    email: "",
    adresse: "",
    etablissement: "",
    filiere: "",
    niveau: "",
    annee: "",
    logiciels: [],
    niveauOutils: "",
    motivation: "",
    competences: "",
    cv: null,
    portfolio: null,
  });

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSoftware = (value: string) => {
    setFormData((prev) => {
      const exists = prev.logiciels.includes(value);
      return {
        ...prev,
        logiciels: exists
          ? prev.logiciels.filter((item) => item !== value)
          : [...prev.logiciels, value],
      };
    });
  };

  const isStepValid = (index: number) => {
    if (index === 0) {
      return Boolean(
        formData.nom.trim() &&
          formData.postnom.trim() &&
          formData.prenom.trim() &&
          formData.sexe &&
          formData.dateNaissance &&
          formData.telephone.trim() &&
          formData.email.trim()
      );
    }

    if (index === 1) {
      return Boolean(
        formData.etablissement && formData.filiere && formData.niveau
      );
    }

    if (index === 2) {
      return Boolean(formData.niveauOutils);
    }

    if (index === 3) {
      return (
        formData.motivation.trim().length >= 20 &&
        formData.competences.trim().length >= 20
      );
    }

    if (index === 4) {
      return Boolean(formData.cv);
    }

    return false;
  };

  const totalSteps = steps.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);
  const canProceed = isStepValid(step);

  const handleNext = () => {
    if (!canProceed) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    setSubmitError(null);
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setAttempted(false);
    setSubmitError(null);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isStepValid(totalSteps - 1)) {
      setAttempted(true);
      return;
    }

    setAttempted(false);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append("nom", formData.nom);
      payload.append("postnom", formData.postnom);
      payload.append("prenom", formData.prenom);
      payload.append("sexe", formData.sexe);
      payload.append("dateNaissance", formData.dateNaissance);
      payload.append("telephone", formData.telephone);
      payload.append("email", formData.email);
      payload.append("adresse", formData.adresse);
      payload.append("etablissement", formData.etablissement);
      payload.append("filiere", formData.filiere);
      payload.append("niveau", formData.niveau);
      payload.append("annee", formData.annee);
      payload.append("logiciels", JSON.stringify(formData.logiciels));
      payload.append("niveauOutils", formData.niveauOutils);
      payload.append("motivation", formData.motivation);
      payload.append("competences", formData.competences);

      if (formData.cv) {
        payload.append("cv", formData.cv);
      }

      if (formData.portfolio) {
        payload.append("portfolio", formData.portfolio);
      }

      const response = await fetch("/api/candidatures", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error ?? "Une erreur est survenue lors de l'envoi."
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[#1f2a2d] shadow-sm focus:border-[#c7794a] focus:outline-none focus:ring-2 focus:ring-[#f2d2bf]";

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="relative overflow-hidden">
        <div
          className="absolute -top-48 right-[-15%] h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(245, 211, 187, 0.9), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(194, 223, 230, 0.8), transparent 70%)",
          }}
        />

        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-strong)] text-base font-semibold text-white">
              N
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">kin ebongi</p>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                co-invest immobilier
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[#2b3335] lg:flex">
            <a className="transition hover:text-black" href="#stages">
              Stages
            </a>
            <a className="transition hover:text-black" href="#programme">
              Programme
            </a>
            <a className="transition hover:text-black" href="#projets">
              Projets
            </a>
            <a className="transition hover:text-black" href="#processus">
              Processus
            </a>
            <a className="transition hover:text-black" href="/#candidature">
              Candidature
            </a>
            <a className="transition hover:text-black" href="#contact">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              className="rounded-full bg-[var(--accent-strong)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              type="button"
              onClick={() => {
                const target = document.getElementById("candidature");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                  return;
                }
                window.location.href = "/#candidature";
              }}
            >
              Postuler
            </button>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#5c615f]">
              Recrutement 2026
            </span>
            <div className="space-y-5">
              <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Des stages en architecture pour creer des projets immobiliers
                co-investis.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#4b5052] sm:text-lg">
                kin ebongi relie architecture, finance collaborative et impact local.
                Nous recrutons des stagiaires capables d'imaginer des espaces
                desirables, soutenus par une communaute d'investisseurs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-full bg-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110"
                href="/#candidature"
              >
                Demarrer ma candidature
              </a>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707475]">
                  Projets actifs
                </p>
                <p className="mt-2 text-2xl font-semibold">12</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707475]">
                  Co-investisseurs
                </p>
                <p className="mt-2 text-2xl font-semibold">1 480+</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#707475]">
                  Stages/an
                </p>
                <p className="mt-2 text-2xl font-semibold">24</p>
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-[var(--line)] bg-white/80 p-4 shadow-lg shadow-black/5 sm:grid-cols-[1.1fr_1fr_1fr_auto]">
              <div className="rounded-2xl bg-[#f6f2ee] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Specialite
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Architecture + BIM
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f2ee] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Lieu
                </p>
                <p className="mt-1 text-sm font-semibold">Afrique / Remote</p>
              </div>
              <div className="rounded-2xl bg-[#f6f2ee] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Duree
                </p>
                <p className="mt-1 text-sm font-semibold">3 a 6 mois</p>
              </div>
              <button className="rounded-2xl bg-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
                Explorer
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-16 hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl shadow-black/10 lg:block">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                Prochain pitch
              </p>
              <p className="mt-2 text-sm font-semibold">
                18 fev - Session investisseurs
              </p>
              <p className="mt-3 text-xs text-[#7a7d7f]">
                6 projets presentes
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[36px] bg-[#d6dde0] shadow-2xl shadow-black/20">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                alt="Equipe architecture travaillant sur un plan"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2428]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                  Studio kin ebongi
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Conception collaborative + investissement
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Mentorat
                </p>
                <p className="mt-2 text-sm font-semibold">
                  1 architecte senior
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Rythme
                </p>
                <p className="mt-2 text-sm font-semibold">4 jours studio</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16" id="stages">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
              Pourquoi kin ebongi
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Une plateforme qui connecte conception architecturale et
              investissement collectif.
            </h2>
            <p className="text-base leading-relaxed text-[#4b5052]">
              Nos stages sont construits pour t'apprendre a livrer des projets
              realistes, financeables et inspirants, avec des retours d'une
              communaute engagee.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[var(--line)] bg-white/80 p-5 shadow-sm"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5b6063]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-6 pb-16 pt-4"
        id="programme"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
              Programme de stage
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Trois etapes pour livrer un projet co-investi.
            </h2>
          </div>
          <button className="rounded-full border border-[var(--line)] bg-white/70 px-5 py-2 text-sm font-semibold text-[#2b3335] transition hover:bg-white">
            Voir le guide complet
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {programSteps.map((stepItem, index) => (
            <div
              key={stepItem.title}
              className={`rounded-3xl border border-[var(--line)] p-6 shadow-lg shadow-black/5 ${stepItem.tone}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Etape {index + 1}
                </p>
                <span className="rounded-full border border-[#d2b9a4] bg-white/80 px-3 py-1 text-xs font-semibold text-[#7d5b3d]">
                  02 semaines
                </span>
              </div>
              <p className="mt-4 text-lg font-semibold">{stepItem.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5b6063]">
                {stepItem.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="projets">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
              Projets en cours
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Des projets portes par la communaute.
            </h2>
          </div>
          <button className="rounded-full bg-[var(--accent-strong)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110">
            Explorer la plateforme
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-white/90 shadow-lg shadow-black/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2b3335]">
                  {project.status}
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">{project.name}</p>
                    <p className="text-sm text-[#6a6f72]">
                      {project.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f2e4d8] px-3 py-1 text-xs font-semibold text-[#8a623f]">
                    {project.progress}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#eef1f2]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: project.progress }}
                  />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  {project.investors}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
              Offre de stages
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Des roles concrets pour apprendre et livrer.
            </h2>
            <p className="text-base leading-relaxed text-[#4b5052]">
              Les stagiaires travaillent sur des livrables reels : dossiers
              techniques, rendus, analyses de programme et planning.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[#101417] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Objectif du stage
            </p>
            <p className="mt-3 text-lg font-semibold">
              1 projet livre + 1 pitch investisseur
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Tu repars avec un dossier complet et une vraie experience de
              collaboration avec une communaute de financeurs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">
                Mentorat weekly
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                Budget & risques
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                Atelier pitch
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-3xl border border-[var(--line)] bg-white/90 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{role.title}</p>
                  <p className="text-sm text-[#6a6f72]">{role.location}</p>
                </div>
                <span className="rounded-full bg-[#f2e4d8] px-3 py-1 text-xs font-semibold text-[#8a623f]">
                  {role.duration}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#505456]">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line)] px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-sm text-[#596064]">
                <span>Debut flexible</span>
                <button className="text-sm font-semibold text-[var(--accent-strong)]">
                  Voir le brief -&gt;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-6 py-16"
        id="processus"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
              Processus de recrutement
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Clair, rapide, exigeant.
            </h2>
            <p className="text-base leading-relaxed text-[#4b5052]">
              Nous voulons garder de l'agilite. En 15 jours tu sais si tu es
              retenu et tu peux planifier ton stage.
            </p>
          </div>
          <div className="space-y-4">
            {recruitment.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-3xl border border-[var(--line)] bg-white/90 p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[#f6f2ee] text-sm font-semibold">
                  {item.step}
                </div>
                <div>
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-[#5b6063]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="candidature">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
                Candidature
              </p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Formulaire de candidature
              </h2>
              <p className="text-sm text-[#5b6063]">
                Stage professionnel - Jeunes diplomes (ISAU / IBTP) | Kinshasa,
                RDC
              </p>
            </div>
            <p className="text-base leading-relaxed text-[#4b5052]">
              Ce formulaire est concu pour etre rapide et clair. Les champs
              proviennent du brief officiel. Prepare ton CV en PDF et, si tu en
              as un, ton portfolio.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Temps estime
                </p>
                <p className="mt-2 text-lg font-semibold">8 min</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Etapes
                </p>
                <p className="mt-2 text-lg font-semibold">5 sections</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Pieces
                </p>
                <p className="mt-2 text-lg font-semibold">CV + Portfolio</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7a7d7f]">
                  Confidentialite
                </p>
                <p className="mt-2 text-lg font-semibold">Assuree</p>
              </div>
            </div>
            <div className="rounded-3xl border border-[var(--line)] bg-[#101417] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Conseils
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Mets en avant un projet qui te represente. Explique en quelques
                lignes ce que tu veux apprendre pendant le stage.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--line)] bg-white/90 p-6 shadow-xl shadow-black/10">
            {submitted ? (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
                  Candidature envoyee
                </p>
                <h3 className="font-display text-2xl">
                  Merci, nous avons bien recu ton dossier.
                </h3>
                <p className="text-sm text-[#5b6063]">
                  Notre equipe reviendra vers toi sous 5 jours avec un plan
                  d'entretien. Tu peux suivre l'etat de ta candidature depuis
                  ton espace candidat.
                </p>
                <button
                  className="rounded-full border border-[var(--line)] bg-white px-5 py-2 text-sm font-semibold text-[#2b3335]"
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(0);
                  }}
                >
                  Soumettre une autre candidature
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
                      Etape {step + 1} sur {totalSteps}
                    </p>
                    <p className="text-xs font-semibold text-[#2b3335]">
                      {progress}%
                    </p>
                  </div>
                  <div
                    className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#ede7e2]"
                    role="progressbar"
                    aria-valuenow={step + 1}
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                  >
                    <div
                      className="h-full rounded-full bg-[var(--accent)] transition"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
                    {steps.map((label, index) => (
                      <div
                        key={label}
                        className={`flex items-center justify-center rounded-full border px-3 py-2 text-center font-semibold transition ${
                          index === step
                            ? "border-transparent bg-[var(--accent-strong)] text-white"
                            : index < step
                              ? "border-transparent bg-[#efe4d8] text-[#6d4d32]"
                              : "border-[var(--line)] text-[#7a7d7f]"
                        }`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                {step === 0 && (
                  <div className="space-y-4 animate-fade-up">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Informations personnelles
                      </h3>
                      <p className="text-sm text-[#5b6063]">
                        Renseigne ton identite telle qu'elle figure sur tes
                        documents officiels.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <label className="text-sm font-semibold">
                        Nom
                        <input
                          className={inputClass}
                          type="text"
                          value={formData.nom}
                          onChange={(event) =>
                            updateField("nom", event.target.value)
                          }
                          autoComplete="family-name"
                          required
                        />
                      </label>
                      <label className="text-sm font-semibold">
                        Postnom
                        <input
                          className={inputClass}
                          type="text"
                          value={formData.postnom}
                          onChange={(event) =>
                            updateField("postnom", event.target.value)
                          }
                          required
                        />
                      </label>
                      <label className="text-sm font-semibold">
                        Prenom
                        <input
                          className={inputClass}
                          type="text"
                          value={formData.prenom}
                          onChange={(event) =>
                            updateField("prenom", event.target.value)
                          }
                          autoComplete="given-name"
                          required
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-sm font-semibold">
                        Sexe
                        <select
                          className={inputClass}
                          value={formData.sexe}
                          onChange={(event) =>
                            updateField("sexe", event.target.value)
                          }
                          required
                        >
                          <option value="">-- Selectionner --</option>
                          <option value="Masculin">Masculin</option>
                          <option value="Feminin">Feminin</option>
                        </select>
                      </label>
                      <label className="text-sm font-semibold">
                        Date de naissance
                        <input
                          className={inputClass}
                          type="date"
                          value={formData.dateNaissance}
                          onChange={(event) =>
                            updateField("dateNaissance", event.target.value)
                          }
                          required
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-sm font-semibold">
                        Telephone / WhatsApp
                        <input
                          className={inputClass}
                          type="tel"
                          value={formData.telephone}
                          onChange={(event) =>
                            updateField("telephone", event.target.value)
                          }
                          autoComplete="tel"
                          required
                        />
                      </label>
                      <label className="text-sm font-semibold">
                        Email
                        <input
                          className={inputClass}
                          type="email"
                          value={formData.email}
                          onChange={(event) =>
                            updateField("email", event.target.value)
                          }
                          autoComplete="email"
                          required
                        />
                      </label>
                    </div>
                    <label className="text-sm font-semibold">
                      Adresse (Commune / Quartier)
                      <span className="ml-2 text-xs font-medium text-[#8b8f92]">
                        Optionnel
                      </span>
                      <input
                        className={inputClass}
                        type="text"
                        value={formData.adresse}
                        onChange={(event) =>
                          updateField("adresse", event.target.value)
                        }
                      />
                    </label>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4 animate-fade-up">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Parcours academique
                      </h3>
                      <p className="text-sm text-[#5b6063]">
                        Indique ton etablissement et ton niveau.
                      </p>
                    </div>
                    <label className="text-sm font-semibold">
                      Etablissement
                      <select
                        className={inputClass}
                        value={formData.etablissement}
                        onChange={(event) =>
                          updateField("etablissement", event.target.value)
                        }
                        required
                      >
                        <option value="">-- Selectionner --</option>
                        <option value="ISAU">ISAU</option>
                        <option value="IBTP">IBTP</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </label>
                    <label className="text-sm font-semibold">
                      Filiere
                      <select
                        className={inputClass}
                        value={formData.filiere}
                        onChange={(event) =>
                          updateField("filiere", event.target.value)
                        }
                        required
                      >
                        <option value="">-- Selectionner --</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Genie civil">Genie civil</option>
                        <option value="Urbanisme">Urbanisme</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-sm font-semibold">
                        Niveau
                        <select
                          className={inputClass}
                          value={formData.niveau}
                          onChange={(event) =>
                            updateField("niveau", event.target.value)
                          }
                          required
                        >
                          <option value="">-- Selectionner --</option>
                          <option value="Finaliste">Finaliste</option>
                          <option value="Diplome">Diplome(e)</option>
                        </select>
                      </label>
                      <label className="text-sm font-semibold">
                        Annee
                        <input
                          className={inputClass}
                          type="text"
                          placeholder="Ex: 2024"
                          value={formData.annee}
                          onChange={(event) =>
                            updateField("annee", event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-fade-up">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Competences techniques
                      </h3>
                      <p className="text-sm text-[#5b6063]">
                        Selectionne les logiciels maitrises ou en apprentissage.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {softwareOptions.map((software) => (
                        <label key={software} className="cursor-pointer">
                          <input
                            className="peer sr-only"
                            type="checkbox"
                            checked={formData.logiciels.includes(software)}
                            onChange={() => toggleSoftware(software)}
                          />
                          <span className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[#2b3335] shadow-sm transition peer-checked:border-transparent peer-checked:bg-[var(--accent-strong)] peer-checked:text-white">
                            {software}
                          </span>
                        </label>
                      ))}
                    </div>
                    <label className="text-sm font-semibold">
                      Niveau global en outils numeriques
                      <select
                        className={inputClass}
                        value={formData.niveauOutils}
                        onChange={(event) =>
                          updateField("niveauOutils", event.target.value)
                        }
                        required
                      >
                        <option value="">-- Selectionner --</option>
                        <option value="Debutant">Debutant</option>
                        <option value="Intermediaire">Intermediaire</option>
                        <option value="Avance">Avance</option>
                      </select>
                    </label>
                    <p className="text-xs text-[#7a7d7f]">
                      Tu peux selectionner plusieurs logiciels.
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-fade-up">
                    <div>
                      <h3 className="text-lg font-semibold">Motivation</h3>
                      <p className="text-sm text-[#5b6063]">
                        Dis-nous pourquoi ce stage t'interesse et ce que tu veux
                        developper.
                      </p>
                    </div>
                    <label className="text-sm font-semibold">
                      Pourquoi souhaites-tu effectuer ce stage ?
                      <textarea
                        className={`${inputClass} min-h-[120px]`}
                        value={formData.motivation}
                        onChange={(event) =>
                          updateField("motivation", event.target.value)
                        }
                        placeholder="Parle d'un projet ou d'une experience marquante..."
                        required
                      />
                    </label>
                    <div className="flex items-center justify-between text-xs text-[#7a7d7f]">
                      <span>Minimum recommande: 20 caracteres</span>
                      <span>{formData.motivation.length} caracteres</span>
                    </div>
                    <label className="text-sm font-semibold">
                      Competences a developper
                      <textarea
                        className={`${inputClass} min-h-[120px]`}
                        value={formData.competences}
                        onChange={(event) =>
                          updateField("competences", event.target.value)
                        }
                        placeholder="Ex: coordination BIM, rendu 3D, gestion de projet..."
                        required
                      />
                    </label>
                    <div className="flex items-center justify-between text-xs text-[#7a7d7f]">
                      <span>Minimum recommande: 20 caracteres</span>
                      <span>{formData.competences.length} caracteres</span>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4 animate-fade-up">
                    <div>
                      <h3 className="text-lg font-semibold">Documents</h3>
                      <p className="text-sm text-[#5b6063]">
                        Ajoute ton CV en PDF. Le portfolio est optionnel.
                      </p>
                    </div>
                    <label className="text-sm font-semibold">
                      CV (PDF)
                      <input
                        className="mt-2 block w-full rounded-2xl border border-dashed border-[var(--line)] bg-white px-4 py-3 text-sm text-[#1f2a2d] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--accent-strong)] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#1c2a30]"
                        type="file"
                        accept=".pdf"
                        onChange={(event) =>
                          updateField(
                            "cv",
                            event.target.files?.[0] ?? null
                          )
                        }
                        required
                      />
                      <p className="mt-2 text-xs text-[#7a7d7f]">
                        {formData.cv ? formData.cv.name : "PDF uniquement"}
                      </p>
                    </label>
                    <label className="text-sm font-semibold">
                      Portfolio (optionnel)
                      <input
                        className="mt-2 block w-full rounded-2xl border border-dashed border-[var(--line)] bg-white px-4 py-3 text-sm text-[#1f2a2d] file:mr-4 file:rounded-full file:border-0 file:bg-[#e8dbcf] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#6d4d32] hover:file:bg-[#e0cfbf]"
                        type="file"
                        accept=".pdf,.zip"
                        onChange={(event) =>
                          updateField(
                            "portfolio",
                            event.target.files?.[0] ?? null
                          )
                        }
                      />
                      <p className="mt-2 text-xs text-[#7a7d7f]">
                        {formData.portfolio
                          ? formData.portfolio.name
                          : "PDF ou ZIP"}
                      </p>
                    </label>
                    <p className="text-xs text-[#7a7d7f]">
                      Toutes les informations resteront confidentielles.
                    </p>
                  </div>
                )}

                {attempted && !canProceed && (
                  <p className="rounded-2xl bg-[#f8efe7] px-4 py-3 text-xs text-[#8a623f]">
                    Complete les champs requis pour continuer.
                  </p>
                )}

                {submitError && (
                  <p className="rounded-2xl bg-[#fdecea] px-4 py-3 text-xs text-[#8b2c2c]">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    className="rounded-full border border-[var(--line)] bg-white px-5 py-2 text-sm font-semibold text-[#2b3335] transition hover:bg-[#f6f2ee] disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0 || isSubmitting}
                  >
                    Retour
                  </button>
                  <div className="flex flex-wrap gap-3">
                    {step < totalSteps - 1 ? (
                      <button
                        className="rounded-full bg-[var(--accent-strong)] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed || isSubmitting}
                      >
                        Continuer
                      </button>
                    ) : (
                      <button
                        className="rounded-full bg-[var(--accent-strong)] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={!canProceed || isSubmitting}
                      >
                        {isSubmitting
                          ? "Envoi en cours..."
                          : "Soumettre ma candidature"}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a7d7f]">
              Retours d'experience
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Ce que disent nos stagiaires.
            </h2>
          </div>
          <button className="rounded-full border border-[var(--line)] bg-white/70 px-5 py-2 text-sm font-semibold text-[#2b3335] transition hover:bg-white">
            Lire plus d'avis
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-[var(--line)] bg-white/90 p-6 shadow-sm"
            >
              <p className="text-sm text-[#5b6063]">"{item.quote}"</p>
              <div className="mt-5">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-[#7a7d7f]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" id="contact">
        <div className="relative overflow-hidden rounded-[36px] bg-[#101417] px-8 py-12 text-white">
          <div
            className="absolute -right-20 top-[-60px] h-64 w-64 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(199, 121, 74, 0.8), transparent 70%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                Pret a nous rejoindre
              </p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Construis ta prochaine experience sur kin ebongi.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Envoie ton portfolio, on te repond sous 5 jours avec un plan
                d'entretien. Les candidatures restent ouvertes jusqu'au 30 mars.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold">contact@kinebongi.africa</p>
              <p className="mt-2 text-xs text-white/60">
                Equipe recrutement - Dakar / Remote
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#101417]">
                  Deposer mon portfolio
                </button>
                <button className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white">
                  Poser une question
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)] text-base font-semibold text-white">
                N
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">kin ebongi</p>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  co-invest immobilier
                </p>
              </div>
            </div>
            <p className="text-sm text-[#5b6063]">
              Plateforme de co-investissement et recrutement de talents en
              architecture pour des projets immobiliers ambitieux.
            </p>
          </div>
          <div className="space-y-2 text-sm text-[#5b6063]">
            <p className="text-sm font-semibold text-[#2b3335]">Plateforme</p>
            <p>Projets</p>
            <p>Investisseurs</p>
            <p>Studio</p>
          </div>
          <div className="space-y-2 text-sm text-[#5b6063]">
            <p className="text-sm font-semibold text-[#2b3335]">Stages</p>
            <p>Offres ouvertes</p>
            <p>Mentorat</p>
            <p>FAQ</p>
          </div>
          <div className="space-y-2 text-sm text-[#5b6063]">
            <p className="text-sm font-semibold text-[#2b3335]">Contact</p>
            <p>contact@kinebongi.africa</p>
            <p>+221 77 000 00 00</p>
            <p>LinkedIn / Behance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
