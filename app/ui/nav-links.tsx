'use client';

import {
  HomeIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTicketStore } from '../lib/store/ticketStore';

export default function NavLinks() {
  const pathname = usePathname();
  const toggleCart = useTicketStore((state) => state.toggleCart);
  const totalDetail = useTicketStore((state) => state.totalDetail);
  const seatCount = totalDetail?.total ?? 0;
  return (
    <>
      <Link
        href="/"
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
          {
            'bg-sky-100 text-blue-600': pathname === '/',
          },
        )}
      >
        <HomeIcon className="w-6" />
        <p className="hidden md:block">Inicio</p>
      </Link>

      <button
        onClick={toggleCart}
        className="relative flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <ShoppingCartIcon className="w-6" />
        <p className="hidden md:block">Carrito</p>
        {seatCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {seatCount}
          </span>
        )}
      </button>
    </>
  );
}
