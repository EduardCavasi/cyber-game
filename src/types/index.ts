export interface GameState {
  currentScene: string;
  inventory: InventoryItem[];
  progress: number;
  discoveredClues: string[];
  passwordAttempts: number;
  gameComplete: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  isClue: boolean;
}

export interface ClickableItem {
  id: string;
  name: string;
  type: 'note' | 'computer' | 'folder' | 'item' | 'door' | 'drawer';
  x: number;
  y: number;
  width: number;
  height: number;
  description?: string;
  requiresPassword?: boolean;
  password?: string;
  leadsTo?: string;
  containsItems?: string[];
  hint?: string;
}

export interface Scene {
  id: string;
  name: string;
  backgroundImage: string;
  description: string;
  clickableItems: ClickableItem[];
}

export interface ComputerScreen {
  id: string;
  type: 'desktop' | 'login' | 'email' | 'files' | 'browser';
  content: any;
  passwordProtected?: boolean;
  password?: string;
} 