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
  getAutomatedMatchStatus,
} from "./initialData";
import { Trophy, Award, Gamepad2, Info, Star, ShieldAlert, Sparkles, Gift, LogOut, LogIn } from "lucide-react";
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

  // Estados para sincronização de resultados online e status de sync
  const [onlineMatches, setOnlineMatches] = useState<any[]>([]);
  const [syncStatus, setSyncStatus] = useState<"connecting" | "synced" | "simulation">("connecting");

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
  // 2. Efeito de sincronização de resultados online (polling)
  useEffect(() => {
    const fetchOnlineScores = async () => {
      try {
        const res = await fetch("/api/matches");
        if (res.ok) {
          const data = await res.json();
          if (data && data.source === "online" && data.matches && data.matches.length > 0) {
            setOnlineMatches(data.matches);
            setSyncStatus("synced");
          } else {
            setSyncStatus("simulation");
          }
        } else {
          setSyncStatus("simulation");
        }
      } catch (err) {
        console.warn("Failed to fetch online scores, using temporal simulation:", err);
        setSyncStatus("simulation");
      }
    };

    fetchOnlineScores();
    const interval = setInterval(fetchOnlineScores, 30000);
    return () => clearInterval(interval);
  }, []);

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

  // Aplicar o status automático temporal ou online para cada partida
  const activeMatches = useMemo(() => {
    return matches.map((m) => {
      const onlineMatch = onlineMatches.find((om) => om.id === m.id);
      return getAutomatedMatchStatus(m, mockSystemTime, onlineMatch);
    });
  }, [matches, mockSystemTime, onlineMatches]);

  // Resolver o chaveamento a partir dos jogos ativos
  const resolvedMatches = useMemo(() => {
    return resolveTournamentBracket(activeMatches);
  }, [activeMatches]);

  const leaderboard: LeaderboardUser[] = useMemo(() => {
    return buildLeaderboard(resolvedMatches, user, predictions, mockUsers, allPredictions);
  }, [resolvedMatches, user, predictions, allPredictions]);

  return (
    <div className="min-h-screen bg-[#0B1528] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* CÍRCULOS DE LUZ DECORATIVOS AMBIENTES (Glassmorphism Pro) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="absolute top-2/3 right-1/10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>

      {/* ÁREA PRINCIPAL DA PÁGINA (Inteira em todos os dispositivos) */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen pb-28">
        
        {/* Header Adaptativo (Top bar no desktop, Header fixo no mobile) */}
        <Header
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onSwitchUser={handleSwitchUser}
          allMockUsers={mockUsers}
          mockSystemTime={mockSystemTime}
          onUpdateMockSystemTime={updateMockSystemTime}
        />

        {/* CONTEÚDO DA PÁGINA */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 pb-28 md:pb-12 relative z-10">
          
          <div className="relative z-20">
            {activeTab === "palpites" && (
              <PredictionsDashboard
                user={user}
                matches={resolvedMatches}
                predictions={predictions}
                onSavePredictions={handleSavePredictions}
                onUpdateMatches={handleUpdateMatches}
                onOpenLoginModal={() => setIsLoginModalOpen(true)}
                mockSystemTime={mockSystemTime}
                syncStatus={syncStatus}
                leaderboard={leaderboard}
              />
            )}

            {activeTab === "copa" && (
              <CopaTournament matches={activeMatches} />
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
      </div>

      {/* BARRA DE NAVEGAÇÃO FIXA NA PARTE INFERIOR (Responsiva e Premium) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 select-none pb-safe">
        <div className="mx-auto w-full md:max-w-2xl bg-[#0A0F1E]/95 md:bg-white border-t border-white/10 md:border md:border-slate-100 md:rounded-2xl py-3 px-6 shadow-2xl md:shadow-emerald-500/5 backdrop-blur-3xl md:backdrop-blur-none flex justify-around md:justify-between items-center gap-2 md:bottom-4 md:relative">
          
          <button
            onClick={() => setActiveTab("palpites")}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "palpites"
                ? "text-emerald-450 md:bg-[#0B1B3D] md:text-white"
                : "text-slate-500 md:text-[#8A9BB4] md:hover:text-[#0B1B3D]"
            }`}
          >
            <Gamepad2 className="w-5.5 h-5.5 md:w-4.5 md:h-4.5" />
            <span className="text-[9px] md:text-xs font-black uppercase tracking-tight md:tracking-wider">Palpites</span>
          </button>

          <button
            onClick={() => setActiveTab("copa")}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "copa"
                ? "text-emerald-450 md:bg-[#0B1B3D] md:text-white"
                : "text-slate-500 md:text-[#8A9BB4] md:hover:text-[#0B1B3D]"
            }`}
          >
            <Trophy className="w-5.5 h-5.5 md:w-4.5 md:h-4.5" />
            <span className="text-[9px] md:text-xs font-black uppercase tracking-tight md:tracking-wider">Copa 2026</span>
          </button>

          <button
            onClick={() => setActiveTab("ranking")}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "ranking"
                ? "text-emerald-455 text-emerald-400 md:bg-[#0B1B3D] md:text-white"
                : "text-slate-500 md:text-[#8A9BB4] md:hover:text-[#0B1B3D]"
            }`}
          >
            <Trophy className="w-5.5 h-5.5 md:w-4.5 md:h-4.5" />
            <span className="text-[9px] md:text-xs font-black uppercase tracking-tight md:tracking-wider">Líderes</span>
          </button>

          <button
            onClick={() => setActiveTab("premios")}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "premios"
                ? "text-emerald-455 text-emerald-400 md:bg-[#0B1B3D] md:text-white"
                : "text-slate-500 md:text-[#8A9BB4] md:hover:text-[#0B1B3D]"
            }`}
          >
            <Gift className="w-5.5 h-5.5 md:w-4.5 md:h-4.5" />
            <span className="text-[9px] md:text-xs font-black uppercase tracking-tight md:tracking-wider">Prêmios</span>
          </button>

          <button
            onClick={() => setActiveTab("regulamento")}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "regulamento"
                ? "text-emerald-455 text-emerald-400 md:bg-[#0B1B3D] md:text-white"
                : "text-slate-500 md:text-[#8A9BB4] md:hover:text-[#0B1B3D]"
            }`}
          >
            <Info className="w-5.5 h-5.5 md:w-4.5 md:h-4.5" />
            <span className="text-[9px] md:text-xs font-black uppercase tracking-tight md:tracking-wider">Regras</span>
          </button>

          <div className="hidden md:block border-l border-slate-200 pl-2">
            {user ? (
              <button
                onClick={handleLogout}
                title="Sair"
                className="p-2 rounded-xl text-[#8A9BB4] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1 text-xs font-black uppercase tracking-wider"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Sair</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                title="Entrar"
                className="p-2 rounded-xl text-emerald-600 hover:text-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer flex items-center gap-1 text-xs font-black uppercase tracking-wider"
              >
                <LogIn className="w-4.5 h-4.5" />
                <span>Entrar</span>
              </button>
            )}
          </div>

        </div>
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
