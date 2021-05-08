var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFeed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);



  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feederTime = database.ref('feedTime')
  feederTime.on("value",function(data){
    lastFeed = data.val();
  })
    
 textSize(20)
    //write code to display text lastFed time here
if(lastFeed >= 12){
text("Last feed :"+ lastFeed % 12 + "pm",350,30)
}
else if(lastFeed === 0){
  text("Last feed :"+ "12am",350,30)
  }
  else {
    text("Last feed :"+lastFeed + "am",350,30)
  }




  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);


var food1 = foodObj.getFoodStock();
if(food1<= 0){
  foodObj.updateFoodStock(food1*0)
}
else{  foodObj.updateFoodStock(food1-1) }

database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime: hour()
})

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
