import { create } from 'zustand';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, WS_BASE_URL } from './constants';
import type { Player, GameData, GameConfig, GameModeType, PlayerVote, PlayerAnswer, Room } from '@shared/schema';

export type { Player, GameData, GameConfig, GameModeType, PlayerVote, PlayerAnswer, Room };

export type GameStatus = 'home' | 'lobby' | 'modeSelect' | 'gameConfig' | 'submodeSelect' | 'spinning' | 'playing';

export type LobbyChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: number;
};

export type GameMode = {
  id: string;
  title: string;
  desc: string;
  impostorGoal: string;
};

export type NotificationType = 'player-left' | 'player-joined' | 'player-reconnected' | 'host-changed' | 'disconnected' | 'player-kicked' | 'player-removed';

export type GameState = {
  user: Player | null;
  room: Room | null;
  status: GameStatus;
  isLoading: boolean;
  ws: WebSocket | null;
  gameModes: GameMode[];
  selectedMode: GameModeType | null;
  selectedThemeCode: string | null;
  submodeSelect: boolean;
  gameConfig: GameConfig | null;
  notifications: Array<{ id: string; type: NotificationType; message: string }>;
  enteredDuringGame: boolean;
  isDisconnected: boolean;
  savedNickname: string | null;
  speakingOrder: string[] | null;
  speakingOrderPlayerMap: Record<string, string> | null;
  showSpeakingOrderWheel: boolean;
  lobbyChatMessages: LobbyChatMessage[];

  setUser: (name: string) => void;
  saveNickname: (name: string) => Promise<void>;
  clearSavedNickname: () => Promise<void>;
  loadSavedNickname: () => Promise<string | null>;
  createRoom: () => Promise<void>;
  joinRoom: (code: string) => Promise<boolean>;
  selectMode: (mode: GameModeType) => void;
  startGame: (themeCode?: string) => Promise<void>;
  startGameWithConfig: (config: GameConfig, themeCode?: string) => Promise<void>;
  returnToLobby: () => Promise<void>;
  leaveCurrentGame: () => Promise<void>;
  leaveGame: () => void;
  goToModeSelect: () => void;
  goToGameConfig: () => void;
  backToModeSelect: () => void;
  backToLobby: () => void;
  connectWebSocket: (code: string) => void;
  updateRoom: (room: Room) => void;
  fetchGameModes: () => Promise<void>;
  revealQuestion: () => Promise<void>;
  setSpeakingOrder: (order: string[]) => void;
  setShowSpeakingOrderWheel: (show: boolean) => void;
  triggerSpeakingOrderWheel: () => void;
  addNotification: (notification: { type: NotificationType; message: string }) => void;
  removeNotification: (id: string) => void;
  setDisconnected: (disconnected: boolean) => void;
  kickPlayer: (targetPlayerId: string) => void;
  setSelectedThemeCode: (code: string | null) => void;
  sendLobbyChat: (message: string) => void;
  addLobbyChatMessage: (msg: LobbyChatMessage) => void;
  clearLobbyChat: () => void;
};

function generateUID(): string {
  return 'user-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  room: null,
  status: 'home',
  isLoading: false,
  ws: null,
  gameModes: [],
  selectedMode: null,
  selectedThemeCode: null,
  submodeSelect: false,
  gameConfig: null,
  notifications: [],
  enteredDuringGame: false,
  isDisconnected: false,
  savedNickname: null,
  speakingOrder: null,
  speakingOrderPlayerMap: null,
  showSpeakingOrderWheel: false,
  lobbyChatMessages: [],

  setUser: (name: string) => {
    const uid = generateUID();
    set({ user: { uid, name } });
  },

  saveNickname: async (name: string) => {
    if (name.trim()) {
      await AsyncStorage.setItem('tikjogos_saved_nickname', name);
      set({ savedNickname: name });
    }
  },

  clearSavedNickname: async () => {
    await AsyncStorage.removeItem('tikjogos_saved_nickname');
    set({ savedNickname: null });
  },

  loadSavedNickname: async () => {
    const saved = await AsyncStorage.getItem('tikjogos_saved_nickname');
    if (saved) {
      set({ savedNickname: saved });
      return saved;
    }
    return null;
  },

  fetchGameModes: async () => {
    try {
      const response = await fetch(apiUrl('/api/game-modes'));
      if (response.ok) {
        const modes = await response.json();
        set({ gameModes: modes });
      }
    } catch (error) {
      console.error('Error fetching game modes:', error);
    }
  },

  selectMode: (mode: GameModeType) => {
    set({ selectedMode: mode });
    if (mode === 'palavraSecreta') {
      set({ status: 'submodeSelect' });
    }
  },

  goToModeSelect: () => {
    set({ status: 'modeSelect' });
    get().fetchGameModes();
  },

  goToGameConfig: () => {
    const { user, room, ws } = get();
    set({ status: 'gameConfig' });
    if (room && user && room.hostId === user.uid && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'host-game-config',
        roomCode: room.code,
      }));
    }
  },

  backToModeSelect: () => {
    const { user, room, ws } = get();
    set({ status: 'modeSelect' });
    if (room && user && room.hostId === user.uid && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'host-back-to-mode-select',
        roomCode: room.code,
      }));
    }
  },

  backToLobby: () => {
    const { user, room, ws } = get();
    set({ status: 'lobby', selectedMode: null, selectedThemeCode: null, submodeSelect: false, gameConfig: null, lobbyChatMessages: [] });
    if (room && user && room.hostId === user.uid && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'host-back-to-lobby',
        roomCode: room.code,
      }));
    }
  },

  connectWebSocket: (code: string) => {
    const existingWs = get().ws;
    if (existingWs) {
      // Prevent onclose from triggering reconnect for the old socket
      existingWs.onclose = null;
      existingWs.onerror = null;
      existingWs.onmessage = null;
      if (existingWs.readyState === WebSocket.OPEN || existingWs.readyState === WebSocket.CONNECTING) {
        existingWs.close();
      }
    }

    const user = get().user;
    const newWs = new WebSocket(`${WS_BASE_URL}/game-ws`);

    let reconnectAttempts = 0;
    const maxReconnectAttempts = 10;
    // Track whether this is the very first WS connection for this room session
    // (i.e. right after HTTP create/join, not a network reconnect)
    const isFirstConnect = !get().isDisconnected;

    const getReconnectDelay = (attempt: number): number => {
      const delays = [1500, 3000, 5000, 8000, 13000, 21000, 30000, 30000, 30000, 30000];
      return delays[Math.min(attempt, delays.length - 1)];
    };

    const sendSyncRequest = () => {
      if (newWs.readyState === WebSocket.OPEN) {
        newWs.send(JSON.stringify({ type: 'sync_request' }));
      }
    };

    const attemptReconnect = () => {
      if (reconnectAttempts >= maxReconnectAttempts) {
        get().setDisconnected(true);
        get().addNotification({
          type: 'disconnected',
          message: 'Conexão perdida. Reabra o app para reconectar.',
        });
        return;
      }
      const currentRoom = get().room;
      if (!currentRoom) return;
      reconnectAttempts++;
      const delay = getReconnectDelay(reconnectAttempts - 1);
      setTimeout(() => {
        get().connectWebSocket(currentRoom.code);
      }, delay);
    };

    // Re-sync when app comes back to foreground
    const appStateSubscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active' && newWs.readyState === WebSocket.OPEN) {
        sendSyncRequest();
      }
    });

    let hasReceivedFirstUpdate = false;
    let initialConnect = true;
    newWs.onopen = () => {
      reconnectAttempts = 0;
      get().setDisconnected(false);
      newWs.send(JSON.stringify({ type: 'join-room', roomCode: code, playerId: user?.uid }));
      // Only sync on reconnect, not initial connect (join-room already returns state)
      if (!initialConnect) {
        sendSyncRequest();
      }
      initialConnect = false;
    };

    newWs.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string);

        if (data.type === 'ping') {
          newWs.send(JSON.stringify({ type: 'pong' }));
          return;
        }

        if (data.type === 'room-update' && data.room) {
          // On first connect after HTTP join/create, the server sends up to 2 room-updates
          // (one direct + one broadcast from markPlayerConnected). Skip the first one
          // since we already have the room from the HTTP response.
          if (isFirstConnect && !hasReceivedFirstUpdate) {
            hasReceivedFirstUpdate = true;
            // Still update the room data but don't trigger status/navigation changes
            const currentRoom = get().room;
            if (currentRoom && currentRoom.code === data.room.code) {
              set({ room: data.room });
            } else {
              get().updateRoom(data.room);
            }
          } else {
            get().updateRoom(data.room);
          }
        }
        if (data.type === 'player-left') {
          get().addNotification({ type: 'player-left', message: `${data.playerName} saiu da sala` });
        }
        if (data.type === 'player-disconnected') {
          get().addNotification({ type: 'player-reconnected', message: `${data.playerName} desconectou temporariamente` });
        }
        if (data.type === 'player-reconnected') {
          // Suppress "reconnected" notification for our own user on first connect
          // (server treats HTTP join + WS join-room as a reconnect)
          const isOwnUser = data.playerId === user?.uid;
          if (isOwnUser && isFirstConnect) {
            // Skip — this is not a real reconnect, just the initial WS handshake
          } else {
            get().addNotification({ type: 'player-reconnected', message: `${data.playerName} reconectou` });
          }
        }
        if (data.type === 'host-changed') {
          get().updateRoom(get().room!);
          get().addNotification({ type: 'host-changed', message: `${data.newHostName} agora é o host da sala` });
        }
        if (data.type === 'player-kicked') {
          get().addNotification({ type: 'player-kicked', message: `${data.playerName} foi expulso da sala` });
        }
        if (data.type === 'player-removed') {
          get().addNotification({ type: 'player-removed', message: `${data.playerName} foi removido da sala` });
        }
        if (data.type === 'kicked') {
          get().addNotification({ type: 'player-kicked', message: data.message || 'Você foi expulso da sala pelo host' });
          set({ room: null, ws: null, status: 'home', selectedMode: null });
        }
        if (data.type === 'start-speaking-order-wheel') {
          if (data.speakingOrder) set({ speakingOrder: data.speakingOrder });
          if (data.playerMap) set({ speakingOrderPlayerMap: data.playerMap });
          get().setShowSpeakingOrderWheel(true);
        }
        if (data.type === 'lobby-chat-message') {
          get().addLobbyChatMessage({
            id: `chat-${data.timestamp}-${data.senderId}`,
            senderId: data.senderId,
            senderName: data.senderName,
            message: data.message,
            timestamp: data.timestamp,
          });
        }
        if (data.type === 'host-game-config') {
          set({ status: 'gameConfig' });
        }
        if (data.type === 'host-back-to-mode-select') {
          set({ status: 'modeSelect' });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    newWs.onerror = (err) => {
      console.warn('[WS] error:', err);
      // Don't close here — let onclose handle reconnect logic
    };

    newWs.onclose = (event) => {
      appStateSubscription.remove();
      const currentRoom = get().room;
      const currentWs = get().ws;
      // Only reconnect if this is still the active WebSocket and we're in a room
      if (currentRoom && currentWs === newWs && event.code !== 1000) {
        get().setDisconnected(true);
        attemptReconnect();
      }
    };

    set({ ws: newWs });
  },

  updateRoom: (room: Room) => {
    const currentUser = get().user;
    const currentRoom = get().room;
    if (!currentUser) return;

    const hostExists = room.players.some((p) => p.uid === room.hostId);
    let validatedRoom = room;
    if (!hostExists && room.players.length > 0) {
      validatedRoom = { ...room, hostId: room.players[0].uid };
    }

    const currentPlayer = validatedRoom.players.find((p) => p.uid === currentUser.uid);
    const isWaitingForGame = currentPlayer?.waitingForGame === true;

    let newStatus: GameStatus = 'lobby';
    let enteredDuringGame = false;
    let selectedMode = get().selectedMode;

    if (isWaitingForGame && validatedRoom.status === 'playing') {
      newStatus = 'lobby';
    } else if (validatedRoom.status === 'playing' && (!currentRoom || currentRoom.code !== validatedRoom.code)) {
      enteredDuringGame = true;
      newStatus = 'lobby';
    } else if (validatedRoom.status === 'playing') {
      newStatus = 'playing';
    }

    // Skip update if status and room data haven't meaningfully changed
    const currentStatus = get().status;
    if (
      currentRoom &&
      currentRoom.code === validatedRoom.code &&
      currentStatus === newStatus &&
      currentRoom.players.length === validatedRoom.players.length &&
      currentRoom.status === validatedRoom.status &&
      JSON.stringify(currentRoom.gameData) === JSON.stringify(validatedRoom.gameData)
    ) {
      // Only update the room reference without triggering status change
      set({ room: validatedRoom });
      return;
    }

    if (validatedRoom.status === 'waiting') {
      selectedMode = null;
      set({
        room: validatedRoom,
        status: newStatus,
        enteredDuringGame,
        selectedMode,
        speakingOrder: null,
        speakingOrderPlayerMap: null,
        showSpeakingOrderWheel: false,
      });
      return;
    }

    set({ room: validatedRoom, status: newStatus, enteredDuringGame, selectedMode });
  },

  createRoom: async () => {
    const { user } = get();
    if (!user) return;
    set({ isLoading: true });

    try {
      const response = await fetch(apiUrl('/api/rooms/create'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostId: user.uid, hostName: user.name }),
      });
      if (!response.ok) throw new Error('Failed to create room');
      const room: Room = await response.json();
      set({ room, status: 'lobby', isLoading: false });
      get().connectWebSocket(room.code);
    } catch (error) {
      console.error('Error creating room:', error);
      set({ isLoading: false });
    }
  },

  joinRoom: async (code: string) => {
    const { user } = get();
    if (!user) return false;
    set({ isLoading: true });

    try {
      const response = await fetch(apiUrl('/api/rooms/join'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase(), playerId: user.uid, playerName: user.name }),
      });
      if (!response.ok) {
        set({ isLoading: false });
        return false;
      }
      const room: Room = await response.json();
      set({ room, status: 'lobby', isLoading: false });
      get().connectWebSocket(room.code);
      return true;
    } catch (error) {
      console.error('Error joining room:', error);
      set({ isLoading: false });
      return false;
    }
  },

  startGame: async (themeCode?: string) => {
    const { room, selectedMode } = get();
    if (!room || !selectedMode) return;

    try {
      const requestBody: any = { gameMode: selectedMode };
      if (selectedMode === 'palavraSecreta') {
        const submode = await AsyncStorage.getItem('selectedSubmode');
        if (submode) requestBody.selectedSubmode = submode;
        if (themeCode?.trim()) requestBody.themeCode = themeCode.trim().toUpperCase();
      }
      if (selectedMode === 'palavraComunidade' && themeCode?.trim()) {
        requestBody.themeCode = themeCode.trim().toUpperCase();
      }

      const response = await fetch(apiUrl(`/api/rooms/${room.code}/start`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error('Failed to start game');
    } catch (error) {
      console.error('Error starting game:', error);
    }
  },

  startGameWithConfig: async (config: GameConfig, themeCode?: string) => {
    const { room, selectedMode } = get();
    if (!room || !selectedMode) return;

    try {
      const requestBody: any = { gameMode: selectedMode, gameConfig: config };
      if (selectedMode === 'palavraSecreta') {
        const submode = await AsyncStorage.getItem('selectedSubmode');
        if (submode) requestBody.selectedSubmode = submode;
        if (themeCode?.trim()) requestBody.themeCode = themeCode.trim().toUpperCase();
      }
      if (selectedMode === 'palavraComunidade' && themeCode?.trim()) {
        requestBody.themeCode = themeCode.trim().toUpperCase();
      }

      const response = await fetch(apiUrl(`/api/rooms/${room.code}/start`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error('Failed to start game');
    } catch (error) {
      console.error('Error starting game:', error);
      throw error;
    }
  },

  returnToLobby: async () => {
    const { room, user } = get();
    if (!room || !user) return;

    if (room.hostId === user.uid) {
      try {
        const response = await fetch(apiUrl(`/api/rooms/${room.code}/reset`), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to reset room');
        const updatedRoom = await response.json();
        set({
          selectedMode: null,
          status: 'lobby',
          room: updatedRoom,
          speakingOrder: null,
          speakingOrderPlayerMap: null,
          showSpeakingOrderWheel: false,
        });
      } catch (error) {
        console.error('Error resetting room:', error);
      }
    } else {
      await get().leaveCurrentGame();
    }
  },

  leaveCurrentGame: async () => {
    const { room, user } = get();
    if (!room || !user) return;

    try {
      const response = await fetch(apiUrl(`/api/rooms/${room.code}/leave-game`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: user.uid }),
      });
      if (!response.ok) throw new Error('Failed to leave game');
      const updatedRoom = await response.json();
      set({
        selectedMode: null,
        status: 'lobby',
        room: updatedRoom,
        speakingOrder: null,
        speakingOrderPlayerMap: null,
        showSpeakingOrderWheel: false,
      });
    } catch (error) {
      console.error('Error leaving game:', error);
    }
  },

  leaveGame: () => {
    const ws = get().ws;
    // Clear state FIRST to prevent onclose from triggering reconnect
    set({ status: 'home', room: null, ws: null, selectedMode: null, selectedThemeCode: null, lobbyChatMessages: [] });
    if (ws) {
      // Disable all handlers to prevent any callbacks after leaving
      ws.onclose = null;
      ws.onerror = null;
      ws.onmessage = null;
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify({ type: 'leave' }));
        } catch (e) {
          // ignore
        }
      }
      ws.close();
    }
  },

  addNotification: (notification) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, ...notification }],
    }));
    const timeout = notification.type === 'disconnected' ? 10000 : 4000;
    setTimeout(() => get().removeNotification(id), timeout);
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  kickPlayer: (targetPlayerId: string) => {
    const { room, ws, user } = get();
    if (!room || !user || !ws || ws.readyState !== WebSocket.OPEN) return;
    if (room.hostId !== user.uid) return;
    if (targetPlayerId === user.uid) return;
    ws.send(JSON.stringify({
      type: 'kick-player',
      roomCode: room.code,
      targetPlayerId,
      requesterId: user.uid,
    }));
  },

  revealQuestion: async () => {
    const { room } = get();
    if (!room) return;
    try {
      const response = await fetch(apiUrl(`/api/rooms/${room.code}/reveal-question`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to reveal question');
    } catch (error) {
      console.error('Error revealing question:', error);
    }
  },

  setSpeakingOrder: (order: string[]) => set({ speakingOrder: order }),
  setShowSpeakingOrderWheel: (show: boolean) => set({ showSpeakingOrderWheel: show }),

  triggerSpeakingOrderWheel: () => {
    const { room, ws, user } = get();
    if (!room || !user || !ws || ws.readyState !== WebSocket.OPEN) return;
    if (room.hostId !== user.uid) return;
    set({ speakingOrder: null, speakingOrderPlayerMap: null });
    ws.send(JSON.stringify({ type: 'trigger-speaking-order', roomCode: room.code }));
  },

  setSelectedThemeCode: (code: string | null) => set({ selectedThemeCode: code }),

  setDisconnected: (disconnected: boolean) => set({ isDisconnected: disconnected }),

  sendLobbyChat: (message: string) => {
    const { room, ws } = get();
    if (!room || !ws || ws.readyState !== WebSocket.OPEN) return;
    if (!message.trim()) return;
    ws.send(JSON.stringify({ type: 'lobby-chat', roomCode: room.code, message: message.trim() }));
  },

  addLobbyChatMessage: (msg: LobbyChatMessage) => {
    set((state) => ({
      lobbyChatMessages: [...state.lobbyChatMessages.slice(-49), msg],
    }));
  },

  clearLobbyChat: () => set({ lobbyChatMessages: [] }),
}));
