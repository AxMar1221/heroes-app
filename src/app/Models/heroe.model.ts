export class HeroeModel {
  id?:    string;
  name!:  string;
  power!: string;
  live!:  boolean;

  constructor(){
    this.live = true;
  }
}
