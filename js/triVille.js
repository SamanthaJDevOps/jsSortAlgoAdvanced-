//import axios from "axios";

let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
            //ville.route = distanceRoute(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille.filter(v=> v.longitude && v.latitude);
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {
    //Grenoble
    let lon1 = 5.71667;
    let lat1 = 45.166672 ;

    // Ville donnée
    let lon2 = ville.longitude;
    let lat2 = ville.latitude;

    if(parseFloat(lat1) != lat1 || parseFloat(lon1) != lon1 || parseFloat(lat2) != lat2 || parseFloat(lon1) != lon1)
        throw("Error params. Only float value accepted.");

    if(lat1 < 0 || lat1 > 90 || lat2 < 0 || lat2 > 90)
        throw("Error params. The params lat1 and lat2 must be 0< ? <90. Here lat1 = "+lat1+" and lat2 = "+lat2);
    if(lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180)
        throw("Error params. The params lon1 and lon2 must be -180< ? <180. Here lon1 = "+lon1+" and lon2 = "+lon2);

        let a = Math.PI / 180;
        lat1 = lat1 * a;
        lat2 = lat2 * a;
        lon1 = lon1 * a;
        lon2 = lon2 * a;

        let t1 = Math.sin(lat1) * Math.sin(lat2);
        let t2 = Math.cos(lat1) * Math.cos(lat2);
        let t3 = Math.cos(lon1 - lon2);
        let t4 = t2 * t3;
        let t5 = t1 + t4;
        let rad_dist = Math.atan(-t5/Math.sqrt(-t5 * t5 +1)) + 2 * Math.atan(1);

    let laDistance = (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446 * 1000;

    return laDistance;
}

function distanceRoute(/*ville*/){
    //const axios = require('axios');

    //Grenoble
    let lon1 = 5.71667;
    let lat1 = 45.166672 ;

    //test dest
    let lat2 = 45.764043;
    let lon2 = 4.835659;

    //let urlString = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+lat1+'%2C'+lon1+'&destinations='+ville.latitude+'%2C'+ville.longitude+'&key='
    let urlString = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+lat1+'%2C'+lon1+'&destinations='+lat2+'%2C'+lon2+'&key='

    var config = {
        method: 'get',
        url: urlString,
        headers: { }
    };

    axios.post(urlString)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
    let result = true;
    if(listVille[i].distanceFromGrenoble > listVille[j].distanceFromGrenoble){
        result = false;
    }
    return result;
}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {
    let valI = listVille[i];
    //let valJ = listVille[j];

    listVille[i] = listVille[j];
    listVille[j] = valI;

    nbPermutation++;
}

function sort(type) {
    switch (type) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            listVille = mergesort(listVille);
            break;
        case 'heap':
            heapsort();
            //sortHeap();
            break;
        case 'quick':
            quicksort(listVille,0,(listVille.length - 1));
            break;
        case 'debug':
            distanceRoute();
            break;
    }
}

function insertsort() {
    const length = listVille.length;

    for(let i=0; i<length; i++ ){
        while(i != 0 && listVille[i].distanceFromGrenoble<listVille[i-1].distanceFromGrenoble){
            swap( i, i-1);
            i--;
        }
    }
}

function selectionsort() {
    const length = listVille.length;

    for(let i=0; i<length; i++){
        let minimal = i;
        for(let j=i+1; j<length; j++){
            if(listVille[j].distanceFromGrenoble <= listVille[minimal].distanceFromGrenoble){
                minimal = j;
            }
        }
        swap( i, minimal);
    }
}

function bubblesort() {
    const length = listVille.length;
    let changes = true;

    while(changes){
        changes = false;
        for(let i=0; i<length; i++){
            if( i+1<length && listVille[i].distanceFromGrenoble > listVille[i+1].distanceFromGrenoble){
                swap(i, i+1);
                changes = true;
            }
        }
    }
}

function shellsort() {
    //let ecart = 0;
    const length = listVille.length;

    //while(ecart < length){
    //    ecart = ecart*3+1
    //}
    //while(ecart !== 0){
    //    ecart = parseInt(ecart/3);
    //    for(let i=ecart; i<length; i++){
    //        let valeur = listVille[i].distanceFromGrenoble;
    //        let j = i;
    //        while(j > ecart-1 && listVille[j-ecart].distanceFromGrenoble > valeur){
    //            listVille[j] = listVille[j - ecart];
    //            j = j - ecart;
    //        }
    //        listVille[j].distanceFromGrenoble = valeur
    //    }
    //}

    let ecart = Math.floor(length/2);

    while(ecart > 0){
        for(let i=0; i+ecart<length; i++){
            if(listVille[i+ecart].distanceFromGrenoble < listVille[i].distanceFromGrenoble){
                swap( i+ecart,i );
            }
        }
        ecart--;
    }
}

function mergesort(tab){
    if(tab.length <= 1){
        return tab;
    }else{
        let mid = Math.floor(tab.length/2);
        let leftTab = tab.splice(0,mid);
        //console.log("left array : "+leftTab);
        //console.log("right array : "+ tab);
        return merge(mergesort(leftTab),mergesort(tab));
    }
}

function merge(leftTab,rightTab){
    if(leftTab.length === 0){
        return rightTab;
    }else if(rightTab.length === 0){
        return leftTab;
    }else if(leftTab[0].distanceFromGrenoble <= rightTab[0].distanceFromGrenoble ){
        let splitA = leftTab.splice(0,1);
        nbPermutation++;
        return splitA.concat(merge(leftTab,rightTab));
    }else{
        let splitB = rightTab.splice(0,1);
        nbPermutation++;
        return splitB.concat(merge(leftTab,rightTab));
    }
}


function heapsort() {
    let n = listVille.length;
    for(let i = Math.floor(n/2-1); i >= 0; i--) {//make the array a max heap
        heapify(listVille, n, i);
    }
    for (let i = 0; i < n; i++) { //sort by remove the largest and put at the end
        let size = n-i-1; //new size after remove last
        listVille[size] = remove(listVille, size, i); //put the largest at the end
    }
}
//Remove the root from heap and heapify again, Time O(logn), Space O(1)
function remove(a, size,  i) {
    var max = a[0];
    a[0] = a[size]; //put last at front
    heapify(a, size, 0);
    return max;
}
//Max heapify, Time O(logn), space O(1)
function heapify(a, size, i) {
    var top = a[i].distanceFromGrenoble;
    var larger;
    while (i < size/2) { // from top down, swap with larger child
        let left = 2*i + 1;
        let right = 2*i + 2;
        if (right < size && a[right].distanceFromGrenoble > a[left].distanceFromGrenoble)
            larger = right;
        else
            larger = left;
        if (top >= a[larger].distanceFromGrenoble)
            break;
        swap(i,larger);
        i = larger;
    }
    a[i].distanceFromGrenoble = top;
}

//function heapsort() {
//    const length = listVille.length;
//    let longueur = length;
//    let indexMax = length-1;
//
//    // first tam
//    for(let i=0; i<longueur; i++){
//        tamiser( indexMax,i);
//    }
//    console.log(listVille);
//    // sort
//    while(longueur>0){
//        tamiser(indexMax,0);
//        //swap max a la fin du tab
//        swap(0, indexMax);
//        indexMax--;
//        longueur--;
//    }
//}
//
//function tamiser( indexMax, i ){
//    let curIndex = i;
//
//    //while (curIndex <= indexMax){
//        if((curIndex*2+1 < indexMax && listVille[curIndex].distanceFromGrenoble < listVille[curIndex*2+1].distanceFromGrenoble) || (curIndex*2+2 < indexMax && listVille[curIndex].distanceFromGrenoble < listVille[curIndex*2+2].distanceFromGrenoble)){
//            if( curIndex*2+1 < indexMax && listVille[curIndex].distanceFromGrenoble < listVille[curIndex*2+1].distanceFromGrenoble){
//                swap(curIndex, (curIndex*2+1));
//                tamiser(indexMax,curIndex*2+1);
//            }
//            if( curIndex*2+2 < indexMax && listVille[curIndex].distanceFromGrenoble < listVille[curIndex*2+2].distanceFromGrenoble){
//                swap(curIndex, (curIndex*2+2));
//                tamiser(indexMax, curIndex*2+2);
//            }
//        }/*else{
//            curIndex = indexMax+1;
//        }*/
//    //}
//
//}
//
//function sortHeap()
//{
//    let arr = listVille;
//    var N = arr.length;
//
//    // Build heap (rearrange array)
//    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
//        heapify(arr, N, i);
//
//    // One by one extract an element from heap
//    for (var i = N - 1; i > 0; i--) {
//        // Move current root to end
//        var temp = arr[0];
//        arr[0] = arr[i];
//        arr[i] = temp;
//        nbPermutation++;
//        // call max heapify on the reduced heap
//        heapify(arr, i, 0);
//    }
//}
//
//// To heapify a subtree rooted with node i which is
//// an index in arr[]. n is size of heap
//function heapify(arr, N, i)
//{
//    var largest = i; // Initialize largest as root
//    var l = 2 * i + 1; // left = 2*i + 1
//    var r = 2 * i + 2; // right = 2*i + 2
//
//    // If left child is larger than root
//    if (l < N && arr[l].distanceFromGrenoble > arr[largest].distanceFromGrenoble)
//        largest = l;
//
//    // If right child is larger than largest so far
//    if (r < N && arr[r].distanceFromGrenoble > arr[largest].distanceFromGrenoble)
//        largest = r;
//
//    // If largest is not root
//    if (largest != i) {
//        var swap = arr[i];
//        arr[i] = arr[largest];
//        arr[largest] = swap;
//        nbPermutation++;
//        // Recursively heapify the affected sub-tree
//        heapify(arr, N, largest);
//    }
//}

function quicksort(tab, first, last) {
    if(first < last){
        let pivot = partition(tab,first,last);
        quicksort(tab, first, pivot-1);
        quicksort(tab,pivot+1, last);
    }
}

function partition(tab, first, last){
    let pivotVal = tab[last].distanceFromGrenoble;
    let i = (first -1);
    for(let j=first; j <= last-1; j++){
        if(tab[j].distanceFromGrenoble < pivotVal){
            i++;
            swap(i, j);
        }
    }
    swap(i+1, last);
    return (i+1);
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
