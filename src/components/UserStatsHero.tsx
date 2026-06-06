/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import { User, Match, Prediction, LeaderboardUser } from "../types";
import { calculatePredictionPoints } from "../initialData";
import { Target, Zap, Award, Gauge, Star } from "lucide-react";


interface UserStatsHeroProps {
  user: User | null;
  leaderboard: LeaderboardUser[];
  predictions: Prediction[];
  matches: Match[];
}

export default function UserStatsHero({
  user,
  leaderboard,
  predictions,
  matches,
}: UserStatsHeroProps) {
  // Encontra o ranking do usuário no leaderboard
  const rank = useMemo(() => {
    if (!user) return "--";
    const idx = leaderboard.findIndex((u) => u.id === user.id);
    return idx !== -1 ? `#${idx + 1}` : "--";
  }, [user, leaderboard]);

  // Cálculos estatísticos reais
  const stats = useMemo(() => {
    let points = 0;
    let exactScores = 0;
    let winnerOnly = 0;
    let goalDifference = 0;
    let goleadas = 0;
    let predsMade = 0;
    let finishedCount = 0;

    matches.forEach((match) => {
      const pred = predictions.find((p) => p.matchId === match.id);
      const hasPred = pred && pred.goals1 !== "" && pred.goals2 !== "";
      if (hasPred) {
        predsMade++;
      }

      if (match.isFinished) {
        finishedCount++;
        const detail = calculatePredictionPoints(pred, match);
        points += detail.points;
        if (detail.isExact) exactScores++;
        if (detail.isWinner) winnerOnly++;
        if (detail.isGoalDiff) goalDifference++;
        if (detail.isGoleada) goleadas++;
      }
    });

    const divisor = Math.max(1, finishedCount);
    // Taxas de precisão em porcentagem
    const exactRate = Math.round((exactScores / divisor) * 100);
    const winnerRate = Math.round(((winnerOnly + exactScores) / divisor) * 100);
    const diffRate = Math.round((goalDifference / divisor) * 100);
    
    // Média de pontos
    const avgPoints = finishedCount > 0 ? points / finishedCount : 0;
    // Mapeado de 0 a 100% para a barra (assumindo que 10 é uma excelente média)
    const avgPointsRate = Math.min(100, Math.round((avgPoints / 10) * 100));

    return {
      points,
      exactScores,
      winnerOnly,
      goalDifference,
      goleadas,
      predsMade,
      finishedCount,
      exactRate,
      winnerRate,
      diffRate,
      avgPoints: avgPoints.toFixed(1),
      avgPointsRate,
    };
  }, [matches, predictions]);

  const nameParts = user ? user.name.split(" ") : ["Convidado", ""];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "Palpiteiro";

  return (
    <div className="relative text-white select-none overflow-hidden pb-10">
      
      {/* Elementos Decorativos de Fundo (Abstract Shapes) */}
      <div className="absolute top-8 right-1/4 w-3 h-3 bg-cyan-400 rounded-sm rotate-12 opacity-80 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/3 w-2.5 h-2.5 bg-pink-500 rounded-full opacity-70 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LADO ESQUERDO: ESTATÍSTICAS E BARRAS DE TAXA */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Rank e Colunas de Dados */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            {/* Rank Gigante Amarelo */}
            <div className="flex items-baseline">
              <span className="text-yellow-400 font-sans font-black text-8xl md:text-9xl tracking-tighter leading-none">
                {rank}
              </span>
            </div>

            {/* Separador Sutil Vertical em Telas Maiores */}
            <div className="hidden sm:block h-16 w-[1px] bg-white/10"></div>

            {/* Grid de 3 Colunas: Apps, Goals, Assists */}
            <div className="flex gap-8 md:gap-12">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Palpites</span>
                <span className="font-sans font-black text-3xl md:text-4xl text-white block">
                  {String(stats.predsMade).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Exatos</span>
                <span className="font-sans font-black text-3xl md:text-4xl text-white block">
                  {String(stats.exactScores).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Pontos</span>
                <span className="font-sans font-black text-3xl md:text-4xl text-white block">
                  {String(stats.points).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Barras de Precisão Horizontais Coloridas */}
          <div className="space-y-4 max-w-md pt-2">
            
            {/* Placar Exato (Red Bar) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <div className="flex items-center gap-2 text-rose-450 text-rose-400">
                  <span className="p-1 rounded bg-rose-500/10 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">Taxa Placar Exato</span>
                </div>
                <span className="font-mono text-[11px] text-slate-300">{stats.exactRate}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.exactRate}%` }}
                ></div>
              </div>
            </div>

            {/* Acerto do Vencedor (Orange Bar) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <div className="flex items-center gap-2 text-amber-450 text-amber-500">
                  <span className="p-1 rounded bg-amber-500/10 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">Acerto do Vencedor</span>
                </div>
                <span className="font-mono text-[11px] text-slate-300">{stats.winnerRate}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.winnerRate}%` }}
                ></div>
              </div>
            </div>

            {/* Saldo de Gols (Blue Bar) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <div className="flex items-center gap-2 text-blue-450 text-blue-400">
                  <span className="p-1 rounded bg-blue-500/10 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">Taxa Saldo de Gols</span>
                </div>
                <span className="font-mono text-[11px] text-slate-300">{stats.diffRate}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.diffRate}%` }}
                ></div>
              </div>
            </div>

            {/* Média de Pontos (Cyan Bar) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <div className="flex items-center gap-2 text-cyan-450 text-cyan-400">
                  <span className="p-1 rounded bg-cyan-500/10 flex items-center justify-center">
                    <Gauge className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">Média de Pontos / Jogo</span>
                </div>
                <span className="font-mono text-[11px] text-slate-300">{stats.avgPoints} Pts</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.avgPointsRate}%` }}
                ></div>
              </div>
            </div>

          </div>

        </div>

        {/* LADO DIREITO: FOTO DO JOGADOR/AVATAR E NOME EM DESTAQUE */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start w-full">
          
          {/* Estrutura de Perfil do Jogador (Esports Style) */}
          <div className="flex items-center gap-6 w-full max-w-sm justify-center lg:justify-start">
            
            {/* Avatar Grande com Glow Ring */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-blue-500/25 rounded-full blur-xl animate-pulse pointer-events-none"></div>
              {user ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white object-cover relative z-10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-dashed border-white/20 bg-neutral-900/40 flex items-center justify-center text-slate-500 relative z-10">
                  <Zap className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Nome em Fonte Gigante de 2 Linhas */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-light text-white/90 leading-none tracking-tight">
                {firstName}
              </h2>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight uppercase">
                {lastName}
              </h1>
              <p className="text-[9px] text-slate-400 uppercase font-mono tracking-widest font-bold mt-2 flex items-center gap-1.5">
                <Star className="w-3 h-3 text-yellow-405 text-yellow-300 fill-yellow-300" />
                <span>Nível: {user ? "Líder Técnico" : "Convidado Especial"}</span>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
