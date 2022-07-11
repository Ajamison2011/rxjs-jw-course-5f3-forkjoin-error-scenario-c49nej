import { forkJoin, Observable } from 'rxjs';

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000);
  return () => {
    console.log('a Teardown');
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure');
    subscriber.complete();
  }, 3000);
  return () => {
    console.log('b Teardown');
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error: ', err),
});
