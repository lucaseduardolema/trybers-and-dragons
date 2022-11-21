import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import getRandomInt from '../utils';
import Battle from './Battle';

export default class PVE extends Battle {
  private _player: Character | Fighter;
  private _environment: Monster[] | Fighter[] | SimpleFighter[];

  constructor(
    player: Character | Fighter,
    environment: Monster[] | Fighter[] | SimpleFighter[],
  ) {
    super(player);
    this._player = player;
    this._environment = environment;
  }

  private fightResult(): number {
    if (this._environment.every((m) => m.lifePoints <= 0)) {
      console.log(`
      player ganhou, ${this.player.lifePoints} life points restantes,
      ${this._environment.length} inimigos derrotados`);
      return 1;
    }
    console.log(`
    o player perdeu, 
    ${this._environment.filter((e) => e.lifePoints > 0).length}inimigos vivos`);
    return -1;
  }

  public fight(): number {
    while (
      this._player.lifePoints > 0
      && this._environment.every((m) => m.lifePoints > 0)
    ) {
      this._environment.forEach((monster) => {
        const rollDice = getRandomInt(1, 12);
        if (rollDice % 2 === 1) {
          this._player.attack(monster);
          monster.attack(this._player);
        }
        monster.attack(this._player);
        this._player.attack(monster);
      });
    }

    return this.fightResult();
  }
}
