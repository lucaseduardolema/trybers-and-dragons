import { EnergyType } from '../Energy';

export default abstract class Archetype {
  private _name: string;
  private _special = 0;
  private _cost = 0;

  constructor(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public get special() {
    return this._special;
  }

  public get cost() { 
    return this._cost;
  }

  public abstract get energyType(): EnergyType; 

  public static createdArchetypeInstances(): number {
    throw new Error('Not implemented');
  }
}
