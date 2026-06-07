/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { Match, Prediction, User, ScoreDetail, LeaderboardUser } from "../types";
import { calculatePredictionPoints, getFlagUrl } from "../initialData";
import { Save, Filter, ShieldCheck, Sparkles, AlertCircle, RefreshCw, Trophy, Clock, Lock, Play, Compass, HelpCircle } from "lucide-react";
import UserStatsHero from "./UserStatsHero";
// @ts-ignore
import unipioBanner from "../assets/images/unipio_banner_1780768550888.png";

interface PredictionsDashboardProps {
  user: User | null;
  matches: Match[];
  predictions: Prediction[];
  onSavePredictions: (updated: Prediction[]) => void;
  onUpdateMatches: (updatedMatches: Match[]) => void;
  onOpenLoginModal: () => void;
  mockSystemTime: Date;
  syncStatus?: "connecting" | "synced" | "simulation";
  leaderboard: LeaderboardUser[];
}

export default function PredictionsDashboard({
  user,
  matches,
  predictions,
  onSavePredictions,
  onUpdateMatches,
  onOpenLoginModal,
  mockSystemTime,
  syncStatus = "simulation",
  leaderboard,
}: PredictionsDashboardProps) {
  // Estado local dos palpites digitados
  const [localPreds, setLocalPreds] = useState<Record<string, { g1: string; g2: string }>>(() => {
    const initial: Record<string, { g1: string; g2: string }> = {};
    matches.forEach((m) => {
      const pred = predictions.find((p) => p.matchId === m.id);
      initial[m.id] = {
        g1: pred?.goals1 ?? "",
        g2: pred?.goals2 ?? "",
      };
    });
    return initial;
  });

  // Atualizar localPreds caso as predictions mudem (ex: troca de usuário)
  useEffect(() => {
    const updated: Record<string, { g1: string; g2: string }> = {};
    matches.forEach((m) => {
      const pred = predictions.find((p) => p.matchId === m.id);
      updated[m.id] = {
        g1: pred?.goals1 ?? "",
        g2: pred?.goals2 ?? "",
      };
    });
    setLocalPreds(updated);
  }, [predictions, matches]);

  const [activeTab, setActiveTab] = useState<string>("Todos");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Estado para o "Simulador de Pontos" interativo independente
  const [simSelectedMatchId, setSimSelectedMatchId] = useState<string>(matches[0]?.id ?? "");
  const [simUserPredGoals1, setSimUserPredGoals1] = useState<string>("2");
  const [simUserPredGoals2, setSimUserPredGoals2] = useState<string>("1");
  const [simRealResultGoals1, setSimRealResultGoals1] = useState<string>("2");
  const [simRealResultGoals2, setSimRealResultGoals2] = useState<string>("1");

  const groupsArr = [
    "Todos",
    "Grupo A",
    "Grupo B",
    "Grupo C",
    "Grupo D",
    "Grupo E",
    "Grupo F",
    "Grupo G",
    "Grupo H",
    "Grupo I",
    "Grupo J",
    "Grupo K",
    "Grupo L",
    "Fase Final"
  ];

  // Helper para converter string de data/tempo em objeto Date do JavaScript
  const parseMatchDateTime = (dateStr: string, timeStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  // Calcula se a rodada/grupo inteiro do jogo está travada (Locks 1h antes do primeiro jogo da rodada)
  const getRoundLockStatus = (groupName: string): { isLocked: boolean; firstGameInfo: string } => {
    const roundMatches = matches.filter((m) => m.group === groupName);
    if (roundMatches.length === 0) return { isLocked: false, firstGameInfo: "" };

    const sortedMatches = [...roundMatches].sort((a, b) => {
      return parseMatchDateTime(a.date, a.time).getTime() - parseMatchDateTime(b.date, b.time).getTime();
    });

    const firstMatch = sortedMatches[0];
    const firstMatchTime = parseMatchDateTime(firstMatch.date, firstMatch.time);

    // Diferença em minutos
    const diffMs = firstMatchTime.getTime() - mockSystemTime.getTime();
    const diffMins = diffMs / (1000 * 60);

    // Se faltar menos de 60 minutos (ou já tiver passado), bloqueia!
    const isLocked = diffMins < 60;
    
    const formattedFirstMatchTime = firstMatchTime.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    return {
      isLocked,
      firstGameInfo: `Primeiro jogo em: ${firstMatch.date} às ${formattedFirstMatchTime}`,
    };
  };

  const handleGoalChange = (matchId: string, team: 1 | 2, value: string, isMatchLocked: boolean) => {
    // Se o jogo está bloqueado por tempo, não atualiza!
    if (isMatchLocked) return;

    const cleanValue = value.replace(/[^0-9]/g, "");
    setLocalPreds((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team === 1 ? "g1" : "g2"]: cleanValue,
      },
    }));
    if (saveStatus === "saved") {
      setSaveStatus("idle");
    }
  };

  const handleSave = () => {
    if (!user) {
      onOpenLoginModal();
      return;
    }

    setSaveStatus("saving");

    // Salva apenas os palpites dos jogos que NÃO estão trancados
    const toSave: Prediction[] = Object.entries(localPreds).map(([matchId, data]) => {
      const typedData = data as { g1: string; g2: string };
      const match = matches.find((m) => m.id === matchId);
      const isLocked = match ? getRoundLockStatus(match.group).isLocked : false;

      // Se já estava salvo anteriormente, mantém, senão salva o local se não estiver bloqueado
      const previousPred = predictions.find((p) => p.matchId === matchId);

      return {
        matchId,
        goals1: isLocked ? (previousPred?.goals1 ?? "") : typedData.g1,
        goals2: isLocked ? (previousPred?.goals2 ?? "") : typedData.g2,
        updatedAt: new Date().toISOString(),
      };
    });

    setTimeout(() => {
      onSavePredictions(toSave);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 600);
  };

  // Simulação de placares oficiais administrados
  const handleSimulateGameResult = (
    matchId: string,
    g1: number,
    g2: number,
    finish: boolean,
    knockoutWinnerCode?: string
  ) => {
    const updated = matches.map((m) => {
      if (m.id === matchId) {
        return {
          ...m,
          simulatedResult1: g1,
          simulatedResult2: g2,
          isFinished: finish,
          knockoutWinnerCode: knockoutWinnerCode !== undefined ? knockoutWinnerCode : m.knockoutWinnerCode,
        };
      }
      return m;
    });
    onUpdateMatches(updated);
  };

  // Filtro de alterações não salvas
  const hasUnsavedChanges = useMemo(() => {
    return matches.some((m) => {
      // Jogos bloqueados não podem criar alterações não salvas por alterações manuais
      const lockData = getRoundLockStatus(m.group);
      if (lockData.isLocked) return false;

      const parentPred = predictions.find((p) => p.matchId === m.id);
      const parentG1 = parentPred?.goals1 ?? "";
      const parentG2 = parentPred?.goals2 ?? "";
      const localG1 = localPreds[m.id]?.g1 ?? "";
      const localG2 = localPreds[m.id]?.g2 ?? "";
      return parentG1 !== localG1 || parentG2 !== localG2;
    });
  }, [localPreds, predictions, matches, mockSystemTime]);

  const filteredMatches = matches.filter((m) => {
    if (activeTab === "Todos") return true;
    if (activeTab === "Fase Final") {
      return m.group.includes("Oitavas") || m.group.includes("Quartas") || m.group.includes("Semifinal") || m.group.includes("Final");
    }
    return m.group === activeTab;
  });

  // Calcula a simulação interativa de pontuação para o bloco "Simulador de Pontos"
  const simMatchSelected = useMemo(() => {
    return matches.find((m) => m.id === simSelectedMatchId) ?? matches[0];
  }, [matches, simSelectedMatchId]);

  const simResultCalculated = useMemo(() => {
    if (!simMatchSelected) return null;

    // Constrói objetos artificiais baseados nos inputs do formulário do simulador
    const mockM: Match = {
      ...simMatchSelected,
      simulatedResult1: parseInt(simRealResultGoals1, 10) || 0,
      simulatedResult2: parseInt(simRealResultGoals2, 10) || 0,
      isFinished: true,
    };

    const mockP: Prediction = {
      matchId: simMatchSelected.id,
      goals1: simUserPredGoals1,
      goals2: simUserPredGoals2,
      updatedAt: new Date().toISOString(),
    };

    return calculatePredictionPoints(mockP, mockM);
  }, [simMatchSelected, simUserPredGoals1, simUserPredGoals2, simRealResultGoals1, simRealResultGoals2]);

  return (
    <div className="space-y-6 text-white leading-relaxed">
      
      {/* BANNER GIGANTE HERO NO TOPO (Como uma Landing Page) */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/10 bg-[#0B1528] group select-none">
        <img
          src={unipioBanner}
          alt="Bolão UNIPIO Pokabas TV"
          className="w-full h-auto object-contain block"
          referrerPolicy="no-referrer"
        />

        {/* Texto Ancorado no Topo (Landing Page Style) */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 bg-transparent">
          {/* Linha superior: Informações de Segurança */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
            <div className="flex items-center gap-2 bg-[#0B1528]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white shadow-lg select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-widest text-emerald-400">
                Recreativo & 100% Gratuito
              </span>
            </div>

            <div className="bg-[#0B1528]/95 border border-red-500/40 backdrop-blur-md text-red-400 text-[8px] sm:text-[9px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider flex items-center gap-1.5 shadow-lg select-none">
              <span>🚫 SEM APOSTAS FINANCEIRAS / NÃO É SITE DE APOSTAS</span>
            </div>
          </div>

          {/* Linha inferior: Textos de brincadeira e prêmios */}
          <div className="space-y-1.5 sm:space-y-3 mt-auto pb-2 sm:pb-4 max-w-2xl text-left drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
            <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none">
              Uma brincadeira e muitos prêmios!
            </h1>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-200 font-normal leading-relaxed max-w-lg">
              Entretenimento esportivo gratuito para amigos e parceiros da Pokabas TV. Divirta-se sem taxas, crie palpites sem riscos e dispute prêmios oficiais!
            </p>
          </div>
        </div>
      </div>

      {/* 0. HERO DASHBOARD DE ESTATÍSTICAS DO PALPITEIRO (Estilo Chelsea reference) */}
      <UserStatsHero
        user={user}
        leaderboard={leaderboard}
        predictions={predictions}
        matches={matches}
      />
      
      {/* 1. SELETOR E COMPONENTE INTEGRADO DE SIMULADOR DE PONTOS EXATO */}
      <div className="p-6 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-md space-y-4">
        
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Sparkles className="w-5 h-5 text-yellow-405 text-yellow-300 fill-yellow-300 animate-pulse" />
          <h3 className="text-sm font-sans font-black uppercase tracking-wider text-white">
            Simulador de Pontuação UNIPIO (Odds & Placares)
          </h3>
        </div>

        <p className="text-xs text-slate-350 leading-relaxed font-normal">
          Selecione qualquer confronto oficial e digite seu palpite pretendido + resultado fictício final para simular em tempo real quantos pontos você receberia com as regras de Odds!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          {/* SELETOR DE PARTIDA */}
          <div className="space-y-1.5 md:col-span-2 text-left">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">1. Escolha a Partida:</label>
            <select
              value={simSelectedMatchId}
              onChange={(e) => setSimSelectedMatchId(e.target.value)}
              className="w-full text-xs font-bold leading-tight uppercase bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.team1.flag} {m.team1.code} x {m.team2.code} {m.team2.flag} ({m.group})
                </option>
              ))}
            </select>
            {simMatchSelected && (
              <span className="text-[10px] text-slate-400 mt-1 block">
                ⭐ {simMatchSelected.team1.name} é o{" "}
                <strong className={simMatchSelected.isFavoriteTeam1 ? "text-emerald-450" : "text-yellow-450 text-yellow-300"}>
                  {simMatchSelected.isFavoriteTeam1 ? "Favorito" : "Zebra"}
                </strong>
                . {simMatchSelected.team2.name} é o{" "}
                <strong className={!simMatchSelected.isFavoriteTeam1 ? "text-emerald-450" : "text-yellow-450 text-yellow-300"}>
                  {!simMatchSelected.isFavoriteTeam1 ? "Favorito" : "Zebra"}
                </strong>
                .
              </span>
            )}
          </div>

          {/* PALPITE DO USUÁRIO NO SIMULADOR */}
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center space-y-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">2. Seu Palpite:</label>
            <div className="flex items-center justify-center gap-1.5">
              <input
                type="number"
                min="0"
                value={simUserPredGoals1}
                onChange={(e) => setSimUserPredGoals1(e.target.value)}
                className="w-9 h-9 text-center text-sm font-black bg-neutral-950 rounded border border-white/15 focus:border-yellow-450 focus:border-yellow-400 outline-none"
              />
              <span className="text-[9px] text-slate-400">x</span>
              <input
                type="number"
                min="0"
                value={simUserPredGoals2}
                onChange={(e) => setSimUserPredGoals2(e.target.value)}
                className="w-9 h-9 text-center text-sm font-black bg-neutral-950 rounded border border-white/15 focus:border-yellow-450 focus:border-yellow-400 outline-none"
              />
            </div>
          </div>

          {/* PLACAR REAL SIMULADO */}
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center space-y-1.5">
            <label className="text-[9px] font-black uppercase text-red-400 tracking-wider block">3. Placar Final:</label>
            <div className="flex items-center justify-center gap-1.5 font-bold">
              <input
                type="number"
                min="0"
                value={simRealResultGoals1}
                onChange={(e) => setSimRealResultGoals1(e.target.value)}
                className="w-9 h-9 text-center text-sm font-black bg-neutral-950 rounded border border-white/15 focus:border-red-450 outline-none"
              />
              <span className="text-[9px] text-slate-400">x</span>
              <input
                type="number"
                min="0"
                value={simRealResultGoals2}
                onChange={(e) => setSimRealResultGoals2(e.target.value)}
                className="w-9 h-9 text-center text-sm font-black bg-neutral-950 rounded border border-white/15 focus:border-red-450 outline-none"
              />
            </div>
          </div>

        </div>

        {/* RESULTADO DETALHADO DO SIMULADOR */}
        {simResultCalculated && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 items-center justify-between">
            <div className="col-span-2 text-left space-y-1 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/15">
              <p className="text-[9px] text-emerald-400 uppercase font-black tracking-widest">Resultado do Calculador</p>
              <h4 className="text-xl font-mono font-black text-white flex items-baseline gap-1">
                {simResultCalculated.points}
                <span className="text-xs text-slate-400 uppercase font-bold">pontos totais</span>
              </h4>
            </div>

            {/* BREAKDOWN PILLS */}
            <div className="text-center p-2 bg-neutral-950/40 rounded-xl space-y-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none">Pontos de Placar</span>
              <span className="text-xs font-mono font-black text-emerald-400">
                {simResultCalculated.isExact ? "+5 Exato" : simResultCalculated.isWinner ? "+3 Vencedor" : "0 pt"}
              </span>
            </div>

            <div className="text-center p-2 bg-neutral-950/40 rounded-xl space-y-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none">Pontos Base (Odds)</span>
              <span className="text-xs font-mono font-black text-yellow-405 text-yellow-300">
                +{simResultCalculated.basePoints} {simResultCalculated.baseType}
              </span>
            </div>

            <div className="text-center p-2 bg-neutral-950/40 rounded-xl space-y-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none">Bônus Extras</span>
              <span className="text-xs font-mono font-black text-amber-500 text-yellow-400">
                {simResultCalculated.isGoalDiff ? "+2 Saldo " : ""}
                {simResultCalculated.isLoserGoals ? "+1 Derrotado " : ""}
                {simResultCalculated.isGoleada ? "+1 Goleada " : ""}
                {!simResultCalculated.isGoalDiff && !simResultCalculated.isLoserGoals && !simResultCalculated.isGoleada ? "Nenhum" : ""}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* 2. BARRA DE STATUS ONLINE / SIMULAÇÃO E FILTRO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/40 p-4 border border-white/10 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-lg font-sans font-black uppercase tracking-tight flex items-center gap-2">
            <Compass className="text-emerald-400 w-5 h-5" />
            <span>Fazer Palpites de Líder</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            {user ? `Seja bem-vindo, líder ${user.name}! Não esqueça de salvar suas modificações.` : "Cadastre-se usando o painel superior para registrar palpites reais!"}
          </p>
        </div>

        {/* STATUS INDICATOR BADGE */}
        <div className="flex items-center gap-2">
          {syncStatus === "synced" && (
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>📡 Resultados Sincronizados Online</span>
            </span>
          )}
          {syncStatus === "simulation" && (
            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>⏱️ Simulação Temporal Ativa</span>
            </span>
          )}
          {syncStatus === "connecting" && (
            <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm animate-pulse">
              <span>🔄 Conectando aos resultados...</span>
            </span>
          )}
        </div>
      </div>

      {/* TABS DE FILTRO POR GRUPO */}
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-1.5 pb-1 border-b border-white/10">
          {groupsArr.map((group) => (
            <button
              key={group}
              id={`tab-group-${group.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setActiveTab(group)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTab === group
                  ? "bg-emerald-505 bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                  : "bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 border border-white/10"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* LISTAGEM DE CONFRONTOS */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/10 text-center text-slate-400">
            <AlertCircle className="w-6 h-6 mx-auto mb-2" />
            <p className="text-xs font-semibold uppercase tracking-wider">Nenhum confronto nesta aba.</p>
          </div>
        ) : (
          filteredMatches.map((match) => {
            const predG1 = localPreds[match.id]?.g1 ?? "";
            const predG2 = localPreds[match.id]?.g2 ?? "";
            
            // Lock Check
            const lockData = getRoundLockStatus(match.group);
            const isMatchLocked = lockData.isLocked;

            const savedPred = predictions.find((p) => p.matchId === match.id);
            const detailDetail = calculatePredictionPoints(savedPred, match);

            return (
              <div
                key={match.id}
                id={`match-card-${match.id}`}
                className={`relative overflow-hidden rounded-3xl border transition-all shadow-md hover:shadow-lg ${
                  match.isFinished 
                    ? "border-emerald-500/30 bg-white" 
                    : isMatchLocked 
                    ? "border-yellow-500/25 bg-slate-50 opacity-95" 
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                {/* AMBIENT GLOW PARA LOCKS OU FINALS */}
                {isMatchLocked && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-405 bg-yellow-500"></div>
                )}
                {match.isFinished && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                )}

                {/* HEADER DO CARD */}
                <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap justify-between items-center text-[10px] font-mono tracking-wide text-slate-400 gap-2 bg-slate-50/50">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-[#0B1B3D] text-white font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                      {match.group}
                    </span>
                    <span className="text-slate-500 font-semibold">{match.date} às {match.time}</span>
                  </div>

                  {/* CHANGER LOCK BADGE */}
                  {isMatchLocked ? (
                    <span 
                      className="bg-yellow-500/10 border border-yellow-400/20 text-yellow-600 font-sans font-black uppercase text-[8px] px-2 py-0.5 rounded flex items-center gap-1 shrink-0"
                      title={lockData.firstGameInfo}
                    >
                      <Lock className="w-3 h-3 text-yellow-600" />
                      <span>Palpites fecham 1 hora antes da rodada</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 font-semibold text-right truncate max-w-[150px] sm:max-w-none">
                      {match.stadium}
                    </span>
                  )}
                </div>

                {/* CORPO DO CARD COM INPUTS CENTRALIZADOS */}
                <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  {/* TIME 1 */}
                  <div className="flex items-center gap-3.5 w-full md:w-5/12 justify-center md:justify-end text-center md:text-right">
                    <div className="space-y-0.5 order-2 md:order-1">
                      <span className="font-sans font-black uppercase text-sm text-slate-800 tracking-tight block">
                        {match.team1.name}
                      </span>
                      {match.isFavoriteTeam1 && (
                        <span className="text-[8px] text-emerald-600 uppercase font-mono font-bold tracking-widest block">
                          ⭐ FAVORITO (+2)
                        </span>
                      )}
                    </div>
                    {match.team1.code !== "TBD" ? (
                      <img
                        src={getFlagUrl(match.team1.code)}
                        alt={match.team1.name}
                        className="w-10 h-7 object-cover rounded shadow-sm border border-slate-200 order-1 md:order-2"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-3.5xl mr-1 select-none order-1 md:order-2" title={match.team1.name}>
                        {match.team1.flag}
                      </span>
                    )}
                  </div>

                  {/* CAIXAS DE PALPITES CENTRADAS */}
                  <div className="flex items-center gap-2.5 justify-center w-full md:w-2/12 py-2 md:py-0 rounded-2xl relative">
                    
                    {isMatchLocked && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-405 bg-yellow-500 text-black text-[7px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest leading-none">
                        LOCKED
                      </div>
                    )}

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id={`input-${match.id}-team1`}
                      value={predG1}
                      disabled={isMatchLocked}
                      onChange={(e) => handleGoalChange(match.id, 1, e.target.value, isMatchLocked)}
                      placeholder="-"
                      className={`w-12 h-12 text-center text-xl font-mono font-black rounded-lg border focus:bg-slate-50 transition-all outline-none text-slate-850 select-all ${
                        isMatchLocked 
                          ? "bg-slate-100 border-slate-100 text-slate-400 opacity-60" 
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-[#0B1B3D] focus:ring-4 focus:ring-[#0B1B3D]/5"
                      }`}
                    />

                    <span className="text-[10px] font-mono text-slate-400 uppercase font-black">x</span>

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id={`input-${match.id}-team2`}
                      value={predG2}
                      disabled={isMatchLocked}
                      onChange={(e) => handleGoalChange(match.id, 2, e.target.value, isMatchLocked)}
                      placeholder="-"
                      className={`w-12 h-12 text-center text-xl font-mono font-black rounded-lg border focus:bg-slate-50 transition-all outline-none text-slate-850 select-all ${
                        isMatchLocked 
                          ? "bg-slate-100 border-slate-100 text-slate-400 opacity-60" 
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-[#0B1B3D] focus:ring-4 focus:ring-[#0B1B3D]/5"
                      }`}
                    />
                  </div>

                  {/* TIME 2 */}
                  <div className="flex items-center gap-3.5 w-full md:w-5/12 justify-center md:justify-start text-center md:text-left">
                    {match.team2.code !== "TBD" ? (
                      <img
                        src={getFlagUrl(match.team2.code)}
                        alt={match.team2.name}
                        className="w-10 h-7 object-cover rounded shadow-sm border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-3.5xl ml-1 select-none" title={match.team2.name}>
                        {match.team2.flag}
                      </span>
                    )}
                    <div className="space-y-0.5">
                      <span className="font-sans font-black uppercase text-sm text-slate-800 tracking-tight block">
                        {match.team2.name}
                      </span>
                      {!match.isFavoriteTeam1 && (
                        <span className="text-[8px] text-emerald-600 uppercase font-mono font-bold tracking-widest block">
                          ⭐ FAVORITO (+2)
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* RODAPÉ DO CARD CONTEÚDO PONTOS */}
                <div className="px-5 py-3.5 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 bg-slate-50/20">
                  
                  {/* RESULTADO OFICIAL */}
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Resultado Real:</span>
                    {match.simulatedResult1 !== undefined && match.simulatedResult2 !== undefined ? (
                      <span className="bg-slate-100 border border-slate-200 text-slate-850 font-mono font-black px-2.5 py-0.5 rounded text-[11px] flex items-center gap-1.5">
                        <span>{match.simulatedResult1} x {match.simulatedResult2}</span>
                        {match.isFinished ? (
                          <span className="text-[8px] bg-emerald-500 text-black font-black uppercase px-1 rounded">FIM</span>
                        ) : (
                          <span className="text-[8px] bg-yellow-500 text-black font-black uppercase px-1 rounded animate-pulse">LIVE</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium italic">Selecione resultados via simulador</span>
                    )}
                  </div>

                  {/* PONTUAÇÃO CONQUISTADA */}
                  {match.isFinished && savedPred && detailDetail.points > 0 && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                      <span>🎉 +{detailDetail.points} Pontos Obtidos</span>
                      <span className="opacity-75">
                        ({detailDetail.isExact ? "Placar Exato" : "Placar Vencedor"})
                      </span>
                    </div>
                  )}

                  {match.isFinished && savedPred && detailDetail.points === 0 && (
                    <span className="text-[9px] uppercase font-bold text-red-500 font-mono">❌ Sem Pontos Nesa Partida</span>
                  )}

                  {match.isFinished && !savedPred && (
                    <span className="text-[10px] text-slate-405 font-bold uppercase italic">Sem palpites salvos</span>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* FLOATING ACTION SAVE BUTTON */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-6 sm:px-12 py-3 pointer-events-none flex justify-end">
        {hasUnsavedChanges ? (
          <button
            onClick={handleSave}
            className="pointer-events-auto bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-black uppercase text-xs tracking-wider px-5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Meus Palpites</span>
            <span className="bg-black text-white text-[9px] font-black h-4.5 px-1.5 rounded-full flex items-center justify-center">
              Modificados
            </span>
          </button>
        ) : (
          user && (
            <div className="bg-[#111625]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 shadow-lg text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 flex items-center gap-1.5 select-none pointer-events-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Palpites Seguros e Gravados!</span>
            </div>
          )
        )}
      </div>

      {/* FOOTER SALVAR GRANDE DETALHES */}
      {user && (
        <div className="flex justify-center pt-2 pb-10">
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving" || !hasUnsavedChanges}
            className={`w-full max-w-sm py-3.5 rounded-2xl font-sans font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              saveStatus === "saved"
                ? "bg-emerald-500 text-black"
                : hasUnsavedChanges
                ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/10"
                : "bg-white/[0.04] text-slate-500 cursor-not-allowed border border-white/10"
            }`}
          >
            {saveStatus === "saving" ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Trabalhando no Gravador de Dados...</span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Palpites Gravados com Sucesso!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Palpites Atuais</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
