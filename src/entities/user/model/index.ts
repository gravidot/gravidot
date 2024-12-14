export const enum Role {
  Owner = "owner",
  Editor = "editor",
  Viewer = "viewer",
}

export interface GravidotActiveUser {
  uid?: string;
  name: string;
  is_anonymous: boolean;
  role: Role;
  board_identifiers: Record<string, string>[];
  fingers_no: number | null;
  x?: number;
  y?: number;
  color?: string;
}
