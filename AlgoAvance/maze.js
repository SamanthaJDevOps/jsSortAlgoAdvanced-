// document.querySelector("#read-button").addEventListener('click', function () {
//     csvFile = document.querySelector("#file-input").files[0];
//     let reader = new FileReader();
//     reader.addEventListener('load', function (e) {
//         // récupération de la liste des villes
//         listVille = getArrayCsv(e.target.result);
//
//         // Calcul de la distance des villes par rapport à Grenoble
//         listVille.forEach(ville => {
//             ville.distanceFromGrenoble = distanceFromGrenoble(ville);
//             //ville.route = distanceRoute(ville);
//         });
//         // Tri
//         const algo = $("#algo-select").val();
//         nbPermutation = 0;
//         nbComparaison = 0;
//         sort(algo);
//
//         // Affichage
//         displayListVille()
//     });
//     reader.readAsText(csvFile)
// })

//let maze = [];
let lines = 5;
let maze = new Array(lines);
for (let i = 0; i < lines; i++){
    maze[i] = new Array(lines);
}
let size = lines*lines;
let doable= [0,0,0,0,1,1,0,1,0,1,1,0,1,0,0,0,0,0,1,0,1,1,1,1,0];

function initMaze(){
    for(let i = 0; i < lines; i++) {
        for(let j = 0 ; j< lines; j++){
            maze[i][j]= (Math.random()>=0.5)? 1 : 0;
        }
    }
}

function initMazeWithDoable(){
    let count = 0;
    for(let i = 0; i < lines; i++) {
        for(let j = 0 ; j< lines; j++){
            maze[i][j]= doable[count];
            count++;
        }
    }
}



function displayMaze(tab){

    let mainList = document.getElementById("maze_container");
    let table = document.createElement("table");

    for (let i = 0; i < lines; i++) {

        let tr = document.createElement("tr");

        for(let j= 0; j < lines; j++){
            let td = document.createElement("td");
            if(tab[i][j] === 1){
                td.style.backgroundColor = "black";
            }
            td.innerText = i+","+j;
            td.style.color="red";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    mainList.appendChild(table);
}
initMazeWithDoable();
displayMaze(maze);

let visited =[];
let lastFork = [];
let chemin = [];

function resolve(i,j){

    visited.push([i,j]);
    chemin.push([i,j]);
    if(i===4 && j===4){
        console.log("  ---  WINNER  --- ");
    }else{
        let n = neighbours(i,j);
        if(n.length > 0){
            if(n.length===1 && verif(n[0][0],n[0][1])){
                console.log("dead end coor i :"+i+", j : "+j );
                console.log("lastfork : "+lastFork);
                cutOutDeadEnd(i,j,lastFork);
            }else if(n.length>1){
                //lastFork = [];
                lastFork.push([i,j]);
            }
            for(let x = 0; x < n.length; x++){
                //console.log(visited);
                if(!verif(n[x][0],n[x][1])){
                    resolve(n[x][0],n[x][1]);
                }
            }
        }
    }
}

function verif(i,j){
    for(let x=0; x < visited.length; x++){
        if(visited[x][0]===i && visited[x][1]===j){
            return true;
        }
    }
    return false;
}

function neighbours(i,j){
    let neighbours = [];

        //top
        if(i>0 && maze[i-1][j]===0){
            neighbours.push([i-1,j]);
        }
        //bottom
        if(i<(lines-1) && maze[i+1][j]===0){
            neighbours.push([i+1,j]);
        }
        //left
        if(j>0 && maze[i][j-1]===0){
            neighbours.push([i,j-1]);
        }
        //right
        if(j<(lines-1) && maze[i][j+1]===0){
            neighbours.push([i,j+1]);
        }

    return neighbours;
}

function cutOutDeadEnd(i,j, lastFork){
    //how many element from lastFork to CurrentDeadEnd
    let count =0;
    let trueCount = false;
    for(let x=0; x<chemin.length; x++){
        if(chemin[x][0]=== lastFork[0] && chemin[x][1]===lastFork[1]){
            trueCount = true;
            count++;
        }
        if(trueCount){
            count++;
        }
        if(chemin[x][0]=== i && chemin[x][1]===j){
            trueCount = false;
            count++;
        }
    }
    console.log(count);
}


resolve(0,0);