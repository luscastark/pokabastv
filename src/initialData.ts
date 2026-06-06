/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, User, Prediction, LeaderboardUser, ScoreDetail, Team } from "./types";

export const TEAMS: Record<string, Team> = {
  // Grupo A
  MEX: { name: "México", code: "MEX", flag: "🇲🇽" },
  USA: { name: "EUA", code: "USA", flag: "🇺🇸" },
  CAN: { name: "Canadá", code: "CAN", flag: "🇨🇦" },
  CRC: { name: "Costa Rica", code: "CRC", flag: "🇨🇷" },
  // Grupo B
  BRA: { name: "Brasil", code: "BRA", flag: "🇧🇷" },
  CRO: { name: "Croácia", code: "CRO", flag: "🇭🇷" },
  JPN: { name: "Japão", code: "JPN", flag: "🇯🇵" },
  CMR: { name: "Camarões", code: "CMR", flag: "🇨🇲" },
  // Grupo C
  ARG: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
  FRA: { name: "França", code: "FRA", flag: "🇫🇷" },
  MAR: { name: "Marrocos", code: "MAR", flag: "🇲🇦" },
  KOR: { name: "Coreia do Sul", code: "KOR", flag: "🇰🇷" },
  // Grupo D
  ESP: { name: "Espanha", code: "ESP", flag: "🇪🇸" },
  GER: { name: "Alemanha", code: "GER", flag: "🇩🇪" },
  NGA: { name: "Nigéria", code: "NGA", flag: "🇳🇬" },
  KSA: { name: "Arábia Saudita", code: "KSA", flag: "🇸🇦" },
  // Grupo E
  POR: { name: "Portugal", code: "POR", flag: "🇵🇹" },
  URU: { name: "Uruguai", code: "URU", flag: "🇺🇾" },
  EGY: { name: "Egito", code: "EGY", flag: "🇪🇬" },
  IRQ: { name: "Iraque", code: "IRQ", flag: "🇮🇶" },
  // Grupo F
  ENG: { name: "Inglaterra", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  COL: { name: "Colômbia", code: "COL", flag: "🇨🇴" },
  AUS: { name: "Austrália", code: "AUS", flag: "🇦🇺" },
  SEN: { name: "Senegal", code: "SEN", flag: "🇸🇳" },
  // Grupo G
  ITA: { name: "Itália", code: "ITA", flag: "🇮🇹" },
  ECU: { name: "Equador", code: "ECU", flag: "🇪🇨" },
  SWE: { name: "Suécia", code: "SWE", flag: "🇸🇪" },
  ALG: { name: "Argélia", code: "ALG", flag: "🇩🇿" },
  // Grupo H
  NED: { name: "Holanda", code: "NED", flag: "🇳🇱" },
  PER: { name: "Peru", code: "PER", flag: "🇵🇪" },
  SUI: { name: "Suíça", code: "SUI", flag: "🇨🇭" },
  GHA: { name: "Gana", code: "GHA", flag: "🇬🇭" },
  // Grupo I
  BEL: { name: "Bélgica", code: "BEL", flag: "🇧🇪" },
  CHI: { name: "Chile", code: "CHI", flag: "🇨🇱" },
  DEN: { name: "Dinamarca", code: "DEN", flag: "🇩🇰" },
  TUN: { name: "Tunísia", code: "TUN", flag: "🇹🇳" },
  // Grupo J
  UKR: { name: "Ucrânia", code: "UKR", flag: "🇺🇦" },
  PAR: { name: "Paraguai", code: "PAR", flag: "🇵🇾" },
  POL: { name: "Polônia", code: "POL", flag: "🇵🇱" },
  IRN: { name: "Irã", code: "IRN", flag: "🇮🇷" },
  // Grupo K
  TUR: { name: "Turquia", code: "TUR", flag: "🇹🇷" },
  SCO: { name: "Escócia", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  PAN: { name: "Panamá", code: "PAN", flag: "🇵🇦" },
  JAM: { name: "Jamaica", code: "JAM", flag: "🇯🇲" },
  // Grupo L
  WAL: { name: "País de Gales", code: "WAL", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  NZL: { name: "Nova Zelândia", code: "NZL", flag: "🇳🇿" },
  HON: { name: "Honduras", code: "HON", flag: "🇭🇳" },
  RSA: { name: "África do Sul", code: "RSA", flag: "🇿🇦" }
};

export const GROUPS = [
  { name: "Grupo A", teams: ["MEX", "USA", "CAN", "CRC"] },
  { name: "Grupo B", teams: ["BRA", "CRO", "JPN", "CMR"] },
  { name: "Grupo C", teams: ["ARG", "FRA", "MAR", "KOR"] },
  { name: "Grupo D", teams: ["ESP", "GER", "NGA", "KSA"] },
  { name: "Grupo E", teams: ["POR", "URU", "EGY", "IRQ"] },
  { name: "Grupo F", teams: ["ENG", "COL", "AUS", "SEN"] },
  { name: "Grupo G", teams: ["ITA", "ECU", "SWE", "ALG"] },
  { name: "Grupo H", teams: ["NED", "PER", "SUI", "GHA"] },
  { name: "Grupo I", teams: ["BEL", "CHI", "DEN", "TUN"] },
  { name: "Grupo J", teams: ["UKR", "PAR", "POL", "IRN"] },
  { name: "Grupo K", teams: ["TUR", "SCO", "PAN", "JAM"] },
  { name: "Grupo L", teams: ["WAL", "NZL", "HON", "RSA"] },
];

export const STRONG_TEAMS = ["BRA", "ARG", "FRA", "GER", "ESP", "ENG", "POR", "ITA", "NED", "BEL"];

export function getFlagUrl(code: string): string {
  const mapping: Record<string, string> = {
    MEX: "mx", USA: "us", CAN: "ca", CRC: "cr",
    BRA: "br", CRO: "hr", JPN: "jp", CMR: "cm",
    ARG: "ar", FRA: "fr", MAR: "ma", KOR: "kr",
    ESP: "es", GER: "de", NGA: "ng", KSA: "sa",
    POR: "pt", URU: "uy", EGY: "eg", IRQ: "iq",
    ENG: "gb-eng", COL: "co", AUS: "au", SEN: "sn",
    ITA: "it", ECU: "ec", SWE: "se", ALG: "dz",
    NED: "nl", PER: "pe", SUI: "ch", GHA: "gh",
    BEL: "be", CHI: "cl", DEN: "dk", TUN: "tn",
    UKR: "ua", PAR: "py", POL: "pl", IRN: "ir",
    TUR: "tr", SCO: "gb-sct", PAN: "pa", JAM: "jm",
    WAL: "gb-wls", NZL: "nz", HON: "hn", RSA: "za"
  };
  const c = mapping[code.toUpperCase()];
  if (!c) return "https://flagcdn.com/w40/un.png";
  return `https://flagcdn.com/w40/${c}.png`;
}

function generateMatches(): Match[] {
  const matches: Match[] = [];

  const groupMatchups: Record<string, { t1: string; t2: string; round: number }[]> = {};

  GROUPS.forEach(g => {
    const t = g.teams;
    groupMatchups[g.name] = [
      { t1: t[0], t2: t[1], round: 1 },
      { t1: t[2], t2: t[3], round: 1 },
      { t1: t[0], t2: t[2], round: 2 },
      { t1: t[1], t2: t[3], round: 2 },
      { t1: t[0], t2: t[3], round: 3 },
      { t1: t[1], t2: t[2], round: 3 }
    ];
  });

  const explicitMapping: Record<string, string> = {
    "MEX-USA": "m1",
    "CAN-CRC": "m2",
    "BRA-CRO": "m3",
    "JPN-CMR": "m4",
    "ARG-FRA": "m5",
    "MAR-KOR": "m6",
    "ESP-GER": "m7",
    "NGA-KSA": "m8",
    "POR-URU": "m9",
    "ENG-COL": "m10",
  };

  let nextAutoId = 11;
  const getMatchId = (t1: string, t2: string): string => {
    const key1 = `${t1}-${t2}`;
    const key2 = `${t2}-${t1}`;
    if (explicitMapping[key1]) return explicitMapping[key1];
    if (explicitMapping[key2]) return explicitMapping[key2];
    const id = `m${nextAutoId}`;
    nextAutoId++;
    return id;
  };

  const stadiums = [
    "Estádio Azteca, Cidade do México",
    "BC Place, Vancouver",
    "SoFi Stadium, Los Angeles",
    "MetLife Stadium, New Jersey",
    "Hard Rock Stadium, Miami",
    "Mercedes-Benz Stadium, Atlanta",
    "AT&T Stadium, Dallas",
    "NRG Stadium, Houston",
    "Lumen Field, Seattle",
    "Levi's Stadium, Santa Clara",
    "Gillette Stadium, Boston",
    "Lincoln Financial Field, Filadélfia"
  ];

  GROUPS.forEach((g, gIdx) => {
    const matchups = groupMatchups[g.name];
    matchups.forEach((mu, muIdx) => {
      const t1 = TEAMS[mu.t1];
      const t2 = TEAMS[mu.t2];
      const id = getMatchId(mu.t1, mu.t2);

      let day = 11;
      if (mu.round === 2) day = 16 + (gIdx % 5);
      else if (mu.round === 3) day = 21 + (gIdx % 5);
      else day = 11 + (gIdx % 5);

      const dateStr = `${day.toString().padStart(2, "0")}/06/2026`;
      const timeStr = muIdx % 2 === 0 ? "17:00" : "20:00";
      const stadium = stadiums[(gIdx + muIdx) % stadiums.length];

      let simulatedResult1: number | undefined = undefined;
      let simulatedResult2: number | undefined = undefined;
      let isFinished = false;

      if (mu.round < 3) {
        isFinished = true;
        const isStrong1 = STRONG_TEAMS.includes(mu.t1);
        const isStrong2 = STRONG_TEAMS.includes(mu.t2);
        const hash = (mu.t1.charCodeAt(0) + mu.t2.charCodeAt(0) + mu.round) % 5;

        if (isStrong1 && !isStrong2) {
          simulatedResult1 = 2 + (hash % 2);
          simulatedResult2 = hash % 2;
        } else if (!isStrong1 && isStrong2) {
          simulatedResult1 = hash % 2;
          simulatedResult2 = 2 + (hash % 2);
        } else {
          simulatedResult1 = hash % 3;
          simulatedResult2 = (hash + 1) % 3;
        }
      }

      if (id === "m1") { simulatedResult1 = 2; simulatedResult2 = 1; isFinished = true; }
      else if (id === "m2") { simulatedResult1 = 1; simulatedResult2 = 1; isFinished = true; }
      else if (id === "m3") { simulatedResult1 = 3; simulatedResult2 = 1; isFinished = true; }
      else if (id === "m4") { simulatedResult1 = 2; simulatedResult2 = 0; isFinished = true; }
      else if (id === "m5") { simulatedResult1 = 2; simulatedResult2 = 2; isFinished = true; }
      else if (id === "m6") { simulatedResult1 = 1; simulatedResult2 = 0; isFinished = true; }
      else if (id === "m7") { simulatedResult1 = 0; simulatedResult2 = 2; isFinished = true; }
      else if (id === "m8") { simulatedResult1 = 1; simulatedResult2 = 1; isFinished = false; }
      else if (id === "m9") { simulatedResult1 = 2; simulatedResult2 = 1; isFinished = false; }
      else if (id === "m10") { simulatedResult1 = 2; simulatedResult2 = 0; isFinished = false; }

      const isFavoriteTeam1 = STRONG_TEAMS.includes(mu.t1) || (!STRONG_TEAMS.includes(mu.t2) && mu.t1 < mu.t2);

      matches.push({
        id,
        team1: t1,
        team2: t2,
        date: dateStr,
        time: timeStr,
        group: g.name,
        stadium,
        simulatedResult1,
        simulatedResult2,
        isFinished,
        isFavoriteTeam1,
      });
    });
  });

  matches.sort((a, b) => {
    const numA = parseInt(a.id.substring(1), 10);
    const numB = parseInt(b.id.substring(1), 10);
    return numA - numB;
  });

  for (let i = 1; i <= 16; i++) {
    matches.push({
      id: `r32_${i}`,
      team1: { name: `1º Grupo ${String.fromCharCode(64 + i)}`, code: "TBD", flag: "🏳️" },
      team2: { name: `3º Colocado ${i}`, code: "TBD", flag: "🏳️" },
      date: `${27 + Math.ceil(i/3)}/06/2026`,
      time: i % 2 === 0 ? "16:00" : "20:00",
      group: "16-avos de Final",
      stadium: stadiums[i % stadiums.length],
      isFinished: false,
      isFavoriteTeam1: true
    });
  }

  for (let i = 1; i <= 8; i++) {
    matches.push({
      id: `r16_${i}`,
      team1: { name: `Vencedor R32_${2*i-1}`, code: "TBD", flag: "🏳️" },
      team2: { name: `Vencedor R32_${2*i}`, code: "TBD", flag: "🏳️" },
      date: `0${3 + Math.ceil(i/2)}/07/2026`,
      time: i % 2 === 0 ? "16:00" : "20:00",
      group: "Oitavas de Final",
      stadium: stadiums[i % stadiums.length],
      isFinished: false,
      isFavoriteTeam1: true
    });
  }

  for (let i = 1; i <= 4; i++) {
    matches.push({
      id: `qf_${i}`,
      team1: { name: `Vencedor R16_${2*i-1}`, code: "TBD", flag: "🏳️" },
      team2: { name: `Vencedor R16_${2*i}`, code: "TBD", flag: "🏳️" },
      date: `0${8 + Math.ceil(i/2)}/07/2026`,
      time: i % 2 === 0 ? "16:00" : "20:00",
      group: "Quartas de Final",
      stadium: stadiums[i % stadiums.length],
      isFinished: false,
      isFavoriteTeam1: true
    });
  }

  for (let i = 1; i <= 2; i++) {
    matches.push({
      id: `sf_${i}`,
      team1: { name: `Vencedor QF_${2*i-1}`, code: "TBD", flag: "🏳️" },
      team2: { name: `Vencedor QF_${2*i}`, code: "TBD", flag: "🏳️" },
      date: `${13 + i}/07/2026`,
      time: "20:00",
      group: "Semifinal",
      stadium: stadiums[i % stadiums.length],
      isFinished: false,
      isFavoriteTeam1: true
    });
  }

  matches.push({
    id: "third_place",
    team1: { name: "Perdedor Semifinal 1", code: "TBD", flag: "🏳️" },
    team2: { name: "Perdedor Semifinal 2", code: "TBD", flag: "🏳️" },
    date: "18/07/2026",
    time: "17:00",
    group: "Disputa de 3º Lugar",
    stadium: "SoFi Stadium, Los Angeles",
    isFinished: false,
    isFavoriteTeam1: true
  });

  matches.push({
    id: "final",
    team1: { name: "Vencedor Semifinal 1", code: "TBD", flag: "🏳️" },
    team2: { name: "Vencedor Semifinal 2", code: "TBD", flag: "🏳️" },
    date: "19/07/2026",
    time: "18:00",
    group: "Final",
    stadium: "MetLife Stadium, New Jersey",
    isFinished: false,
    isFavoriteTeam1: true
  });

  return matches;
}

export const initialMatches: Match[] = generateMatches();

export interface GroupTeamStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export function calculateGroupStandings(matchesList: Match[]): Record<string, GroupTeamStanding[]> {
  const standings: Record<string, GroupTeamStanding[]> = {};

  GROUPS.forEach((g) => {
    standings[g.name] = g.teams.map((code) => ({
      team: TEAMS[code],
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }));
  });

  matchesList.forEach((m) => {
    if (m.id.startsWith("m")) {
      const gStandings = standings[m.group];
      if (gStandings) {
        const t1Standing = gStandings.find((s) => s.team.code === m.team1.code);
        const t2Standing = gStandings.find((s) => s.team.code === m.team2.code);

        if (t1Standing && t2Standing && m.isFinished && m.simulatedResult1 !== undefined && m.simulatedResult2 !== undefined) {
          const r1 = m.simulatedResult1;
          const r2 = m.simulatedResult2;

          t1Standing.played++;
          t2Standing.played++;
          t1Standing.goalsFor += r1;
          t1Standing.goalsAgainst += r2;
          t2Standing.goalsFor += r2;
          t2Standing.goalsAgainst += r1;
          t1Standing.goalDifference = t1Standing.goalsFor - t1Standing.goalsAgainst;
          t2Standing.goalDifference = t2Standing.goalsFor - t2Standing.goalsAgainst;

          if (r1 > r2) {
            t1Standing.won++;
            t1Standing.points += 3;
            t2Standing.lost++;
          } else if (r1 < r2) {
            t2Standing.won++;
            t2Standing.points += 3;
            t1Standing.lost++;
          } else {
            t1Standing.drawn++;
            t1Standing.points += 1;
            t2Standing.drawn++;
            t2Standing.points += 1;
          }
        }
      }
    }
  });

  Object.keys(standings).forEach((gName) => {
    standings[gName].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.name.localeCompare(b.team.name);
    });
  });

  return standings;
}

export function getBestThirdPlacedTeams(standings: Record<string, GroupTeamStanding[]>): GroupTeamStanding[] {
  const thirds: GroupTeamStanding[] = [];
  Object.keys(standings).forEach((gName) => {
    const list = standings[gName];
    if (list.length >= 3) {
      thirds.push(list[2]);
    }
  });

  return thirds.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.name.localeCompare(b.team.name);
  });
}

export function resolveTournamentBracket(matchesList: Match[]): Match[] {
  const list = matchesList.map((m) => ({ ...m }));

  const standings = calculateGroupStandings(list);

  const groupWinners: Record<string, Team> = {};
  const groupRunnersUp: Record<string, Team> = {};

  Object.keys(standings).forEach((gName) => {
    const g = standings[gName];
    const groupLetter = gName.split(" ")[1];
    groupWinners[groupLetter] = g[0].team;
    groupRunnersUp[groupLetter] = g[1].team;
  });

  const bestThirds = getBestThirdPlacedTeams(standings).map((s) => s.team);

  const r32Pairings: { id: string; t1: Team; t2: Team }[] = [
    { id: "r32_1", t1: groupWinners["A"], t2: bestThirds[0] || { name: "3º Colocado A/C/D", code: "TBD", flag: "🏳️" } },
    { id: "r32_2", t1: groupRunnersUp["A"], t2: groupRunnersUp["B"] },
    { id: "r32_3", t1: groupWinners["B"], t2: bestThirds[1] || { name: "3º Colocado B/F/G", code: "TBD", flag: "🏳️" } },
    { id: "r32_4", t1: groupWinners["C"], t2: bestThirds[2] || { name: "3º Colocado E/H/I", code: "TBD", flag: "🏳️" } },
    { id: "r32_5", t1: groupRunnersUp["C"], t2: groupRunnersUp["D"] },
    { id: "r32_6", t1: groupWinners["D"], t2: bestThirds[3] || { name: "3º Colocado J/K/L", code: "TBD", flag: "🏳️" } },
    { id: "r32_7", t1: groupWinners["E"], t2: bestThirds[4] || { name: "3º Colocado C/D/E", code: "TBD", flag: "🏳️" } },
    { id: "r32_8", t1: groupRunnersUp["E"], t2: groupRunnersUp["F"] },
    { id: "r32_9", t1: groupWinners["F"], t2: bestThirds[5] || { name: "3º Colocado A/B/H", code: "TBD", flag: "🏳️" } },
    { id: "r32_10", t1: groupWinners["G"], t2: bestThirds[6] || { name: "3º Colocado F/G/I", code: "TBD", flag: "🏳️" } },
    { id: "r32_11", t1: groupRunnersUp["G"], t2: groupRunnersUp["H"] },
    { id: "r32_12", t1: groupWinners["H"], t2: bestThirds[7] || { name: "3º Colocado J/K/N", code: "TBD", flag: "🏳️" } },
    { id: "r32_13", t1: groupWinners["I"], t2: groupRunnersUp["J"] },
    { id: "r32_14", t1: groupWinners["J"], t2: groupRunnersUp["I"] },
    { id: "r32_15", t1: groupWinners["K"], t2: groupRunnersUp["L"] },
    { id: "r32_16", t1: groupWinners["L"], t2: groupRunnersUp["K"] },
  ];

  const getMatchWinner = (match: Match): Team | undefined => {
    if (!match.isFinished || match.simulatedResult1 === undefined || match.simulatedResult2 === undefined) {
      return undefined;
    }
    if (match.simulatedResult1 > match.simulatedResult2) return match.team1;
    if (match.simulatedResult2 > match.simulatedResult1) return match.team2;
    if (match.knockoutWinnerCode) {
      if (match.knockoutWinnerCode === match.team1.code) return match.team1;
      if (match.knockoutWinnerCode === match.team2.code) return match.team2;
    }
    return match.isFavoriteTeam1 ? match.team1 : match.team2;
  };

  const getMatchLoser = (match: Match): Team | undefined => {
    const winner = getMatchWinner(match);
    if (!winner) return undefined;
    return winner.code === match.team1.code ? match.team2 : match.team1;
  };

  r32Pairings.forEach((p) => {
    const matchIdx = list.findIndex((m) => m.id === p.id);
    if (matchIdx !== -1) {
      list[matchIdx].team1 = p.t1;
      list[matchIdx].team2 = p.t2;
    }
  });

  const resolveRoundMatch = (matchId: string, prev1Id: string, prev2Id: string, isLoser = false) => {
    const matchIdx = list.findIndex((m) => m.id === matchId);
    if (matchIdx !== -1) {
      const prev1 = list.find((m) => m.id === prev1Id);
      const prev2 = list.find((m) => m.id === prev2Id);

      if (prev1 && prev2) {
        if (isLoser) {
          const loser1 = getMatchLoser(prev1);
          const loser2 = getMatchLoser(prev2);
          if (loser1) list[matchIdx].team1 = loser1;
          if (loser2) list[matchIdx].team2 = loser2;
        } else {
          const win1 = getMatchWinner(prev1);
          const win2 = getMatchWinner(prev2);
          if (win1) list[matchIdx].team1 = win1;
          if (win2) list[matchIdx].team2 = win2;
        }
      }
    }
  };

  for (let i = 1; i <= 8; i++) {
    resolveRoundMatch(`r16_${i}`, `r32_${2*i-1}`, `r32_${2*i}`);
  }

  for (let i = 1; i <= 4; i++) {
    resolveRoundMatch(`qf_${i}`, `r16_${2*i-1}`, `r16_${2*i}`);
  }

  for (let i = 1; i <= 2; i++) {
    resolveRoundMatch(`sf_${i}`, `qf_${2*i-1}`, `qf_${2*i}`);
  }

  resolveRoundMatch("third_place", "sf_1", "sf_2", true);
  resolveRoundMatch("final", "sf_1", "sf_2");

  return list;
}


export const mockUsers: User[] = [
  {
    id: "ptv1",
    name: "Alex Pokabas",
    fullName: "Alexandre Silva Pokabas",
    cpf: "111.222.333-44",
    phone: "(79) 99888-1111",
    email: "alex@pokabas.tv",
    education: "Superior Completo",
    cityState: "Aracaju / SE",
    instagram: "@alexpokabas",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    isAdmin: true
  },
  {
    id: "ptv2",
    name: "Guga Craque",
    fullName: "Gustavo Santos de Andrade",
    cpf: "222.333.444-55",
    phone: "(79) 99888-2222",
    email: "gugacraque@gmail.com",
    education: "Superior Incompleto",
    cityState: "Socorro / SE",
    instagram: "@gugacraque",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "ptv3",
    name: "Mari Goleadora",
    fullName: "Mariana Alencar Mendonça",
    cpf: "333.444.555-66",
    phone: "(79) 99888-3333",
    email: "marigol@hotmail.com",
    education: "Pós-Graduação",
    cityState: "Lagarto / SE",
    instagram: "@marigoleadora",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "ptv4",
    name: "Brunão da Geral",
    fullName: "Bruno de Souza Ramos",
    cpf: "444.555.666-77",
    phone: "(79) 99888-4444",
    email: "brunaogeral@yahoo.com",
    education: "Ensino Médio Completo",
    cityState: "Itabaiana / SE",
    instagram: "@brunaopitbull",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "ptv5",
    name: "Carol Chute Lindo",
    fullName: "Carolina Oliveira Lima",
    cpf: "555.666.777-88",
    phone: "(79) 99888-5555",
    email: "carolcl@gmail.com",
    education: "Mestrado",
    cityState: "Aracaju / SE",
    instagram: "@carolchute",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "ptv6",
    name: "Tiago Impedido",
    fullName: "Tiago Cardoso de Jesus",
    cpf: "666.777.888-99",
    phone: "(79) 99888-6666",
    email: "tiagoimpedid@gmail.com",
    education: "Ensino Técnico",
    cityState: "Estância / SE",
    instagram: "@tiagopedindo",
    avatarUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80"
  }
];

// Palpites iniciais mockados
export const mockPredictions: Record<string, Prediction[]> = {
  "ptv1": [ // Alex Pokabas
    { matchId: "m1", goals1: "2", goals2: "1", updatedAt: "2026-06-06T10:00:00Z" }, // Exato! (MEX vence)
    { matchId: "m2", goals1: "1", goals2: "1", updatedAt: "2026-06-06T10:01:00Z" }, // Exato! (Draw)
    { matchId: "m3", goals1: "3", goals2: "1", updatedAt: "2026-06-06T10:02:00Z" }, // Exato! (BRA vence)
    { matchId: "m4", goals1: "1", goals2: "0", updatedAt: "2026-06-06T10:03:00Z" }, // Vencedor apenas (JPN vence)
    { matchId: "m5", goals1: "2", goals2: "2", updatedAt: "2026-06-06T10:04:00Z" }, // Exato! (Draw)
    { matchId: "m6", goals1: "2", goals2: "1", updatedAt: "2026-06-06T10:05:00Z" }, // Vencedor apenas (MAR vence)
    { matchId: "m7", goals1: "1", goals2: "2", updatedAt: "2026-06-06T10:06:00Z" }, // Exato! (GER vence - caneca zebra!)
  ],
  "ptv2": [ // Guga Craque
    { matchId: "m1", goals1: "1", goals2: "1", updatedAt: "2026-06-06T11:00:00Z" }, // Errou
    { matchId: "m2", goals1: "1", goals2: "1", updatedAt: "2026-06-06T11:01:00Z" }, // Exato!
    { matchId: "m3", goals1: "2", goals2: "0", updatedAt: "2026-06-06T11:02:00Z" }, // Vencedor e Saldo
    { matchId: "m4", goals1: "2", goals2: "0", updatedAt: "2026-06-06T11:03:00Z" }, // Exato!
    { matchId: "m5", goals1: "1", goals2: "1", updatedAt: "2026-06-06T11:04:00Z" }, // Vencedor/Empate apenas
    { matchId: "m6", goals1: "1", goals2: "0", updatedAt: "2026-06-06T11:05:00Z" }, // Exato!
    { matchId: "m7", goals1: "0", goals2: "0", updatedAt: "2026-06-06T11:06:00Z" },
  ],
  "ptv3": [ // Mari Goleadora
    { matchId: "m1", goals1: "3", goals2: "2", updatedAt: "2026-06-06T12:00:00Z" }, // Vencedor e Saldo
    { matchId: "m2", goals1: "2", goals2: "2", updatedAt: "2026-06-06T12:01:00Z" }, // Vencedor/Empate apenas
    { matchId: "m3", goals1: "4", goals2: "2", updatedAt: "2026-06-06T12:02:00Z" }, // Vencedor e Saldo
    { matchId: "m4", goals1: "3", goals2: "0", updatedAt: "2026-06-06T12:03:00Z" }, // Vencedor apenas
    { matchId: "m5", goals1: "3", goals2: "1", updatedAt: "2026-06-06T12:04:00Z" }, // Errou
    { matchId: "m6", goals1: "1", goals2: "1", updatedAt: "2026-06-06T12:05:00Z" }, // Errou
    { matchId: "m7", goals1: "1", goals2: "2", updatedAt: "2026-06-06T12:06:00Z" }, // Exato!
  ]
};

/**
 * Calcula a pontuação detalhada para um palpite individual UNIPIO Pokabas TV:
 * 
 * Regras Exatas de Tipo de Acerto:
 * - Placar Exato: +5 pontos
 * - Placar Vencedor (Acertou quem ganha/empata, mas não o placar exato): +3 pontos
 * - Diferença de Gols (Acertou o saldo do vencedor): +2 pontos
 * - Placar Perdedor (Acertou a quantidade de gols do derrotado): +1 ponto
 * - Goleada (Bônus para placares com muitos gols - total de gols >= 4): +1 ponto
 * 
 * Regras Exatas de Pontos Base (Odds - Se acertar o vencedor/empate):
 * - Vitória do Favorito: +2 pontos base
 * - Empate: +7 pontos base
 * - Vitória da Zebra: +11 pontos base
 */
export function calculatePredictionPoints(
  prediction: Prediction | undefined,
  match: Match
): ScoreDetail {
  const emptyDetail: ScoreDetail = {
    points: 0,
    isExact: false,
    isWinner: false,
    isGoalDiff: false,
    isLoserGoals: false,
    isGoleada: false,
    basePoints: 0,
    baseType: "none",
  };

  if (!prediction || prediction.goals1 === "" || prediction.goals2 === "") {
    return emptyDetail;
  }

  const r1 = match.simulatedResult1;
  const r2 = match.simulatedResult2;

  // Se o jogo não tem resultado ou não está finalizado, não pode pontuar
  if (r1 === undefined || r2 === undefined || !match.isFinished) {
    return emptyDetail;
  }

  const p1 = parseInt(prediction.goals1, 10);
  const p2 = parseInt(prediction.goals2, 10);

  if (isNaN(p1) || isNaN(p2)) {
    return emptyDetail;
  }

  // Identificação do vencedor do palpite
  // 1: Team 1 won, 2: Team 2 won, 0: Draw
  const palpiteVencedor = p1 > p2 ? 1 : p1 < p2 ? 2 : 0;
  // Identificação do vencedor real
  const realVencedor = r1 > r2 ? 1 : r1 < r2 ? 2 : 0;

  // Se errou quem ganha ou empatou totalmente, pontos são zerados
  if (palpiteVencedor !== realVencedor) {
    return emptyDetail;
  }

  // Se chegou aqui, o usuário acertou o VENCEDOR ou o EMPATE!
  let isExact = false;
  let isWinner = false;
  let isGoalDiff = false;
  let isLoserGoals = false;
  let isGoleada = false;

  let totalPoints = 0;

  // 1. Placar Exato: +5 pontos
  if (p1 === r1 && p2 === r2) {
    isExact = true;
    totalPoints += 5;
  } else {
    // 2. Placar Vencedor: +3 pontos
    isWinner = true;
    totalPoints += 3;
  }

  // 3. Diferença de Gols (Acertou o saldo de gols): +2 pontos
  // Válido apenas para jogos com vencedor definido (não empates)
  if (realVencedor !== 0) {
    const palpiteSaldo = Math.abs(p1 - p2);
    const realSaldo = Math.abs(r1 - r2);
    if (palpiteSaldo === realSaldo) {
      isGoalDiff = true;
      totalPoints += 2;
    }
  }

  // 4. Placar Perdedor (Acertou a quantidade de gols do derrotado): +1 ponto
  // Requisito: ter um derrotado (vencedor !== 0)
  if (realVencedor !== 0) {
    const realLoserGoals = realVencedor === 1 ? r2 : r1;
    const palpiteLoserGoals = realVencedor === 1 ? p2 : p1;
    if (realLoserGoals === palpiteLoserGoals) {
      isLoserGoals = true;
      totalPoints += 1;
    }
  }

  // 5. Goleada: +1 ponto de bônus se o jogo teve muitos gols (total de gols real >= 4)
  if (r1 + r2 >= 4) {
    isGoleada = true;
    totalPoints += 1;
  }

  // 6. Pontos Base da Rodada (Odds do Jogo)
  let basePoints = 0;
  let baseType: "favorito" | "zebra" | "empate" = "favorito";

  if (realVencedor === 0) {
    // Empate: +7 pontos base
    basePoints = 7;
    baseType = "empate";
  } else {
    // Vitória do Favorito (+2 pts) ou Vitória da Zebra (+11 pts)
    const isTeam1Favorite = match.isFavoriteTeam1 ?? true;
    const isCorrectWinnerFavorite = 
      (realVencedor === 1 && isTeam1Favorite) || 
      (realVencedor === 2 && !isTeam1Favorite);

    if (isCorrectWinnerFavorite) {
      basePoints = 2;
      baseType = "favorito";
    } else {
      basePoints = 11;
      baseType = "zebra";
    }
  }

  totalPoints += basePoints;

  return {
    points: totalPoints,
    isExact,
    isWinner,
    isGoalDiff,
    isLoserGoals,
    isGoleada,
    basePoints,
    baseType,
  };
}

/**
 * Compila a classificação com dados atualizados e desempates sofisticados
 */
export function buildLeaderboard(
  matches: Match[],
  currentUser: User | null,
  currentPredictions: Prediction[],
  allUsers: User[],
  allPredictions: Record<string, Prediction[]>
): LeaderboardUser[] {
  const usersList = [...allUsers];
  
  if (currentUser && !usersList.some((u) => u.id === currentUser.id)) {
    usersList.push(currentUser);
  }

  const leaderboard: LeaderboardUser[] = usersList.map((usr) => {
    const preds = usr.id === currentUser?.id ? currentPredictions : (allPredictions[usr.id] || []);

    let totalPoints = 0;
    let exactScores = 0;
    let winnerOnly = 0;
    let goalDifference = 0;
    let loserGoals = 0;
    let goleadas = 0;

    matches.forEach((match) => {
      const pred = preds.find((p) => p.matchId === match.id);
      const detail = calculatePredictionPoints(pred, match);

      totalPoints += detail.points;
      if (detail.isExact) exactScores++;
      if (detail.isWinner) winnerOnly++;
      if (detail.isGoalDiff) goalDifference++;
      if (detail.isLoserGoals) loserGoals++;
      if (detail.isGoleada) goleadas++;
    });

    return {
      id: usr.id,
      name: usr.name,
      fullName: usr.fullName || usr.name,
      avatarUrl: usr.avatarUrl,
      points: totalPoints,
      exactScores,
      winnerOnly,
      goalDifference,
      loserGoals,
      goleadas
    };
  });

  // Ordena por pontos totais (descrescente), depois acertos exatos, depois diferença de gols, depois ordem alfabética
  return leaderboard.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.exactScores !== a.exactScores) {
      return b.exactScores - a.exactScores;
    }
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    return a.name.localeCompare(b.name);
  });
}
