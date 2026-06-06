/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Gift, Award, Star, Shield, Trophy } from "lucide-react";

export default function Prizes() {
  const prizesList = [
    {
      place: "1º Lugar",
      title: "iPhone 17 Pro",
      accent: "from-yellow-400 to-amber-500",
      iconColor: "text-amber-400",
      bgBlur: "bg-amber-500/5",
      borderColor: "border-amber-450/30",
      description: "O smartphone topo de linha mais cobiçado do mundo para gravar e assistir aos lances da Copa.",
      emoji: "📱",
    },
    {
      place: "2º Lugar",
      title: "iPad 11",
      accent: "from-slate-300 to-slate-450",
      iconColor: "text-slate-300",
      bgBlur: "bg-slate-350/5",
      borderColor: "border-slate-300/20",
      description: "Super tablet de última geração para produtividade nos seus estudos e entretenimento esportivo.",
      emoji: "平板",
    },
    {
      place: "3º Lugar",
      title: "01 Semestre de Faculdade Grátis",
      accent: "from-amber-600 to-amber-800",
      iconColor: "text-amber-700",
      bgBlur: "bg-amber-700/5",
      borderColor: "border-amber-600/20",
      description: "Isenção total da mensalidade de 1 semestre letivo (01 Semestre Letivo Gratuito na UNIPIO).",
      emoji: "🎓",
    },
    {
      place: "4º Lugar",
      title: "Smartphone Moto G5",
      accent: "from-teal-400 to-emerald-600",
      iconColor: "text-teal-400",
      bgBlur: "bg-teal-500/5",
      borderColor: "border-teal-500/20",
      description: "Celular ágil com bateria durável para acompanhar todos os resultados do bolão do Pokabas.",
      emoji: "📱",
    },
    {
      place: "5º Lugar",
      title: "R$ 1.000,00 em Crétido Veterinário",
      accent: "from-indigo-400 to-purple-600",
      iconColor: "text-indigo-400",
      bgBlur: "bg-indigo-500/5",
      borderColor: "border-indigo-500/20",
      description: "Crédito garantido no Hospital Veterinário Pokabas de Aracaju para o cuidado completo do seu pet de estimação.",
      emoji: "🐾",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-white">
      
      {/* HEADER DE PRÊMIOS */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-emerald-500 to-emerald-350 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative space-y-3">
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-emerald-400 tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Premiações Oficiais Copa 2026</span>
          </span>
          <h2 className="text-3xl font-sans font-black tracking-tight uppercase">
            RECOMPENSAS DO LÍDER
          </h2>
          <p className="text-xs text-slate-350 leading-relaxed max-w-2xl font-normal">
            Os palpites inteligentes serão compensados com prêmios de alto nível fornecidos pelos hosts do <strong className="text-emerald-400">UNIPIO Pokabas TV</strong>. A contagem final será encerrada ao término do último jogo do torneio!
          </p>
        </div>
      </div>

      {/* DISPOSIÇÃO DO PODIUM VISUAL (BENTO STYLE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* PODIUM 1: PRIMEIRO LUGAR (MAIOR CARTÃO - GOLD GLASS) */}
        <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 p-6 bg-gradient-to-b from-yellow-950/20 via-neutral-900 to-[#100D00]/40 backdrop-blur-md md:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl shadow-yellow-500/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
          
          <div className="space-y-3 flex-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-black uppercase rounded-full tracking-wider animate-pulse">
                🏆 Campeão do Geral
              </span>
              <div className="text-2xl">🥇</div>
            </div>
            
            <h3 className="text-3xl font-sans font-black uppercase text-yellow-400 tracking-tight leading-none">
              {prizesList[0].title}
            </h3>
            
            <p className="text-xs text-slate-350 max-w-xl font-normal">
              {prizesList[0].description}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl w-full md:w-auto min-w-[140px] select-none text-center">
            <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-widest">Valor Estimado</span>
            <span className="text-xl font-mono font-black text-white mt-1">R$ 9.800</span>
          </div>
        </div>

        {/* PRÊMIOS RESTANTES (2, 3, 4, 5) - GLASS GRID */}
        {prizesList.slice(1).map((prize, idx) => (
          <div 
            key={idx}
            className={`relative overflow-hidden rounded-3xl border ${prize.borderColor} ${prize.bgBlur} p-5 flex flex-col justify-between gap-4 transition-all hover:scale-[1.01] hover:bg-white/[0.03] backdrop-blur-md`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">
                  {prize.place}
                </span>
                <span className="text-lg">
                  {idx === 0 ? "🥈" : idx === 1 ? "🥉" : "🎁"}
                </span>
              </div>

              <h4 className="text-lg font-sans font-black uppercase text-white leading-tight">
                {prize.title}
              </h4>

              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                {prize.description}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase font-mono">
              <span>Host Oficial</span>
              <span className="text-slate-350">UNIPIO Pokabas TV</span>
            </div>
          </div>
        ))}

      </div>

      {/* TERMOS E CONDIÇÕES SIMPLIFICADOS */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] text-slate-500 text-center font-normal flex items-center justify-center gap-2">
        <Shield className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        <span>A entrega da premiação ocorrerá em até 15 dias úteis com base no ranking auditado geral do sistema localStorage. Regulamento geral se aplica.</span>
      </div>

    </div>
  );
}
