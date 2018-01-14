import {Observable} from "rxjs";


const  button = document.querySelector('button');
const output = document.querySelector('#output');


let click = Observable.fromEvent(button, 'click');

function load(url: string){

    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            }else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).map((a) => a.sort((a,b)=> a.pages > b.pages));

}

function renderBooks(books){
    books.forEach(b => {
        let node = document.createElement('div');
        node.innerText = `${b.title} ma stron ${b.pages}`;
        output.appendChild(node);
    });
}

click.flatMap(e => load("/books-api.json"))
    .subscribe(
        renderBooks,
        (e) => console.log(`error: ${e}`),
        () => console.log('done')
    );

// import {Observable} from "rxjs/Observable";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/filter";

let numbers = [1, 5, 5, 6, 7, 8,9, 10];
let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if(index < numbers.length) {
            setTimeout(produceValue, 1250);
        }
        else {
            observer.complete();
        }
    }

    produceValue();

}).map(n => n * 3)
    .map( n => n >= 18 ? `pelnoletni: ${n} lat` : `dzieciak: ${n} lat` );


source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);
