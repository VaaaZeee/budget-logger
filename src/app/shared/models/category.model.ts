export const DEFAULT_LISTED_CATEGORIES: ListedCategories[] = [
  { id: '-MoeKfswIDei7Ne0nj-4', slot: 'item-1' },
  { id: '-MoeKtprg1c9rt_GgWNa', slot: 'item-2' },
  { id: '-MoeL27GY8Vs7zyadfG1', slot: 'item-3' },
  { id: '-MoeLiBhZRtz4okziVbb', slot: 'item-4' },
  { id: '-MoeN-KZFO3G-qNStfqV', slot: 'item-5' },
];

export type GridSlot =
  | 'item-1'
  | 'item-2'
  | 'item-3'
  | 'item-4'
  | 'item-5'
  | 'item-6'
  | 'item-7'
  | 'item-8'
  | 'item-9'
  | 'item-10'
  | 'item-11'
  | 'item-12';

export interface ListedCategories {
  id: string;
  slot: GridSlot;
}

export class Category {
  constructor(
    public id: string,
    public name: string,
    public spent: number,
    public iconName: string,
    public slot?: GridSlot
  ) {}
}
