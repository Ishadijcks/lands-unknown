export class Player {
  id: string = "user/0";
  name: string;

  money: number = 0;

  constructor(name: string) {
    this.name = name;
  }
}
