"use strict";


let div = document.createElement('div');
div.classList.add('endOfGame');
let score = document.getElementById('score');
function initGame(){
    div.remove();
    clearInterval(timer);
    field.initField();
    snake.initSnake();
}

const size = 20; 
let table = document.getElementById('snake-field');
let game = document.getElementById('snake-game');
let timer;
let keydownHandler =(event) => snake.changeDirection(event.key);
let field = {
    cells: [[]],
    haveFood: false,
    foodCell: null ,
    score: 0,
    maxScore:0,
    foodColor: 'rgb(197, 51, 51)',
    initField() {
        this.score = 0;
        this.cells = [];
        table.innerHTML = '';
        for(let i = 0;i<size;i++) {   
            let row = document.createElement('tr');
            this.cells[i] = [];
            for(let j = 0; j< size;j++) {
                let cell = document.createElement('td');
                this.cells[i].push(cell); 
                row.append(cell);
            }
            table.append(row);    
        }
        this.foodCell = this.cells[size/2][size/2];
        this.foodCell.style.backgroundColor = this.foodColor; 
    },
    randomCell(){
        let newFoodCell;
        do {
            let x = Math.round(Math.random()*size);
            let y = Math.round(Math.random()*size);
            newFoodCell = this.cells[x][y];
        } while(newFoodCell.classList.contains('food')&&newCell.classList.contains('snake'));
        this.foodCell = newFoodCell;
        // this.foodCell.classList.add('food');
        this.foodCell.style.backgroundColor = this.foodColor;
        return this.foodCell;
    },   
    finishGame(){
        document.removeEventListener('keydown',keydownHandler);
        clearInterval(timer);
        
        game.prepend(div);
        
        div.innerHTML =`<div class = "score"><p>Конец игры...</p><p>Очки: ${field.score}</p><button onclick = "initGame()">Начать сначала?</div>`;
        div.style.width = table.offsetWidth + 'px';
        div.style.height = table.offsetHeight + 'px';
        score.innerHTML = field.maxScore;
        
    },
    
}; 

field.initField();

let snake = {
    body: [],
    head: {
        x:undefined,
        y:undefined
    },  
    direction: undefined,  
    color: 'rgb(88, 98, 184)',

    changeDirection(key) {
        console.log(key);
        switch(key) {
            case 'w':
                if(this.direction =='up' || this.direction=='down')
                    return;
                this.direction = 'up';
                this.move();
                break;
            case 'a':
                if(this.direction =='left' || this.direction=='right')
                    return;
                this.direction = 'left';
                this.move();
                break;
            case 's':
                if(this.direction =='up' || this.direction=='down')
                    return;
                this.direction = 'down';
                this.move();
                break;
            case 'd':
                if(this.direction =='left' || this.direction=='right')
                    return;
                this.direction = 'right';
                this.move();
                break;
        }
        
    },
    move() {
        clearInterval(timer); 
        timer = setInterval(()=>snake.move(),300);
        let nextCell;
        switch(this.direction) {
            case 'up':
                if(!isValidCell(this.head.x-1,this.head.y)){
                    field.finishGame();
                    return;
                }
                nextCell = field.cells[--this.head.x][this.head.y];
                break;
            case 'left':
                if (!isValidCell(this.head.x,this.head.y-1)) {
                    field.finishGame();
                    return;
                }
                nextCell = field.cells[this.head.x][--this.head.y];
                break;
            case 'down':
                if (!isValidCell(this.head.x +1,this.head.y)) {
                    field.finishGame();
                    return;
                }
                nextCell = field.cells[++this.head.x][this.head.y];
                break;
            case 'right':
                if (!isValidCell(this.head.x,this.head.y +1)) {
                    field.finishGame();
                    return;
                }
                nextCell = field.cells[this.head.x][++this.head.y];
                break;
        }
        if(nextCell == field.foodCell){
            this.body.unshift(field.foodCell);
            // field.foodCell.classList.remove('food');
            // field.foodCell.classList.add('snake');
            field.foodCell.style.backgroundColor = snake.color;
            field.randomCell();
            field.score++;
            if(field.score >field.maxScore)
                field.maxScore = field.score;
        }
        this.body.unshift(nextCell);
        // nextCell.classList.add('snake');
        nextCell.style.backgroundColor = this.color;
        // this.body.pop().classList.remove('snake'); 
        this.body.pop().style.backgroundColor = ''

        function isValidCell(x,y){
            if(x>=20||x<0||y>=20||y<0
                || field.cells[x][y].style.backgroundColor == snake.color
                ){
                return false;
            }
            return true;
        }
        

    },
    
    initSnake(){
        let startX = size/2;
        let startY = 0;
        snake.body = [];
        snake.body.push(field.cells[startX][startY]);
        snake.body[0].classList.add('snake');
        snake.head.x = startX;
        snake.head.y = startY; 
        snake.direction = 'right';
        document.addEventListener('keydown',keydownHandler);
        timer = setInterval(()=>snake.move(),300);
    }

};

snake.initSnake()





