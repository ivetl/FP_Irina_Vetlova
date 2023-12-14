
// Create an Observable
let o1 = rxjs.Observable.create((observer) => {
    for (i = 1; i <= 100; i++)
        observer.next(i);

    observer.complete();
});

function isPrime(num) {
    if (num == 2 || num == 3)
      return true;
    if (num <= 1 || num % 2 == 0 || num % 3 == 0)
      return false;  
    for (let i = 5; i * i <= num ; i+=6) {
      if (num % i == 0 || num % (i + 2) == 0)
        return false;
    }
    return true;
}

// Subscribe to the Observable, and print stream to the console
o1.pipe(rxjs.operators.filter(x => isPrime(x))).subscribe(
    (x)     => console.log('prime: ' + x),
    (error) => console.log('error: ' + error),
    ()      => console.log('completed1')
);

let o2 = rxjs.Observable.create((observer) => {
    for (i = 5; i > 0; i--)
        observer.next(i);
    observer.error("OSHIBKA");
    observer.complete();
});

o2.subscribe(
    (x)     => alert('counter is: ' + x),
    (error) => alert('error: ' + error),
    ()      => console.log('completed2')
);

let button1 = document.getElementById("btn1");
let button2 = document.getElementById("btn2");
let button3 = document.getElementById("btn3");
const ob1 = rxjs.fromEvent(button1, "click");
const ob2 = rxjs.fromEvent(button2, "click");
const ob3 = rxjs.fromEvent(button3, "click");

function rand() {
    return Math.floor(Math.random() * 256);
}

function randomizeBackground() {  
    document.body.style.backgroundColor = "rgb(" + rand() + "," + rand() + "," + rand() + ")";
};

const merged = rxjs.merge(ob1, ob2, ob3);
    
merged.subscribe(event => {
    console.log(event.target), randomizeBackground()
});