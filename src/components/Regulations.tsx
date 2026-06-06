/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, ShieldQuestion, HelpCircle, Star, Sparkles, AlertCircle, Award } from "lucide-react";

export default function Regulations() {
  const tableData = [
    {
      item: "🏆 Placar Exato",
      points: "+5 Pontos",
      desc: "Acertou exatamente os gols de ambos os times (Ex: Palpite 2x1, Jogo 2x1)",
    },
    {
      item: "⚽ Placar Vencedor",
      points: "+3 Pontos",
      desc: "Acertou quem ganharia ou o empate, mas não a quantidade exata de gols (Ex: Palpite 3x1, Jogo 2x1)",
    },
    {
      item: "📊 Diferença de Gols",
      points: "+2 Pontos",
      desc: "Acertou o saldo exato de gols do vencedor em partida com vitória (Ex: Palpite 2x0 (+2), Jogo 3x1 (+2))",
    },
    {
      item: "🎯 Placar Perdedor",
      points: "+1 Ponto",
      desc: "Acertou a quantidade exata de gols sofridos pelo derrotado (Ex: Palpite 3x1, Jogo 2x1 -- o perdedor fez 1 gol em ambos)",
    },
    {
      item: "🔥 Bônus Goleada",
      points: "+1 Ponto",
      desc: "Adicional se o jogo teve 4 gols ou mais no tempo regulamentar (Ex: 2x2, 3x1, 4x0) e você acertou o vencedor",
    },
  ];

  const oddsData = [
    {
      item: "🟢 Vitória de Favorito",
      points: "+2 Pontos Base",
      desc: "Quando o time rotulado como favorito vence a partida.",
    },
    {
      item: "🟡 Empate Geral",
      points: "+7 Pontos Base",
      desc: "Quando a partida termina empatada no tempo regulamentar.",
    },
    {
      item: "🔴 Vitória do Zebra / Underdog",
      points: "+11 Pontos Base",
      desc: "Quando a equipe identificada como zebra derrota o favorito.",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-white leading-relaxed">
      
      {/* HEADER DO REGULAMENTO */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950/40 backdrop-blur-md">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative space-y-3">
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-emerald-400 tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Regulamento Oficial Unipio Pokabas TV</span>
          </span>
          <h2 className="text-3xl font-sans font-black tracking-tight uppercase">
            Sistema de Pontuação
          </h2>
          <p className="text-xs text-slate-350 max-w-2xl font-normal leading-relaxed">
            Nossa fórmula inteligente combina a sua capacidade de prever o placar com a probabilidade real esportiva (Odds), estimulando palpites ousados na Zebra e empates desafiadores!
          </p>
        </div>
      </div>

      {/* DUAS COLUNAS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* TABELA 1: ACERTOS DE PLACAR */}
        <div className="p-6 rounded-3xl border border-white/15 bg-neutral-900/40 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-sans font-black uppercase tracking-wider text-white">
              1. Pontos por Acerto (Placar)
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">
            Estes pontos são somados dependendo da categoria de acontecimentos do seu palpite:
          </p>

          <div className="space-y-3">
            {tableData.map((row, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3 hover:bg-white/[0.05] transition-all"
              >
                <div className="font-mono text-xs font-black text-emerald-400 bg-emerald-500/10 rounded px-2.5 py-1 min-w-[75px] text-center shrink-0">
                  {row.points}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase text-white tracking-snug">{row.item}</h4>
                  <p className="text-[10px] text-slate-350 font-normal leading-tight">{row.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABELA 2: PONTOS BASE / ODDS */}
        <div className="p-6 rounded-3xl border border-white/15 bg-neutral-900/40 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-sans font-black uppercase tracking-wider text-white">
              2. Pontos Base da Partida (Odds)
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">
            Se você acertar quem ganha ou empatar, você herda pontos bônus baseados no nível de dificuldade:
          </p>

          <div className="space-y-3">
            {oddsData.map((row, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3 hover:bg-white/[0.05] transition-all"
              >
                <div className="font-mono text-xs font-black text-yellow-400 bg-yellow-500/10 rounded px-2 py-1 min-w-[110px] text-center shrink-0">
                  {row.points}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase text-white tracking-snug">{row.item}</h4>
                  <p className="text-[10px] text-slate-350 font-normal leading-tight">{row.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-yellow-400/[0.03] border border-yellow-400/10 space-y-2">
            <span className="text-[9px] uppercase font-bold text-yellow-400 block tracking-widest">💡 Regra de Bloqueio Crítico (Time Lock)</span>
            <p className="text-[10px] text-slate-350 leading-relaxed font-normal">
              Para evitar trapaças com informações de bastidores ou lesões, <strong className="text-yellow-400">toda a rodada é bloqueada estritamente 60 minutos (1 hora) antes do pontapé inicial do primeiro jogo daquela rodada</strong>. Sem exceções!
            </p>
          </div>
        </div>

      </div>

      {/* CRITÉRIOS DE DESEMPATE */}
      <div className="p-6 rounded-3xl border border-white/15 bg-neutral-900/40 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <ShieldQuestion className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-sans font-black uppercase tracking-wider text-white">
            Critérios Oficiais de Desempate
          </h3>
        </div>

        <p className="text-xs text-slate-350 font-normal">
          Caso dois ou mais líderes acumulem exatamente a mesma pontuação nas classificações, os seguintes critérios serão usados sucessivamente para eleger os ganhadores dos prêmios:
        </p>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <li className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-1.5 hover:bg-white/[0.04] transition-all">
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">1º Critério</span>
            <span className="font-sans font-black uppercase text-xs">Gols Exatos</span>
            <span className="text-[10px] text-slate-400 leading-snug">Maior número de acertos de Placar Exato (+5).</span>
          </li>
          <li className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-1.5 hover:bg-white/[0.04] transition-all">
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">2º Critério</span>
            <span className="font-sans font-black uppercase text-xs">Diferença de Gols</span>
            <span className="text-[10px] text-slate-400 leading-snug">Maior número de acertos de Diferença de Gols (+2).</span>
          </li>
          <li className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-1.5 hover:bg-white/[0.04] transition-all">
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">3º Critério</span>
            <span className="font-sans font-black uppercase text-xs">Placar Vencedor</span>
            <span className="text-[10px] text-slate-400 leading-snug">Maior número de acertos de Placar Vencedor (+3).</span>
          </li>
          <li className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-1.5 hover:bg-white/[0.04] transition-all">
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">4º Critério</span>
            <span className="font-sans font-black uppercase text-xs">Nome Alfabético</span>
            <span className="text-[10px] text-slate-400 leading-snug">Ordem alfabética do apelido público cadastrado.</span>
          </li>
        </ol>
      </div>

    </div>
  );
}
