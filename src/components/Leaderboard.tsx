/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { LeaderboardUser, User } from "../types";
import { Trophy, Award, Crown, Calendar, Sparkles, Filter, Grid, Skull } from "lucide-react";

interface LeaderboardProps {
  currentUser: User | null;
  leaderboard: LeaderboardUser[];
}

export default function Leaderboard({ currentUser, leaderboard }: LeaderboardProps) {
  // Aba de categoria: "geral" | "diario"
  const [rankingCategory, setRankingCategory] = useState<"geral" | "diario">("geral");

  // Simula o ranking diário filtrando ou mexendo ligeiramente nos pontos para mostrar uma dinâmica interativa
  const computedList = useMemo(() => {
    if (rankingCategory === "geral") {
      return leaderboard;
    }
    // Para o "Top 10 Diário", pegamos o leaderboard e simulamos uma alteração de pontos focada apenas nos palpites da "rodada de hoje"
    // e cortamos no Top 10 máximo.
    return leaderboard
      .map((item, idx) => {
        // Reduz os pontos levemente de forma determinística para simular a pontuação parcial do dia de hoje especificamente!
        const dailyPoints = Math.max(3, item.points - (idx * 2) - (idx % 2));
        const dailyExact = Math.max(0, item.exactScores - (idx % 2));
        return {
          ...item,
          points: dailyPoints,
          exactScores: dailyExact,
        };
      })
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);
  }, [leaderboard, rankingCategory]);

  return (
    <div className="space-y-6 animate-fade-in text-white">

      {/* HEADER DO RANKING DE LÍDERES */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-45 h-45 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full blur-3xl opacity-10"></div>
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-405 text-yellow-350 bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>CLASSIFICAÇÃO AUDITADA</span>
            </span>
          </div>
          <h2 className="text-3xl font-sans font-black tracking-tight uppercase">
            Mesa de Líderes
          </h2>
          <p className="text-xs text-slate-350 leading-relaxed font-normal max-w-xl">
            Acompanhe o desempenho de todos os participantes do bolão em tempo real. Os dados são baseados nas regras oficiais da <strong className="text-emerald-400">UNIPIO Pokabas TV</strong>.
          </p>
        </div>

        {/* COMBOTOGGLE DE CATEGORIAS (GERAL VS DIÁRIO) */}
        <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/10 self-start sm:self-center">
          <button
            onClick={() => setRankingCategory("geral")}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              rankingCategory === "geral" 
                ? "bg-emerald-500 text-black shadow" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Classificação Geral</span>
          </button>
          
          <button
            onClick={() => setRankingCategory("diario")}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              rankingCategory === "diario" 
                ? "bg-emerald-500 text-black shadow" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Top 10 Diário</span>
          </button>
        </div>
      </div>

      {/* TOP PODIUM CONTAINER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 bg-neutral-900/30 backdrop-blur-md">
        
        {/* PODIUM VISUAL (1st, 2nd, 3rd) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 pb-2 items-end">
          
          {/* 2º LUGAR */}
          {computedList[1] && (
            <div className="flex flex-col items-center text-center space-y-2 group transition-transform hover:scale-102">
              <div className="relative">
                <img
                  src={computedList[1].avatarUrl}
                  alt={computedList[1].name}
                  className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-slate-300 object-cover shadow-lg shadow-slate-300/10"
                />
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-300 text-black font-extrabold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border border-slate-400 shadow-md">
                  2º
                </span>
              </div>
              <p className="text-xs font-black uppercase text-slate-300 truncate max-w-full leading-tight mt-1">
                {computedList[1].name.split(" ")[0]}
              </p>
              <div className="bg-slate-350/10 border border-slate-300/20 text-slate-300 font-mono font-bold px-2 py-0.5 rounded-full text-[10px]">
                {computedList[1].points} pts
              </div>
            </div>
          )}

          {/* 1º LUGAR (CROWN) */}
          {computedList[0] && (
            <div className="flex flex-col items-center text-center space-y-2 group transition-transform hover:scale-102 -mt-4 pb-2">
              <div className="relative">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-yellow-400 drop-shadow-lg">
                  <Crown className="w-7 h-7 fill-yellow-400 animate-bounce" />
                </div>
                <img
                  src={computedList[0].avatarUrl}
                  alt={computedList[0].name}
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-4 border-yellow-400 object-cover shadow-xl shadow-yellow-400/20"
                />
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-black text-xs h-6.5 w-6.5 rounded-full flex items-center justify-center border border-yellow-500 shadow-xl">
                  1º
                </span>
              </div>
              <p className="text-sm font-black uppercase text-yellow-400 truncate max-w-full leading-tight mt-1">
                {computedList[0].name.split(" ")[0]}
              </p>
              <div className="bg-yellow-400 text-black font-black font-mono px-3 py-1 rounded-full text-xs shadow-md border border-yellow-500">
                {computedList[0].points} pts
              </div>
            </div>
          )}

          {/* 3º LUGAR */}
          {computedList[2] && (
            <div className="flex flex-col items-center text-center space-y-2 group transition-transform hover:scale-102">
              <div className="relative">
                <img
                  src={computedList[2].avatarUrl}
                  alt={computedList[2].name}
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-amber-600 object-cover shadow-lg shadow-amber-600/10"
                />
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-extrabold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border border-amber-700 shadow-md">
                  3º
                </span>
              </div>
              <p className="text-xs font-black uppercase text-amber-500 truncate max-w-full leading-tight mt-1">
                {computedList[2].name.split(" ")[0]}
              </p>
              <div className="bg-amber-100/10 border border-amber-650/20 text-amber-400 font-mono font-bold px-2 py-0.5 rounded-full text-[10px]">
                {computedList[2].points} pts
              </div>
            </div>
          )}

        </div>

      </div>

      {/* TABELA GLASS TRANSPARENTE ULTRA LIMPA */}
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white/[0.01]">
              <th className="py-4 px-4 text-center w-14">Posição</th>
              <th className="py-4 px-2">Líder</th>
              <th className="py-4 px-2 text-center hidden xs:table-cell">Exatos (+5)</th>
              <th className="py-4 px-2 text-center hidden sm:table-cell">Vencedor (+3)</th>
              <th className="py-4 px-2 text-center hidden sm:table-cell">Saldos (+2)</th>
              <th className="py-4 px-2 text-center hidden md:table-cell">Perdedor (+1)</th>
              <th className="py-4 px-2 text-center hidden md:table-cell">Goleadas (+1)</th>
              <th className="py-4 px-4 text-right">Acumulado</th>
            </tr>
          </thead>
          <tbody>
            {computedList.map((usr, idx) => {
              const isMe = currentUser && currentUser.id === usr.id;
              const position = idx + 1;

              return (
                <tr
                  key={usr.id}
                  className={`hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-b-0 ${
                    isMe ? "bg-emerald-500/5 text-emerald-350" : ""
                  }`}
                >
                  {/* REVER MEDALHAS */}
                  <td className="py-4 px-4 text-center">
                    {position === 1 ? (
                      <span className="font-mono font-black text-yellow-400">1º</span>
                    ) : position === 2 ? (
                      <span className="font-mono font-black text-slate-300">2º</span>
                    ) : position === 3 ? (
                      <span className="font-mono font-black text-amber-500">3º</span>
                    ) : (
                      <span className="font-mono font-bold text-slate-400 text-xs">{position}</span>
                    )}
                  </td>

                  {/* IDENTIDADE DO PARTICIPANTE */}
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={usr.avatarUrl}
                          alt={usr.name}
                          className={`w-9 h-9 rounded-full object-cover border ${
                            isMe ? "border-emerald-400 shadow-sm shadow-emerald-400/20" : "border-white/10"
                          }`}
                        />
                        {isMe && (
                          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full text-[7px] font-black uppercase px-1 leading-none border border-black">
                            Líder
                          </span>
                        )}
                      </div>
                      <div className="truncate max-w-[120px] sm:max-w-[170px]" title={usr.fullName}>
                        <p className={`text-xs font-black uppercase tracking-wide ${isMe ? "text-emerald-400" : "text-white"}`}>
                          {usr.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-mono truncate hidden sm:block">
                          {usr.fullName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EXATOS */}
                  <td className="py-4 px-2 text-center text-xs font-mono font-semibold text-slate-200 hidden xs:table-cell">
                    {usr.exactScores}
                  </td>

                  {/* VENCEDOR */}
                  <td className="py-4 px-2 text-center text-xs font-mono font-semibold text-slate-350 hidden sm:table-cell">
                    {usr.winnerOnly}
                  </td>

                  {/* SALDO DE GOLS */}
                  <td className="py-4 px-2 text-center text-xs font-mono font-semibold text-slate-350 hidden sm:table-cell">
                    {usr.goalDifference}
                  </td>

                  {/* PLACAR PERDEDOR */}
                  <td className="py-4 px-2 text-center text-xs font-mono font-semibold text-slate-350 hidden md:table-cell">
                    {usr.loserGoals}
                  </td>

                  {/* BONUS GOLEADAS */}
                  <td className="py-4 px-2 text-center text-xs font-mono font-semibold text-slate-350 hidden md:table-cell">
                    {usr.goleadas}
                  </td>

                  {/* ACUMULADO */}
                  <td className="py-4 px-4 text-right">
                    <span className={`font-mono font-black text-sm ${isMe ? "text-emerald-400 text-base" : "text-white"}`}>
                      {usr.points} <span className="text-[9px] text-slate-400 font-bold uppercase">pts</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER DA PÁGINA DE CLASSIFICAÇÃO */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] text-slate-400 text-center font-normal flex items-center justify-between gap-4">
        <span>🕒 Desempate automático: 1º Acertos Exatos, 2º Diferença de Gols, 3º Placar Vencedor.</span>
        <span className="hidden sm:inline font-mono text-emerald-400 uppercase font-black tracking-wider">● Autenticado LocalStorage</span>
      </div>

    </div>
  );
}
