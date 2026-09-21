'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useOperador, MAPA_TURNOS } from '@/context/operador-context';

const navItems = [
  { href: '/', label: 'Cargar Datos' },
  { href: '/historial', label: 'Historial' },
  { href: '/guia-dosificacion', label: 'Guía Dosificación' },
  { href: '/guia-parshall', label: 'Guía Parshall' },
];

export function Header() {
  const pathname = usePathname();
  const { operadorActual, turnoActivo, horaActualSistema, abrirModalOperador, setTurnoActivo, operadoresTurnos } = useOperador();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="flex h-12 items-center px-3 gap-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.jpg" alt="SPSE Logo" width={36} height={36} priority />
          <span className="text-sm font-bold text-primary hidden md:block">SPSE Laboratorio</span>
        </Link>

        {/* NAVEGACIÓN ESCRITORIO */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-xs font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* SELECTOR DE TURNOS (solo en página principal) */}
        {pathname === '/' && (
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded border shrink-0">
            {Object.keys(MAPA_TURNOS).map((t) => (
              <button
                key={t}
                onClick={() => abrirModalOperador(t)}
                className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${
                  turnoActivo === t
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* FICHA OPERADOR + RELOJ */}
        <div
          onClick={() => abrirModalOperador()}
          className="flex items-center gap-2 border border-sky-300 bg-sky-50 hover:bg-sky-100 px-3 py-1 rounded-lg cursor-pointer transition-all shrink-0 ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
              {operadorActual}
              <span className="text-sky-500 font-normal ml-1 text-[10px]">(Editar)</span>
            </span>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span>Turno: <strong className="text-slate-700">{turnoActivo}</strong></span>
              <span className="font-mono text-emerald-600 font-extrabold text-xs">{horaActualSistema}</span>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-4">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.jpg" alt="SPSE Logo" width={48} height={48} />
                  <span className="text-base font-bold text-primary">SPSE Laboratorio</span>
                </Link>
                <nav className="grid gap-3 mt-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-sm font-medium transition-colors hover:text-primary',
                          pathname === item.href ? 'text-primary font-bold' : 'text-muted-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}