
let tab = [3,9,7,1,6,2,8,4];
const length = tab.length;

// swap function
function swap(tab,i,j){
    let valI = tab[i];
    let valJ = tab[j];

    tab[i] = valJ;
    tab[j] = valI;

    return tab;
}

//tri par insertion

function insertion(tab){
    for(let i=0; i<length; i++ ){
        while(i != 0 && tab[i]<tab[i-1]){
            tab = swap(tab, i, i-1);
            i--;
        }
    }
    console.log("tri par insertion");
    console.log(tab);
}



// tri par selection

function selection(tab){
    for(let i=0; i<length; i++){
        let minimal = i;
        for(let j=i+1; j<length; j++){
            if(tab[j] <= tab[minimal]){
                minimal = j;
            }
        }
        swap(tab, i, minimal)
    }

    console.log("tri par selection");
    console.log(tab);
}


console.log(tab)

// tri par bulles

function bulles(tab){
    let changes = true;

    while(changes){
        changes = false;
        for(let i=0; i<length; i++){
            if(tab[i] > tab[i+1]){
                swap(tab, i, i+1);
                changes = true;
            }
        }
    }

    console.log(tab)
}

// tri par shell version moi

function shellMoi(tab){
    let ecart = Math.floor(length/2);

    while(ecart > 0){
        for(let i=0; i+ecart<length; i++){
            if(tab[i+ecart] < tab[i]){
                swap(tab, i+ecart,i );
            }
        }
        ecart--;
    }

    console.log(tab);
}


// tri par shell vrai

function shell(tab){
    let ecart = 0;

    while(ecart < length){
        ecart = ecart*3+1
    }
    while(ecart != 0){
        ecart = parseInt(ecart/3);
        for(let i=ecart; i<length; i++){
            let valeur = tab[i];
            let j = i;
            while(j > ecart-1 && tab[j-ecart] > valeur){
                tab[j] = tab[j - ecart];
                j = j - ecart;
            }
            tab[j] = valeur
        }
    }

    console.log(tab);
}


//tri pas a pas

function triPasAPas(tab){
    organiser(tab)
    for(let i=length-1; i >= 0; i--){
        swap(tab, 1, i);
        redescendre(tab, 1, i);
    }
}

function organiser(tab){
    for(let i=0; i < length; i++){
        remonter(tab,i);
    }
}

function remonter(tab, i){
    let j = parseInt(i/2);
    if(tab[i] < tab[j]){
        swap(tab, i, j);
        remonter(tab, j);
    }
}

function redescendre(tab, el, i){
    let max;
    let formule = 2*i+1;
    if(formule < el){
        if(tab[formule] > tab[2*i]){
            max = formule;
        }else{
            max = 2*i;
        }
        if(tab[max] > tab[i]){
            swap(tab, max, i);
            redescendre(tab,el,max);
        }
    }
}

// tri heapSortMe

function heapSortMe(tab){
    //parent-child combinaisons
    /*
    * 0 parent / child 1 , 2
    * 1 parent / 3 , 4     // 1*2+1 = 3 1*2+2 = 4
    * 2 parent / 5 , 6     // 2*2+1 = 5 2*2+2 = 6
    * 3 parent / 7 , 8
    * 4 parent / 9 , 10
    * */
    let indexMax = length-1;

    while(indexMax>=0){
        // parcourir le tableau à l'envers pour faire remonter des enfants aux parents le chiffre le plus grand
        for(let i = indexMax; i > 0; i--){
            console.log(i);
            parentChildPremutation( tab, i);
        }
        console.log(tab);
        //swap max a la fin du tab
        swap(tab, 0, indexMax);
        indexMax--;
    }

}

function parentChildPremutation( tab, i ){

    //permutation des enfants aux parents si supérieur
    if(tab[i] > tab[(i-1)/2]){
        swap(tab, i, (i-1)/2);
    }else if( i >= 2 && tab[i] > tab[(i-2)/2]){
        swap(tab, i, (i-2)/2);
    }
}

// quick sort

function quickSort(tab, first, last){

    if(first < last){
        let pivot = tab[last];
        pivot = partitionner(tab, first, last, pivot);
        quickSort(tab, first, pivot-1);
        quickSort(tab, pivot+1, last);
    }
}

function partitionner(tab, first, last, pivot){
    swap(tab, pivot, last);
    let j = first;
    for(let i=first; i<last-1; i++ ){
        if(tab[i] <= tab[last]){
            swap(tab, i, j);
            j = j+1;
        }
    }
    swap(tab, last,j);
    return j;
}


//quickSort(tab, 0, length-1);
//console.log(tab);

// qsort

function qsort( tab, first, last) {
    if(first < last){
        let pivot = partition(tab,first,last);
        qsort(tab, first, pivot-1);
        qsort(tab,pivot+1, last);
    }
}

function partition(tab, first, last){
    let pivot = tab[last];
    let i = (first -1);
    for(let j=first; j <= last-1; j++){
        if(tab[j] < pivot){
            i++;
            swap(tab, i, j);
        }
    }
    swap(tab,i+1, last);
    return (i+1);
}

//console.log(tab)


function axios(){
    var axios = require('axios');
//Grenoble
    let lon1 = 5.71667;
    let lat1 = 45.166672 ;
    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=45.166672%2C5.71667&destinations=45.764043%2C4.835659&key=AIzaSyCnX7DC_Oq9WzadhndLamNoJjLWVgpHFJI',
        headers: { }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

//AIzaSyCnX7DC_Oq9WzadhndLamNoJjLWVgpHFJI

//'https://maps.googleapis.com/maps/api/distancematrix/json?origins=45.166672%2C5.71667&destinations=45.764043%2C4.835659&key=AIzaSyCnX7DC_Oq9WzadhndLamNoJjLWVgpHFJI'

}


function mergeSort(tab){
    if(tab.length <= 1){
        return tab;
    }else{
        let mid = Math.floor(tab.length/2);
        let leftTab = tab.splice(0,mid);
        //console.log("left array : "+leftTab);
        //console.log("right array : "+ tab);
        return merge(mergeSort(leftTab),mergeSort(tab));
    }
}

function merge(leftTab,rightTab){
    if(leftTab.length === 0){
        return rightTab;
    }else if(rightTab.length === 0){
        return leftTab;
    }else if(leftTab[0] <= rightTab[0]){
        let splitA = leftTab.splice(0,1);
        return splitA.concat(merge(leftTab,rightTab));
    }else{
        let splitB = rightTab.splice(0,1);
        return splitB.concat(merge(leftTab,rightTab));
    }
}

//console.log(mergeSort(tab));

