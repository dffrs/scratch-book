interface IObservable<T> {
  subscribe: (observer: <V>(arg: T) => V) => void;
  unsubscribe: (observer: <V>(arg: T) => V) => void;
  update: (arg: T) => void;
}
abstract class Observable<T> implements IObservable<T> {
  private observerSet: Set<<V>(arg: T) => V>;
  constructor() {
    this.observerSet = new Set<<V>(arg: T) => V>();
  }
  public subscribe: IObservable<T>["subscribe"] = (observer) => {
    this.observerSet.add(observer);
  };
  public unsubscribe: IObservable<T>["unsubscribe"] = (observer) => {
    this.observerSet.delete(observer);
  };
  public update: IObservable<T>["update"] = (arg) => {
    this.observerSet.forEach((ob) => ob(arg));
  };
  public abstract doItsThing: (arg: T) => unknown;
}

class Clock extends Observable<number> {
  constructor() {
    super();
  }
  public doItsThing: (arg: number) => number = (args) => {
    return args * 2;
  };
}

export { Observable };
