"use client";

import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <p className="text-3xl text-red-300">Netflix Clone</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Se déconnecter
      </button>
    </>
  );
}
