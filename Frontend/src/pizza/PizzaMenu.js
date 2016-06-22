/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

var $all = $("#all-pizza-filter");
var $meat = $("#meat-pizza-filter");
var $pine = $("#pineapple-pizza-filter");
var $mush = $("#mushroom-pizza-filter");
var $see = $("#seefood-pizza-filter");
var $vega = $("#no-meat-pizza-filter");



//HTML едемент куди будуть додаватися піци
var $pizza_list = $(".pizza-list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

$all.click(function(){
    
    filterPizza("additional");
    
});

$meat.click(function(){
    filterPizza("meat");
    
    $(".count-title").text("Мясні піци");
    
    
    
});

$pine.click(function(){
        
    filterPizza("pineapple");
     $(".count-title").text("Піци з ананасами");
    
    
    
});

$mush.click(function(){
    
    filterPizza("mushroom");
     $(".count-title").text("Піци з грибами");
    
    
    
});

$see.click(function(){
    
    
     $(".count-title").text("Піци з морепродуктами");
    filterPizza("ocean");
    
    
});

$vega.click(function(){
    
    filterPizza("tomato");
     $(".count-title").text("Вега піци");
    
    
    
});



function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
            if(filter in pizza.content){
                pizza_shown.push(pizza);
            }
            
        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;