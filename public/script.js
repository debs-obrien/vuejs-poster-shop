const PRICE = 9.99;
new Vue({
    el:'#app',
    data: {
        total:0,
        items: [
            {id: 1, title: "Item 1"},
            {id: 2, title: "Item 2"},
            {id: 3, title: "Item 3"}

        ],
        cart:[]
    },
    methods: {
        addItem: function(index){
            this.total += 9.99;
            let item = this.items[index];
            let found = false;
            for(let i= 0; i < this.cart.length; i++){
                if(this.cart[i].id === item.id){
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }
            if(!found){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE
                });
            }

        },
        inc: function(item){
            item.qty++;
            this.total += PRICE;
        },
        dec: function(item){
            item.qty--;
            this.total -= PRICE;
            if(item.qty <=0){
                for(let i=0; i<this.cart.length; i++){
                    if(this.cart[i].id === item.id){
                        this.cart.splice(i,1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function(price){
            return '$'.concat(price.toFixed(2))
        }
    }
});