/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage	=require('../Storage/storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

var pizza_count;
var $sum = $(".order-info2");
var $deleteAll = $(".clear-order");
var $money = 0;


//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".order-main");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var add_new=true;
    for( var a=0;a<Cart.length;a++){
        if((pizza===Cart[a].pizza)&&(size===Cart[a].size)) {
            Cart[a].quantity += 1;
            pizza_count++;
            add_new=false;
        }
    }
    if(add_new===true){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
        pizza_count++;
    }
   $money += pizza[size].price;
    //Оновити вміст кошика на сторінці
    updateCart();
}


function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
  Cart.splice(Cart.indexOf(cart_item), 1);
    pizza_count-=cart_item.quantity;
    
    $money-= cart_item.pizza[cart_item.size].price*cart_item.quantity;

    
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    var saved_pizza = Storage.get('cart');
    
    if(saved_pizza){
        Cart=saved_pizza;
    }


    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        
       $node.find(".delete").click(function(){
            removeFromCart(cart_item);
        });


        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            $money += cart_item.pizza[cart_item.size].price;
            //Оновлюємо відображення
            updateCart();
        });

         $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
             
             if(cart_item.quantity==1){
                removeFromCart(cart_item);
             }else{
                $money -= cart_item.pizza[cart_item.size].price;
                 cart_item.quantity -= 1;
               
                 
             }
            //Оновлюємо відображення
            updateCart();
        });
        
        $cart.append($node);
    }
    
    
    
    Cart.forEach(showOnePizzaInCart);
    
   
    
    $deleteAll.click(function(){
        
       Cart = [];
        $money =0;
        updateCart();
        
        
    });
    $(".order-info2").html($money);
    $(".count-span").html(Cart.length);
     Storage.set("cart",Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;