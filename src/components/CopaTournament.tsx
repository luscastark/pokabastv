/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Match, Team } from "../types";
import {
  calculateGroupStandings,
  getBestThirdPlacedTeams,
  resolveTournamentBracket,
  getFlagUrl,
  GROUPS
} from "../initialData";
import { Trophy, GitBranch, Calendar, Eye, ShieldCheck, HelpCircle } from "lucide-react";

interface CopaTournamentProps {
  matches: Match[];
}

export default function CopaTournament({ matches }: CopaTournamentProps) {
  // Aba interna: "grupos" | "chaveamento"
  const [subTab, setSubTab] = useState<"grupos" | "chaveamento">("grupos");

  // Resolvendo o chaveamento dinamicamente a partir das partidas da Copa
  const resolvedMatches = useMemo(() => {
    return resolveTournamentBracket(matches);
  }, [matches]);

  const standings = useMemo(() => {
    return calculateGroupStandings(matches);
  }, [matches]);

  const bestThirds = useMemo(() => {
    return getBestThirdPlacedTeams(standings);
  }, [standings]);

  // Identifica se uma seleção de 3º lugar está classificada (Top 8)
  const isThirdPlaceQualified = (teamCode: string) => {
    const qualifiedCodes = bestThirds.slice(0, 8).map((t) => t.team.code);
    return qualifiedCodes.includes(teamCode);
  };

  // Separa as partidas do chaveamento resolvido por fase
  const r32Matches = resolvedMatches.filter((m) => m.group === "16-avos de Final");
  const r16Matches = resolvedMatches.filter((m) => m.group === "Oitavas de Final");
  const qfMatches = resolvedMatches.filter((m) => m.group === "Quartas de Final");
  const sfMatches = resolvedMatches.filter((m) => m.group === "Semifinal");
  const thirdPlaceMatch = resolvedMatches.find((m) => m.group === "Disputa de 3º Lugar");
  const finalMatch = resolvedMatches.find((m) => m.group === "Final");

  return (
    <div className="space-y-6 text-white animate-fade-in">
      
      {/* SEÇÃO BRANDING & SUB-ABAS */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950/40 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="space-y-1.5 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase text-emerald-400 tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Fase de Grupos & Mata-Mata</span>
          </span>
          <h2 className="text-3xl font-sans font-black tracking-tight uppercase">
            Acompanhamento Copa 2026
          </h2>
          <p className="text-xs text-slate-350 max-w-xl font-normal leading-relaxed">
            Veja a tabela de classificação e o chaveamento final em tempo real. Os resultados são gerados e calculados dinamicamente com base nas partidas simuladas ou reais.
          </p>
        </div>

        {/* SUB-ABAS DE SELEÇÃO */}
        <div className="flex bg-neutral-950/80 p-1 rounded-2xl border border-white/10 relative z-10">
          <button
            onClick={() => setSubTab("grupos")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              subTab === "grupos"
                ? "bg-emerald-500 text-black shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Tabela de Grupos</span>
          </button>
          
          <button
            onClick={() => setSubTab("chaveamento")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              subTab === "chaveamento"
                ? "bg-emerald-500 text-black shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Chaveamento</span>
          </button>
        </div>
      </div>

      {/* ABA 1: TABELA DOS GRUPOS */}
      {subTab === "grupos" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* GRID DE GRUPOS (12 GRUPOS DE A A L) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GROUPS.map((g) => {
              const groupLetter = g.name.split(" ")[1];
              const groupStandings = standings[g.name] || [];

              return (
                <div
                  key={g.name}
                  className="rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all flex flex-col"
                >
                  <div className="bg-white/[0.02] border-b border-white/5 py-3.5 px-5 flex justify-between items-center">
                    <span className="font-sans font-black text-sm uppercase tracking-tight text-white">
                      Grupo {groupLetter}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded uppercase">
                      Live
                    </span>
                  </div>

                  <div className="p-3 flex-grow">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                          <th className="py-2 pl-2">Pos</th>
                          <th className="py-2">Seleção</th>
                          <th className="py-2 text-center">Pts</th>
                          <th className="py-2 text-center">J</th>
                          <th className="py-2 text-center">SG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupStandings.map((standing, index) => {
                          const isQualifying = index < 2;
                          const isThird = index === 2;
                          const isThirdQual = isThird && isThirdPlaceQualified(standing.team.code);

                          return (
                            <tr
                              key={standing.team.code}
                              className={`border-b border-white/[0.02] last:border-b-0 hover:bg-white/[0.02] transition-colors ${
                                isQualifying ? "bg-emerald-500/[0.01]" : isThirdQual ? "bg-yellow-500/[0.01]" : ""
                              }`}
                            >
                              <td className="py-3 pl-2 font-mono font-bold text-center w-8">
                                <span
                                  className={`inline-block w-4.5 h-4.5 rounded text-[10px] leading-tight text-center ${
                                    index === 0
                                      ? "bg-emerald-500 text-black font-black"
                                      : index === 1
                                      ? "bg-emerald-500/20 text-emerald-400"
                                      : isThirdQual
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-white/5 text-slate-400"
                                  }`}
                                >
                                  {index + 1}
                                </span>
                              </td>

                              <td className="py-3 font-semibold text-white">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={getFlagUrl(standing.team.code)}
                                    alt={standing.team.name}
                                    className="w-5 h-3.5 object-cover rounded shadow-sm border border-white/10"
                                    onError={(e) => {
                                      // Fallback para emoji de bandeira
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                  <span className="truncate max-w-[100px] sm:max-w-none" title={standing.team.name}>
                                    {standing.team.name}
                                  </span>
                                  {isThirdQual && (
                                    <span className="text-[7px] font-black uppercase bg-yellow-400 text-black px-1 rounded tracking-wider scale-90">
                                      3º Q
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="py-3 text-center font-mono font-bold text-white">
                                {standing.points}
                              </td>

                              <td className="py-3 text-center font-mono text-slate-450 text-slate-400">
                                {standing.played}
                              </td>

                              <td className={`py-3 text-center font-mono font-semibold ${
                                standing.goalDifference > 0 
                                  ? "text-emerald-400" 
                                  : standing.goalDifference < 0 
                                  ? "text-red-400" 
                                  : "text-slate-400"
                              }`}>
                                {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TABELA DE 3º COLOCADOS */}
          <div className="rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-md overflow-hidden p-6 space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="bg-yellow-400 text-black text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Regra Especial
              </span>
              <h3 className="text-sm font-sans font-black uppercase tracking-wider text-white">
                Tabela de Melhores 3º Colocados
              </h3>
            </div>
            
            <p className="text-xs text-slate-350 leading-relaxed font-normal">
              No formato com 48 seleções, os <strong className="text-yellow-400">8 melhores 3º colocados</strong> das 12 chaves se classificam junto com os 1º e 2º colocados para a Rodada de 32 (16-avos de final).
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/20">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white/[0.01]">
                    <th className="py-3 pl-4 text-center w-12">Pos</th>
                    <th className="py-3">Seleção (Grupo)</th>
                    <th className="py-3 text-center">Pts</th>
                    <th className="py-3 text-center font-normal">J</th>
                    <th className="py-3 text-center font-normal">SG</th>
                    <th className="py-3 text-center font-normal">GP</th>
                    <th className="py-3 pr-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bestThirds.map((standing, index) => {
                    const isQualified = index < 8;
                    const groupLetter = GROUPS.find(g => g.teams.includes(standing.team.code))?.name.split(" ")[1] || "";

                    return (
                      <tr
                        key={standing.team.code}
                        className={`border-b border-white/[0.02] last:border-b-0 hover:bg-white/[0.02] transition-colors ${
                          isQualified ? "bg-emerald-500/[0.01]" : "bg-red-500/[0.01]"
                        } ${index === 7 ? "border-b-2 border-dashed border-yellow-500/50" : ""}`}
                      >
                        <td className="py-3 pl-4 font-mono font-bold text-center">
                          <span
                            className={`inline-block w-4.5 h-4.5 rounded text-[10px] leading-tight text-center ${
                              isQualified ? "bg-yellow-400 text-black font-black" : "bg-white/5 text-slate-400"
                            }`}
                          >
                            {index + 1}º
                          </span>
                        </td>

                        <td className="py-3 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <img
                              src={getFlagUrl(standing.team.code)}
                              alt={standing.team.name}
                              className="w-5 h-3.5 object-cover rounded shadow-sm border border-white/10"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                            <span>{standing.team.name}</span>
                            <span className="text-[9px] text-slate-450 text-slate-400 font-mono">({groupLetter})</span>
                          </div>
                        </td>

                        <td className="py-3 text-center font-mono font-bold text-white">
                          {standing.points}
                        </td>

                        <td className="py-3 text-center font-mono text-slate-400">
                          {standing.played}
                        </td>

                        <td className={`py-3 text-center font-mono font-semibold ${
                          standing.goalDifference > 0 
                            ? "text-emerald-400" 
                            : standing.goalDifference < 0 
                            ? "text-red-400" 
                            : "text-slate-400"
                        }`}>
                          {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                        </td>

                        <td className="py-3 text-center font-mono text-slate-400">
                          {standing.goalsFor}
                        </td>

                        <td className="py-3 pr-4 text-right">
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isQualified 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" 
                              : "bg-red-500/10 text-red-450 text-red-400 border border-red-500/20"
                          }`}>
                            {isQualified ? "Qualificado" : "Eliminado"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ABA 2: CHAVEAMENTO MATA-MATA (BRACKET) */}
      {subTab === "chaveamento" && (
        <div className="w-full overflow-x-auto pb-6 scrollbar-none select-none">
          
          {/* HEADER INFORMAÇÃO */}
          <div className="mb-4 max-w-xl mx-auto p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center text-xs text-slate-350 leading-relaxed font-normal">
            💡 <strong>Dica do Chaveamento:</strong> Role a barra horizontalmente para navegar do início do mata-mata até a grande Final!
          </div>

          <div className="flex gap-8 items-start px-4 min-w-[1400px] justify-between">
            
            {/* COLUNA 1: 16-AVOS (ROUND OF 32) */}
            <div className="flex-1 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b border-white/10 pb-2">
                16-avos de Final
              </h4>
              <div className="space-y-4">
                {r32Matches.map((m) => (
                  <BracketMatchCard key={m.id} match={m} />
                ))}
              </div>
            </div>

            {/* COLUNA 2: OITAVAS DE FINAL */}
            <div className="flex-1 space-y-4 pt-10">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b border-white/10 pb-2">
                Oitavas de Final
              </h4>
              <div className="space-y-12">
                {r16Matches.map((m) => (
                  <BracketMatchCard key={m.id} match={m} />
                ))}
              </div>
            </div>

            {/* COLUNA 3: QUARTAS DE FINAL */}
            <div className="flex-1 space-y-4 pt-24">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b border-white/10 pb-2">
                Quartas de Final
              </h4>
              <div className="space-y-28">
                {qfMatches.map((m) => (
                  <BracketMatchCard key={m.id} match={m} />
                ))}
              </div>
            </div>

            {/* COLUNA 4: SEMIFINAIS */}
            <div className="flex-1 space-y-4 pt-56">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b border-white/10 pb-2">
                Semifinais
              </h4>
              <div className="space-y-64">
                {sfMatches.map((m) => (
                  <BracketMatchCard key={m.id} match={m} />
                ))}
              </div>
            </div>

            {/* COLUNA 5: FINAL E DISPUTA DE 3º LUGAR */}
            <div className="flex-1 space-y-6 pt-72">
              <div>
                <h4 className="text-[10px] font-black uppercase text-yellow-400 tracking-wider text-center border-b border-yellow-400/20 pb-2">
                  🏆 Grande Final
                </h4>
                <div className="mt-4">
                  {finalMatch && <BracketMatchCard match={finalMatch} isFinal />}
                </div>
              </div>

              <div className="pt-8">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b border-white/10 pb-2">
                  🥉 Disputa de 3º Lugar
                </h4>
                <div className="mt-4">
                  {thirdPlaceMatch && <BracketMatchCard match={thirdPlaceMatch} />}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* MINI-COMPONENTE CARD DE CONFRONTO NO CHAVEAMENTO */
interface BracketMatchCardProps {
  match: Match;
  isFinal?: boolean;
  key?: string;
}

function BracketMatchCard({ match, isFinal = false }: BracketMatchCardProps) {
  const isFinished = match.isFinished ?? false;
  
  const r1 = match.simulatedResult1;
  const r2 = match.simulatedResult2;

  // Determinar vencedor
  const isDraw = isFinished && r1 !== undefined && r2 !== undefined && r1 === r2;
  const winnerCode = useMemo(() => {
    if (!isFinished || r1 === undefined || r2 === undefined) return null;
    if (r1 > r2) return match.team1.code;
    if (r2 > r1) return match.team2.code;
    return match.knockoutWinnerCode || null;
  }, [match, isFinished, r1, r2]);

  const isTBD = match.team1.code === "TBD" || match.team2.code === "TBD";

  const isTeam1Winner = winnerCode === match.team1.code;
  const isTeam2Winner = winnerCode === match.team2.code;

  return (
    <div
      id={`bracket-card-${match.id}`}
      className={`relative overflow-hidden rounded-2xl border text-xs shadow-md transition-all ${
        isFinal
          ? "border-yellow-400/40 bg-gradient-to-br from-neutral-950 via-neutral-900 to-yellow-950/20 shadow-yellow-500/5 hover:border-yellow-400"
          : isFinished
          ? "border-emerald-500/20 bg-neutral-950/40 hover:border-emerald-500/40"
          : isTBD
          ? "border-white/5 bg-neutral-900/10 opacity-60"
          : "border-white/10 bg-neutral-900/40 hover:border-white/20"
      }`}
    >
      {/* HEADER CARD */}
      <div className="bg-white/[0.01] border-b border-white/5 px-3 py-1 flex justify-between items-center text-[8px] font-mono text-slate-400">
        <span>{match.group}</span>
        {isFinished ? (
          <span className="text-emerald-400 font-bold uppercase tracking-wider">Finalizado</span>
        ) : isTBD ? (
          <span>Aguardando confrontos</span>
        ) : (
          <span className="text-yellow-405 text-yellow-300 font-bold uppercase animate-pulse">Live / Agendado</span>
        )}
      </div>

      <div className="p-3.5 space-y-2.5">
        
        {/* TIME 1 */}
        <div className={`flex items-center justify-between transition-opacity ${
          isFinished && !isTeam1Winner ? "opacity-45" : ""
        }`}>
          <div className="flex items-center gap-2">
            {match.team1.code !== "TBD" ? (
              <img
                src={getFlagUrl(match.team1.code)}
                alt={match.team1.name}
                className="w-5 h-3.5 object-cover rounded shadow-sm border border-white/10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-base select-none">🏳️</span>
            )}
            <span className={`font-semibold ${isTeam1Winner ? "text-emerald-400 font-black" : "text-white"}`}>
              {match.team1.name}
            </span>
          </div>
          <span className={`font-mono text-sm font-black w-6 text-center ${
            isTeam1Winner ? "text-emerald-400" : "text-white"
          }`}>
            {r1 !== undefined ? r1 : "-"}
          </span>
        </div>

        {/* TIME 2 */}
        <div className={`flex items-center justify-between transition-opacity ${
          isFinished && !isTeam2Winner ? "opacity-45" : ""
        }`}>
          <div className="flex items-center gap-2">
            {match.team2.code !== "TBD" ? (
              <img
                src={getFlagUrl(match.team2.code)}
                alt={match.team2.name}
                className="w-5 h-3.5 object-cover rounded shadow-sm border border-white/10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-base select-none">🏳️</span>
            )}
            <span className={`font-semibold ${isTeam2Winner ? "text-emerald-400 font-black" : "text-white"}`}>
              {match.team2.name}
            </span>
          </div>
          <span className={`font-mono text-sm font-black w-6 text-center ${
            isTeam2Winner ? "text-emerald-400" : "text-white"
          }`}>
            {r2 !== undefined ? r2 : "-"}
          </span>
        </div>

      </div>

      {/* FOOTER EXTRA SE HOUVER DISPUTA DE PÊNALTIS */}
      {isDraw && winnerCode && (
        <div className="px-3.5 py-1.5 border-t border-white/5 bg-emerald-500/5 text-[9px] font-mono text-emerald-400 flex justify-between items-center">
          <span>Vencedor nos Pênaltis:</span>
          <span className="font-bold uppercase tracking-wider">
            {match.team1.code === winnerCode ? match.team1.name : match.team2.name}
          </span>
        </div>
      )}

      {/* FINAL GLOW BADGE */}
      {isFinal && isFinished && winnerCode && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-bl shadow">
          👑 CAMPEÃO
        </div>
      )}
    </div>
  );
}
