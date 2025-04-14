'use client';

import Image from "next/image";
import Header from "./ui/header";
import SearchForm from "./ui/form/search-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center gap-8">
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
          <Image
            src="/banner-desktop.png"
            fill
            priority
            className="hidden md:block object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Banner image of the bus company desktop version"
          />
          <Image
            src="/banner-mobile.png"
            fill
            priority
            className="block md:hidden"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Banner image of the bus company mobile version"
          />
        </div>
        <Suspense>
          <SearchForm />
        </Suspense>
      </main>
      <footer className="flex flex-row items-center justify-center gap-8 p-8">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="text-xl font-bold text-blue-800">¿Necesitas ayuda?</h2>
          <p className="text-gray-600">Contáctanos al 123-456-7890</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="text-xl font-bold text-blue-800">Síguenos en redes sociales</h2>
          <p className="text-gray-600">Facebook | Twitter | Instagram</p>
        </div>
      </footer>
    </>
  );
}
