/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Team {
  name: string;
  code: string;
  flag: string; // Emoji de bandeira
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  date: string; // Ex: "11/06/2026"
  time: string; // Ex: "17:00"
  group: string; // E.g., "Grupo A", "Grupo B", "Fase Final"
  stadium: string;
  simulatedResult1?: number; // Resultado simulado real da partida
  simulatedResult2?: number; // Resultado simulado real da partida
  isFinished?: boolean;
  isFavoriteTeam1?: boolean; // True se Time 1 é favorito, False se Time 2 é favorito (Underdog/Zebra)
  knockoutWinnerCode?: string; // Código da seleção (Ex: BRA) que venceu nos pênaltis/prorrogação
}

export interface Prediction {
  matchId: string;
  goals1: string; // Mantido como string de input para suportar vazio temporário
  goals2: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  education: string; // Escolaridade
  cityState: string; // Cidade / Estado
  instagram: string; // Perfil do Instagram (Ex: @usuario)
  avatarUrl: string;
  isAdmin?: boolean;
}

export interface ScoreDetail {
  points: number;
  isExact: boolean;       // +5 pts
  isWinner: boolean;      // +3 pts
  isGoalDiff: boolean;    // +2 pts
  isLoserGoals: boolean;  // +1 pt
  isGoleada: boolean;     // +1 pt bonus (>= 4 goals)
  basePoints: number;     // Favorito (+2), Zebra (+11), Draw (+7)
  baseType: "favorito" | "zebra" | "empate" | "none";
}

export interface LeaderboardUser {
  id: string;
  name: string;
  fullName: string;
  avatarUrl: string;
  points: number;
  exactScores: number; // Placar exato count
  winnerOnly: number; // Placar vencedor count
  goalDifference: number; // Diferença de gols count
  loserGoals: number; // Placar perdedor count
  goleadas: number; // Goleada bonus count
}
