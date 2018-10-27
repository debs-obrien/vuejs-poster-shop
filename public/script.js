const PRICE = 9.99;
const LOADNUM = 10;
new Vue({
    el:'#app',
    data: {
        total:0,
        items: [],
        cart:[],
        results:[],
        newSearch: 'anime',
        lastSearch: '',
        loading: false,
        price: PRICE,
    },
    computed: {
      noMoreItems: function () {
          return this.items.length===this.results.length && this.results.length > 0
      }
    },
    methods: {
        appendItems: function(){
            if(this.items.length < this.results.length){
                let append = this.results.slice(this.items.length, this.items.length + LOADNUM);
                this.items = this.items.concat(append);
            }
        },
        onSubmit: function(){
            if(this.newSearch.length){
                this.items=[];
                this.loading=true;
                this.$http
                    .get('/search/'.concat(this.newSearch))
                    .then(function(res){
                        this.lastSearch = this.newSearch;
                        this.results =res.data;
                        this.appendItems();
                        this.loading=false;

                    })
            }

        },
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
    },
    mounted: function(){
        this.onSubmit();
        let vueInstance = this;
        const elem = document.getElementById('product-list-bottom');
        const watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function(){
            vueInstance.appendItems();
        })

    }
});
