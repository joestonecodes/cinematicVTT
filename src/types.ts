export type View = 'dashboard' | 'tabletop' | 'library';

export interface Campaign {
  id: string;
  name: string;
  players: number;
  lastActive: string;
  imageUrl: string;
  status: 'live' | 'lobby';
}

export interface MapAsset {
  id: string;
  name: string;
  gridSize: string;
  imageUrl: string;
  quality: string;
}

export interface Token {
  id: string;
  name: string;
  imageUrl: string;
  initiative?: number;
}

export interface GridSettings {
  enabled: boolean;
  type: 'square' | 'hex-v' | 'hex-h';
  cellSize: number;
  opacity: number;
  snap: boolean;
  color: string;
}
