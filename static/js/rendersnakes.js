//venomous snakes
console.log('Loaded rendersnakes');
var venomousContainer = document.getElementById('venom-snakes')
var nonVenomousContainer = document.getElementById('non-venom-snakes')
var venomousSnakes = snakesJSON.venomous;
var nonVenomousSnakes = snakesJSON.nonVenomous;
var card ;





function renderVenomousSnakes(){
    for( snake of venomousSnakes){
        var li = document.createElement('li');
        li.classList.add('snake-item');
        card = `<!-- Card Starts  -->
        <div class="card snake-card" style="width: 18rem;">
        <img src="${snake.url}" class="card-img-top"
            alt="">
        <div class="card-body">
            <h5 class="card-title">${snake.name}</h5>
            <p class="card-text"> ${snake.malayalam} </p>
            <div class="btns">
            <div class="btn-danger btn">Highly Venomous</div>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a>-->
            </div>
        </div>
        </div>
<!-- Card Ends -->`
li.innerHTML=card;
venomousContainer.appendChild(li);
    }

}

function renderNonVenomousSnakes(){
    for( snake of nonVenomousSnakes){
        var li = document.createElement('li');
        card = `<!-- Card Starts  -->
        <div class="card snake-card" style="width: 18rem;">
        <img src="${snake.url}" class="card-img-top"
            alt="">
        <div class="card-body">
            <h5 class="card-title">${snake.name}</h5>
            <p class="card-text"> ${snake.malayalam} </p>
            <div class="btns">
            <div class="btn-success btn">Non Venomous</div>
           <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
        </div>
        </div>
<!-- Card Ends -->`
li.innerHTML=card;
nonVenomousContainer.appendChild(li);
    }

}


renderVenomousSnakes();
renderNonVenomousSnakes();