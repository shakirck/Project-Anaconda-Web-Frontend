console.log('Loaded speciesinfo');
const queryString = window.location.search;
console.log(queryString);
var params = new URLSearchParams(queryString);

var species = params.get('species');

var info = document.getElementById('info');
// var img = document.getElementById('image');
var  currentSpecies={};
var found = false;
if(!found){
    for(snake of venomousSnakes){
        if(snake.name == species){
            currentSpecies = snake;
            currentSpecies["venomous"]="YES";
            found =true;
            continue;
        }
    }

    if(!found){
        for(snake of nonVenomousSnakes){
            if(snake.name == species){
                currentSpecies = snake;
                found =true;
                currentSpecies["venomous"]="NO";
                continue;
            }
        }
    }
    
}
var ul =document.createElement('ul');

 
var child = `
        <li>
        <div class="snake-info-list">
        <div class="left">Image</div>
        <div class="right">
        <div id="image">
        <img src="${currentSpecies.url}" alt="">
        </div>
        </div>
        </div>
        </li>
        <li>
            <div class="snake-info-list">
            <div class="left">Name</div>
            <div class="right">${currentSpecies.name}</div>
            </div>
        </li>

        <li>
            <div class="snake-info-list">
            <div class="left">Venomous</div>
            <div class="right">${currentSpecies.venomous}</div>
            </div>
        </li>

        <li>
            <div class="snake-info-list">
            <div class="left">Description</div>
            <div class="right">${currentSpecies.description}</div>
            </div>
        </li>

        <li>
            <div class="snake-info-list">
            <div class="left">Distribution</div>
            <div class="right">${currentSpecies.distribution}</div>
            </div>
        </li>

        <li>
            <div class="snake-info-list">
            <div class="left">States</div>
            <div class="right">${currentSpecies.states}</div>
            </div>
        </li>
    `
    ul.innerHTML=child
    info.appendChild(ul);