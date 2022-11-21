import Character from '../Character';
import Fighter from '../Fighter';
import getRandomInt from '../utils';
import Battle from './Battle';

export default class PVP extends Battle {
  private _p1: Character | Fighter;
  private _p2: Character | Fighter;

  constructor(p1: Character | Fighter, p2: Character | Fighter) {
    super(p1);
    this._p1 = p1;
    this._p2 = p2;
  }

  private figthResult(): number {
    if (this._p1.lifePoints > this._p2.lifePoints) {
      console.log(`
      player 1 ganhou, ${this._p1.lifePoints} life points restantes,
      player 2 ${this._p2.lifePoints} life points restantes`);
      return 1;
    }
    console.log(`
    player 2 ganhou, ${this._p2.lifePoints} life points restantes,
    player 1 ${this._p1.lifePoints} life points restantes`);
    return -1;
  }

  public fight(): number {
    while (this._p1.lifePoints > 0 && this._p2.lifePoints > 0) {
      const rollDice = getRandomInt(1, 12);
      if (rollDice % 2 === 1) {
        this._p1.attack(this._p2);
        this._p2.attack(this._p1);
      }
      this._p2.attack(this._p1);
      this._p1.attack(this._p2);
    }

    return this.figthResult();
  }
}
