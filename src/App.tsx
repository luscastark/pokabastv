/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import PredictionsDashboard from "./components/PredictionsDashboard";
import Leaderboard from "./components/Leaderboard";
import Regulations from "./components/Regulations";
import Prizes from "./components/Prizes";
import LoginModal from "./components/LoginModal";
import CopaTournament from "./components/CopaTournament";
import { User, Match, Prediction, LeaderboardUser } from "./types";
import {
  initialMatches,
  mockUsers,
  mockPredictions,
  buildLeaderboard,
  resolveTournamentBracket,
} from "./initialData";
import { Trophy, Award, Gamepad2, Info, Star, ShieldAlert, Sparkles, Gift } from "lucide-react";
// @ts-ignore
import unipioLogo from "./assets/images/unipio_logo_1780768531397.png";
// @ts-ignore
import unipioBanner from "./assets/images/unipio_banner_1780768550888.png";

export default function App() {
  // 1. Estados Centrais da Aplicação
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("pokabas_current_user_unipio");
    return saved ? JSON.parse(saved) : null;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem("pokabas_matches_unipio");
    return saved ? JSON.parse(saved) : initialMatches;
  });

  // Predictions do usuário ativo
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Todos os palpites catalogados
  const [allPredictions, setAllPredictions] = useState<Record<string, Prediction[]>>(() => {
    const saved = localStorage.getItem("pokabas_all_predictions_unipio");
    return saved ? JSON.parse(saved) : mockPredictions;
  });

  // Aba ativa: "palpites" | "copa" | "ranking" | "premios" | "regulamento"
  const [activeTab, setActiveTab] = useState<"palpites" | "copa" | "ranking" | "premios" | "regulamento">("palpites");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Tempo simulado global do sistema (Por padrão dia 06/06 - livre para apostas)
  const [mockSystemTime, setMockSystemTime] = useState<Date>(() => {
    const saved = localStorage.getItem("pokabas_system_time");
    return saved ? new Date(saved) : new Date("2026-06-06T12:00:00");
  });

  const updateMockSystemTime = (newTime: Date) => {
    setMockSystemTime(newTime);
    localStorage.setItem("pokabas_system_time", newTime.toISOString());
  };

  // 2. Sincronização automática de dados
  useEffect(() => {
    if (user) {
      const savedUserPreds = localStorage.getItem(`pokabas_preds_u_${user.id}`);
      if (savedUserPreds) {
        setPredictions(JSON.parse(savedUserPreds));
      } else {
        const defaultMockPreds = allPredictions[user.id] || [];
        setPredictions(defaultMockPreds);
        localStorage.setItem(`pokabas_preds_u_${user.id}`, JSON.stringify(defaultMockPreds));
      }
    } else {
      setPredictions([]);
    }
  }, [user, allPredictions]);

  useEffect(() => {
    localStorage.setItem("pokabas_matches_unipio", JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem("pokabas_all_predictions_unipio", JSON.stringify(allPredictions));
  }, [allPredictions]);

  // Handlers
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("pokabas_current_user_unipio", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("pokabas_current_user_unipio");
  };

  const handleSwitchUser = (selectedUser: User) => {
    setUser(selectedUser);
    localStorage.setItem("pokabas_current_user_unipio", JSON.stringify(selectedUser));
  };

  const handleSavePredictions = (updated: Prediction[]) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    setPredictions(updated);
    localStorage.setItem(`pokabas_preds_u_${user.id}`, JSON.stringify(updated));

    setAllPredictions((prev) => ({
      ...prev,
      [user.id]: updated,
    }));
  };

  const handleUpdateMatches = (updatedMatches: Match[]) => {
    setMatches(updatedMatches);
  };

  // Compilar Classificação dinamicamente baseada nos palpites salvos
  const resolvedMatches = useMemo(() => {
    return resolveTournamentBracket(matches);
  }, [matches]);

  const leaderboard: LeaderboardUser[] = useMemo(() => {
    return buildLeaderboard(resolvedMatches, user, predictions, mockUsers, allPredictions);
  }, [resolvedMatches, user, predictions, allPredictions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#0D1527] to-[#040815] text-slate-100 flex flex-col font-sans pb-28 md:pb-12 relative overflow-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* CÍRCULOS DE LUZ DECORATIVOS AMBIENTES (Glassmorphism Pro) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="absolute top-2/3 right-1/10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>

      {/* 1. CABEÇALHO INTEGRADO COM SIMULAÇÃO */}
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSwitchUser={handleSwitchUser}
        allMockUsers={mockUsers}
        mockSystemTime={mockSystemTime}
        onUpdateMockSystemTime={updateMockSystemTime}
      />

      {/* 2. CARD RETRO-FUTURISTA HERO COM BANNER E LOGO */}
      <div className="relative border-b border-white/5 py-10 px-4 select-none">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* BANNER DA HOMEPAGE COM BORDAS E GLOW */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-neutral-950/60 aspect-[16/9] max-w-3xl mx-auto group">
            <img
              src={unipioBanner}
              alt="Bolão UNIPIO Pokabas TV"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            
            {/* GRADIENT OVERLAY INTEGRADO */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-8 text-left">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div className="space-y-1 max-w-xl">
                  <span className="bg-emerald-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider inline-flex items-center gap-1">
                    <Star className="w-3 h-3 fill-black animate-spin" style={{ animationDuration: '3s' }} />
                    <span>BOLÃO COPA 2026</span>
                  </span>
                  <h2 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-md">
                    Seja parceiro oficial da emoção!
                  </h2>
                  <p className="text-[10px] md:text-xs text-slate-350 font-normal leading-relaxed">
                    Acompanhe em tempo real com as regras oficiais e o sistema integrado com probabilidades de Odds!
                  </p>
                </div>
                {!user && (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl shadow-xl transition-all border-b-2 border-emerald-700 active:translate-y-[1px] cursor-pointer hover:scale-105 select-none shrink-0"
                  >
                    Cadastrar Agora
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-3 pt-2">
            <div className="flex justify-center items-center gap-2">
              <img
                src={unipioLogo}
                alt="UNIPIO Pokabas TV"
                className="h-14 sm:h-18 w-auto object-contain drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs sm:text-sm font-normal text-slate-400 leading-relaxed">
              Junte-se à mesa oficial de palpites e conquiste prêmios incríveis demonstrando sua inteligência técnica esportiva!
            </p>
          </div>
        </div>
      </div>

      {/* 3. CONTEÚDO PRINCIPAL E ABAS SUPERIORES */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex-grow relative z-10">
        
        {/* NAVEGAÇÃO DESKTOP (GLASS STYLE) */}
        <div className="hidden md:flex justify-center gap-2 mb-8 bg-neutral-900/40 p-1.5 rounded-2xl border border-white/10 max-w-3xl mx-auto backdrop-blur-md">
          <button
            id="tab-desktop-palpites"
            onClick={() => setActiveTab("palpites")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "palpites"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Meus Palpites</span>
          </button>

          <button
            id="tab-desktop-copa"
            onClick={() => setActiveTab("copa")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "copa"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Grupos & Chaveamento</span>
          </button>

          <button
            id="tab-desktop-ranking"
            onClick={() => setActiveTab("ranking")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "ranking"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Mesa de Líderes</span>
          </button>

          <button
            id="tab-desktop-premios"
            onClick={() => setActiveTab("premios")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "premios"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Prêmios</span>
          </button>

          <button
            id="tab-desktop-regulamento"
            onClick={() => setActiveTab("regulamento")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "regulamento"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Regras</span>
          </button>
        </div>

        {/* CONTAINER DO COMPONENTE ATIVO */}
        <div className="max-w-4xl mx-auto relative z-20">
          {activeTab === "palpites" && (
            <PredictionsDashboard
              user={user}
              matches={resolvedMatches}
              predictions={predictions}
              onSavePredictions={handleSavePredictions}
              onUpdateMatches={handleUpdateMatches}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
              mockSystemTime={mockSystemTime}
            />
          )}

          {activeTab === "copa" && (
            <CopaTournament matches={matches} />
          )}

          {activeTab === "ranking" && (
            <Leaderboard currentUser={user} leaderboard={leaderboard} />
          )}

          {activeTab === "premios" && (
            <Prizes />
          )}

          {activeTab === "regulamento" && (
            <Regulations />
          )}
        </div>

      </main>

      {/* 4. NAVEGAÇÃO MOBILE BOT-BAR (4 ABAS FOCADAS EM MOBILE-FIRST) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0F1E]/95 border-t border-white/10 shadow-2xl py-2 px-4 flex md:hidden justify-around items-center z-45 select-none rounded-t-3xl backdrop-blur-3xl">
        <button
          id="btn-tab-mobile-palpites"
          onClick={() => setActiveTab("palpites")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "palpites" ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          <Gamepad2 className="w-5.5 h-5.5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Palpites</span>
        </button>

        <button
          id="btn-tab-mobile-copa"
          onClick={() => setActiveTab("copa")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "copa" ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          <Trophy className="w-5.5 h-5.5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Copa 2026</span>
        </button>

        <button
          id="btn-tab-mobile-ranking"
          onClick={() => setActiveTab("ranking")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "ranking" ? "text-emerald-450 text-emerald-400" : "text-slate-500"
          }`}
        >
          <Trophy className="w-5.5 h-5.5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Líderes</span>
        </button>

        <button
          id="btn-tab-mobile-premios"
          onClick={() => setActiveTab("premios")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "premios" ? "text-emerald-450 text-emerald-400" : "text-slate-500"
          }`}
        >
          <Gift className="w-5.5 h-5.5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Prêmios</span>
        </button>

        <button
          id="btn-tab-mobile-regulamento"
          onClick={() => setActiveTab("regulamento")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "regulamento" ? "text-emerald-450 text-emerald-400" : "text-slate-500"
          }`}
        >
          <Info className="w-5.5 h-5.5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Regras</span>
        </button>
      </div>

      {/* 5. MODAL DE CADASTRO OBRIGATÓRIO */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      )}

    </div>
  );
}
