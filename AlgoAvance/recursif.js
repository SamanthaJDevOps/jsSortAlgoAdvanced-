function factorielle(n){

    if(n===0){
        return 1;
    }else{
        return n*factorielle(n-1);
    }

}

//console.log(factorielle(5));

function fibo(n){
    if(n===0){
        return 0;
    }else if(n===1){
        return 1;
    }else{
        return fibo(n-1)+fibo(n-2);
    }
}
//console.log(fibo(8));

function syracuse(n){
    console.log(n+'-> ');
        if(n === 1){
            console.log(n);
        }else if(n%2===0){
            syracuse(n/2);
        }else{
            syracuse((3*n)+1);
        }
}

//syracuse(15);

function pgcd(a,b){
    if(a===0){
        return b;
    }else if(b===0){
        return a;
    }else{
        return pgcd(b, (a%b));
    }
}

console.log(pgcd(21,72));
console.log(pgcd(4,12));