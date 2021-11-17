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

export class Category {
  constructor(
    public id: string,
    public name: string,
    public spent: number,
    public iconName: string,
    public color: string
  ) {}
}
