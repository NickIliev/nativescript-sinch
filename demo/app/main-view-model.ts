import { Observable } from 'tns-core-modules/data/observable';
import { SinchNew } from 'nativescript-sinch-new';

export class HelloWorldModel extends Observable {
  public message: string;
  private sinchNew: SinchNew;

  constructor() {
    super();

    this.sinchNew = new SinchNew();
    console.log("=============== this.sinchNew: ==============");
    console.log(this.sinchNew);
  }
}
