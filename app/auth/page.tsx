"use client";

import Input from "@/components/input";
import { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Connexion" : "Inscription"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Nom d'utilisateur"
                  onChange={(e: any) => setUsername(e.target?.value)}
                  id="name"
                  value={username}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target?.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Mot de passe"
                onChange={(e: any) => setPassword(e.target?.value)}
                id="email"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 text-white rounded-md px-6 py-3 w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Se connecter" : "S'inscrire"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login" ? "Nouveau sur netflix ?" : "Déjà inscrit ?"}
              <span
                onClick={toggleVariant}
                className="text-sm text-white ml-1 hover:underline cursor:pointer"
              >
                {variant === "login" ? "Inscrivez-vous." : "Connectez-vous"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
