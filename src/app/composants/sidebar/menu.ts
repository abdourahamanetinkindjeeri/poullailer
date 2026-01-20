export interface Menu {
  id?: string;
  titre: string;
  icon?: string;
  url?: string;
  active?: boolean;
  open?: boolean;          // pour gérer collapse Angular
  sousMenu?: Menu[];       // récursif
}
