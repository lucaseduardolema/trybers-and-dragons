import Archetype, { Mage, Necromancer, Ranger, Warrior } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Dwarf, Elf, Halfling, Orc } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _name: string;
  private _dexterity: number;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number ;
  private _defence: number;
  private _energy: Energy;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = this.generateRandomRace();
    this._archetype = this.generateRandomArchetype();
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defence = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  private generateRandomRace(): Race {
    const dice = getRandomInt(1, 4);

    switch (dice) {
      case 1:
        return new Dwarf(this._name, this._dexterity);
      case 2:
        return new Halfling(this._name, this._dexterity);
      case 3:
        return new Orc(this._name, this._dexterity);
      default:
        return new Elf(this._name, this._dexterity);
    }
  }

  private generateRandomArchetype(): Archetype {
    const dice = getRandomInt(1, 4);

    switch (dice) {
      case 1:
        return new Necromancer(this._name);
      case 2:
        return new Warrior(this._name);
      case 3:
        return new Ranger(this._name);
      default:
        return new Mage(this._name);
    }
  }

  public get dexterity() {
    return this._dexterity;
  }

  public get race() {
    return this._race;
  }

  public get archetype() {
    return this._archetype;
  }

  public get lifePoints(): number {
    return this._lifePoints;
  }

  public get strength(): number {
    return this._strength;
  }

  public get defense(): number {
    return this._defence;
  }

  public get energy(): Energy {
    return { ...this._energy };
  }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defence;
    
    if (damage > 0) {
      this._lifePoints -= damage;
    } else {
      this._lifePoints -= 1;
    }

    if (this._lifePoints <= 0) this._lifePoints = -1;

    return this._lifePoints;
  }

  public attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  public levelUp(): void {
    const increment = getRandomInt(1, 10);
    this._maxLifePoints += increment;
    this._strength += increment;
    this._dexterity += increment;
    this._defence += increment;
    this._energy.amount = 10;

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;
  }

  public special(enemy: Fighter): void {
    enemy.receiveDamage(this._strength * 1.5);
  }
}
