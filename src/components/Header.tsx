/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User } from "../types";
import { LogIn, LogOut, Trophy, Sparkles, UserCheck, Calendar, Clock, Eye } from "lucide-react";
// @ts-ignore
import unipioLogo from "../assets/images/unipio_logo_1780768531397.png";

interface HeaderProps {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onSwitchUser: (usr: User) => void;
  allMockUsers: User[];
  mockSystemTime: Date;
  onUpdateMockSystemTime: (newTime: Date) => void;
}

export default function Header({
  user,
  onLogin,
  onLogout,
  onSwitchUser,
  allMockUsers,
  mockSystemTime,
  onUpdateMockSystemTime,
}: HeaderProps) {
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const timePresets = [
    {
      label: "Fase de Grupos Inicial (Aberto)",
      dateStr: "06/06/2026 12:00",
      time: new Date("2026-06-06T12:00:00"),
    },
    {
      label: "J-30min Grupo A (México x EUA)",
      dateStr: "11/06/2026 16:30",
      time: new Date("2026-06-11T16:30:00"),
    },
    {
      label: "Fim das Oitavas (Todos Finalizados)",
      dateStr: "30/06/2026 12:00",
      time: new Date("2026-06-30T12:00:00"),
    },
  ];

  const handleQuickLogin = () => {
    // Entrar com o Google Simulado One-Tap direto
    const defaultUser: User = {
      id: "u_curr",
      name: "Chuteira de Ouro",
      fullName: "Chuteira de Ouro Júnior",
      cpf: "123.456.789-00",
      phone: "(79) 99123-4567",
      email: "chuteira@unipio.edu.br",
      education: "Ensino Superior Completo",
      cityState: "Aracaju / SE",
      instagram: "@chuteiradeouro",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    };
    onLogin(defaultUser);
  };

  const getFormattedDate = (dateObj: Date) => {
    return dateObj.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* LOGO UNIPIO POKABAS TV - Estética esportiva premium original */}
        <div className="flex items-center gap-2.5 select-none">
          <img
            src={unipioLogo}
            alt="UNIPIO Pokabas TV Logo"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col items-start leading-none">
            <span className="text-white font-sans font-black tracking-wider text-[10px] uppercase leading-none">
              BOLÃO OFICIAL
            </span>
            <span className="text-[9px] text-emerald-400 uppercase font-mono tracking-widest font-extrabold mt-0.5 leading-none">
              🏆 Copa 2026
            </span>
          </div>
        </div>

        {/* CONTROLES DE SIMULAÇÃO & USUÁRIO */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          
          {/* SELETOR DE TEMPO SIMULADO DO SISTEMA */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTimeDropdown(!showTimeDropdown);
                setShowSwitchDropdown(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all font-mono text-[11px] font-bold text-yellow-400 flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Ajustar o relógio do sistema para simular bloqueios automatizados"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Simular Hoje: {getFormattedDate(mockSystemTime)}</span>
            </button>

            {showTimeDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-neutral-900/95 border border-white/15 rounded-xl shadow-2xl p-2 z-50 text-xs text-white backdrop-blur-2xl">
                <p className="px-2 py-1.5 font-bold uppercase text-[9px] tracking-wider text-slate-400 border-b border-white/5 mb-1.5">
                  Simulador de Horário
                </p>
                <div className="space-y-1">
                  {timePresets.map((preset, index) => {
                    const isSelected = getFormattedDate(mockSystemTime) === getFormattedDate(preset.time);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          onUpdateMockSystemTime(preset.time);
                          setShowTimeDropdown(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg hover:bg-white/[0.08] transition-colors flex flex-col gap-0.5 cursor-pointer ${
                          isSelected ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400" : ""
                        }`}
                      >
                        <span className="font-semibold text-xs leading-none">
                          {preset.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {preset.dateStr}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="pt-2 mt-2 border-t border-white/5 text-[9px] text-yellow-400 font-medium px-2">
                  💡 Ajuste para testar a trava de palpites e cálculos automáticos de placares!
                </div>
              </div>
            )}
          </div>

          {/* ESTADO DO USUÁRIO */}
          {user ? (
            <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl pl-2.5 pr-2.5 py-1.5 border border-white/10 relative shadow-md">
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7.5 h-7.5 rounded-full border border-emerald-400 object-cover shadow-sm shadow-emerald-400/20"
              />
              <div className="text-left hidden xs:block">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold leading-tight uppercase tracking-tight max-w-[100px] truncate">
                    {user.name}
                  </p>
                  {user.isAdmin && (
                    <span className="bg-emerald-400 text-black text-[8px] font-black uppercase px-1 rounded">
                      CMD
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-slate-400 leading-tight truncate max-w-[110px]" title={user.email}>
                  {user.email}
                </p>
              </div>

              {/* SIMULAR OUTRO USUÁRIO (MOCK CLASSIFICAÇÃO) */}
              <div className="relative ml-1.5">
                <button
                  id="btn-switch-user"
                  onClick={() => {
                    setShowSwitchDropdown(!showSwitchDropdown);
                    setShowTimeDropdown(false);
                  }}
                  className="px-2 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-355 border border-teal-500/20 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                  title="Simular visualização como outro participante para testar o painel"
                >
                  <UserCheck className="w-3 h-3 text-teal-400" />
                  <span className="text-teal-300">Trocar</span>
                </button>

                {showSwitchDropdown && (
                  <div className="absolute right-0 mt-2 w-60 bg-neutral-900/95 border border-white/15 rounded-xl shadow-2xl p-2 z-50 text-xs text-white backdrop-blur-2xl">
                    <p className="px-2 py-1.5 font-bold uppercase text-[9px] tracking-wider text-slate-400 border-b border-white/5 mb-1.5">
                      Trocar de Participante:
                    </p>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {allMockUsers.map((mockUsr) => (
                        <button
                          key={mockUsr.id}
                          onClick={() => {
                            onSwitchUser(mockUsr);
                            setShowSwitchDropdown(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-md hover:bg-white/[0.08] transition-colors flex items-center gap-2 cursor-pointer ${
                            user.id === mockUsr.id ? "bg-emerald-500/10 text-emerald-400 font-bold" : ""
                          }`}
                        >
                          <img
                            src={mockUsr.avatarUrl}
                            alt={mockUsr.name}
                            className="w-5 h-5 rounded-full object-cover border border-white/15"
                          />
                          <span className="truncate text-xs">{mockUsr.name}</span>
                          {mockUsr.isAdmin && (
                            <span className="ml-auto bg-blue-500 text-white text-[7px] font-black uppercase px-0.5 rounded">
                              Host
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SAIR */}
              <button
                id="btn-logout"
                onClick={onLogout}
                title="Sair"
                className="ml-1 text-white/50 hover:text-red-400 hover:bg-red-500/10 p-1 rounded transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="btn-login-google"
              onClick={handleQuickLogin}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 text-[11px] cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
