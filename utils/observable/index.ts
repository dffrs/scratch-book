interface IObservable<T> {
  subscribe: (observer: (arg: T) => unknown) => void;
  unsubscribe: (observer: (arg: T) => unknown) => void;
  update: (arg: T) => void;
}
abstract class Observable<T> {
  private observerSet: Set<(arg: T) => unknown>;
  constructor() {
    this.observerSet = new Set<(arg: T) => unknown>();
  }
  public subscribe: IObservable<T>["subscribe"] = (observer) => {
    this.observerSet.add(observer);
  };
  protected unsubscribe: IObservable<T>["unsubscribe"] = (observer) => {
    this.observerSet.delete(observer);
  };
  protected update: IObservable<T>["update"] = (arg) => {
    this.observerSet.forEach((ob) => ob(arg));
  };
  public abstract run: (arg?: T) => unknown;
}

class Clock extends Observable<number> {
  private timer: NodeJS.Timeout | null;
  private number: number;
  constructor() {
    super();
    this.timer = null;
    this.number = 0;
  }
  public run: Observable<number>["run"] = (args) => {
    if (this.timer !== null) return;
    this.timer = setInterval(() => {
      this.number++;
      this.update(this.number);
    }, args ?? 500);
  };
  public override unsubscribe: Observable<number>["unsubscribe"] = (
    observer
  ) => {
    if (this.timer === null) return;
    clearInterval(this.timer);
    this.timer = null;
    this.number = 0;
    this.unsubscribe(observer);
  };
}
const clock = new Clock();
export { Observable, clock };
