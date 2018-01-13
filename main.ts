import { Observable } from "rxjs-es";

let numbers = [1, 5, 10];
let source = Observable.create(observer => {
        let index = 0;
        let produceValue = () => {
            observer.next(numbers[index++]);

            if (index < numbers.length) {
                setTimeout((produceValue, 250))
            } else {
                observer.complete();
            }
        }
        produceValue();
    });

source.subscribe(
    value => console.log(`moja wartosc to: ${value}`),
    e=> console.log(`error: ${e}`),
    ()=>console.log(`skonczy sie stream`)
)