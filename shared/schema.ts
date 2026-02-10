// Shared types - mirrored from web app (without drizzle ORM dependencies)

export type Player = {
  uid: string;
  name: string;
  waitingForGame?: boolean;
  connected?: boolean;
};

export type RoomStatus = 'waiting' | 'playing';

export type GameModeType =
  | 'palavraSecreta'
  | 'palavras'
  | 'duasFaccoes'
  | 'categoriaItem'
  | 'perguntasDiferentes'
  | 'palavraComunidade';

export type PlayerAnswer = {
  playerId: string;
  playerName: string;
  answer: string;
};

export type PlayerVote = {
  playerId: string;
  playerName: string;
  targetId: string;
  targetName: string;
};

export type GameConfig = {
  impostorCount: number;
  enableHints: boolean;
  firstPlayerHintOnly: boolean;
};

export type GameData = {
  word?: string;
  location?: string;
  roles?: Record<string, string>;
  factions?: { A: string; B: string };
  factionMap?: Record<string, string>;
  category?: string;
  item?: string;
  question?: string;
  impostorQuestion?: string;
  questionRevealed?: boolean;
  answers?: PlayerAnswer[];
  answersRevealed?: boolean;
  crewQuestionRevealed?: boolean;
  votes?: PlayerVote[];
  votingStarted?: boolean;
  votesRevealed?: boolean;
  gameConfig?: GameConfig;
  impostorIds?: string[];
  hint?: string;
};

export type Room = {
  code: string;
  hostId: string;
  status: string;
  gameMode: string | null;
  currentCategory: string | null;
  currentWord: string | null;
  impostorId: string | null;
  gameData: GameData | null;
  players: Player[];
  createdAt: string;
};
