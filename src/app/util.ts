declare interface Date { truncateToLocalDate(): Date; }

Object.defineProperty(Date.prototype, 'truncateToLocalDate', {
  value: function(this: Date): Date {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
  },
  writable: true,
  configurable: true,
});

declare interface Array<T> {
  sum(this: Array<number>): number;
  max(this: Array<number>): number;
  min(this: Array<number>): number;
}

Object.defineProperties(Array.prototype, {
  sum: {
    value: function(this: Array<number>):
        number { return this.reduce((acc, now) => acc = acc + now, 0); },
    writable: true,
    configurable: true,
  },
  min: {
    value: function(this: Array<number>):
        number { return Math.min.apply(null, this); },
    writable: true,
    configurable: true,
  },
  max: {
    value: function(this: Array<number>):
        number { return Math.max.apply(null, this); },
    writable: true,
    configurable: true,
  },
});


