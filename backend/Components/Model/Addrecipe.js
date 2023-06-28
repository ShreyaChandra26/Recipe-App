const mongose=require("mongoose");

const recipedata=new mongose.Schema({
    RecipeTitel:String,
    Author:String,
    imgurl:String,
    ingredients:String,
    directions:String,
    price:Number
   
});


const recipe= new mongose.model("recipe",recipedata);
module.exports=recipe;