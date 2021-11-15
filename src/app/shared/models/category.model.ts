export const DEFAULT_CATEGORIES: ListedCategories[] = [
  { id: '-MoUDVe-Of9y8agLKgWo', slot: 'row11' },
  { id: '-MoUDsZY9__Je62thqgR', slot: 'row12' },
  { id: '-MoUEBivK5-2TTuI-tHc', slot: 'row13' },
  { id: '-MoUESiKwOiovavVHADi', slot: 'row14' },
];

export interface ListedCategories {
  id: string;
  slot:
    | 'row11'
    | 'row12'
    | 'row13'
    | 'row14'
    | 'row21'
    | 'row24'
    | 'row31'
    | 'row34'
    | 'row41'
    | 'row42'
    | 'row43'
    | 'row44';
}

export class Category {
  constructor(
    public id: string,
    public name: string,
    public spent: number,
    public iconName: string,
    public slot?: string
  ) {}
}
