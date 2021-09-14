<template>
  <div id="app">
    <button class="btn btn-primary" @click="btn">1</button>
    <button class="btn btn-primary" @click="btn2">2</button>
    <button class="btn btn-primary" @click="btn3">3</button>
       <button class="btn btn-primary" @click="zapros2">4</button>
        <button class="btn btn-primary" @click="zapros1">5</button>
         <button class="btn btn-primary" @click="btn6">6</button>

    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6" v-for="(item, index) in groupsContent" :key="index">
          <div class="card border-dark mb-3">
            <div class="card-header">{{ item[0].group }}</div>
            <div class="text-dark">
              <div class="row">
                <div class="col-6 p-0 m-0" v-for="(user, id) in item" :key="id">
                  <div
                    class="row hfull"
                    style="display: flex; flex-wrap: nowrap; flex-shrink: 2"
                    
                  >
                    <div
                      class=""
                      style="
                        background-color: #ffefd5;
                        flex: 1;
                        font-size: 8pt;
                        border: 1px solid grey;
                        margin: -1px;
                        cursor: pointer;
                      "
                      v-bind:data-id="id"
                      v-bind:data-index="index"
                      @click="btn4"
                    >
                      {{ user.name }} ({{ user.count }})
                    </div>
                    <div
                      v-bind:class="user.priceDiff"
                      style=" width: 50px"
                    >
                      <h6>{{ user.price }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="row"
        v-show="cart[0]"
        style="
          background-color: #ffdca3;
          font-size: 12pt;
          padding-bottom: 20px;
          font-weight: bold;
          border-bottom: 1px solid;
        "
      >
        <div class="col-6">Наименование товара и описание</div>
        <div class="col-2">Кол-во</div>
        <div class="col-2">Цена</div>
        <div class="col-2"></div>
      </div>
      <div class="row" style="background-color: #ffdca3" v-for="item in cart" :key="item.name">
        <div class="col-6">
          {{ item.name }}
        </div>
        <div class="col-2">
          {{ item.count }}
        </div>
        <div class="col-2">{{ item.price }}/ шт</div>
        <div class="col-2">
          <button v-bind:data-name="item.name" @click="btn5">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
//import json from "./data.json";
//import names from "./names.json";
import axios from "axios";


export default {
  data() {
    return {
      dataJson: "",
      dataJson2: "",
      namesJson: "",
      namesJson2: "",
      ID: 9,
      data1: [], // все товары неортированные
      groups: [],
      groupsContent: [], //Разделленые на группы товары
      cart: [],
      bodyNames: "",
      bodyData: "",
    };
  },
  created: function () {

    setInterval(() => {
      this.zapros1();
      this.zapros2();
      this.btn();
      this.btn2();
      this.btn3();
    }, 15000);
  },
  mounted: async function () {
    console.log("mounted()");
      this.zapros1();
      this.zapros2();

    setTimeout(() => {
    this.btn6();
    this.btn();
    this.btn2();
    this.btn3();
    console.log("mounted set");
        }, 2000)


  },
  methods: {
/*       zapros() {
        fetch('http://localhost:3000/data', { mode: 'no-cors',})
        .then(response =>  response.json())
        .then(commits => console.log(commits))
    },
 */
        zapros2() {
      axios
        .get("http://localhost:3000/data")
        .then((response) => {
          this.dataJson = response.data;
          //lert("данные получены");
        });
    },

            zapros1() {
      axios
        .get("http://localhost:3000/names")
        .then((response) => {
          this.namesJson = response.data;
          //alert("данные получены");
        });
    },

    btn() {
      //console.log(this.dataJson.Value.Goods[1]);
      //console.log(this.dataJson.Value.Goods[1].G);

      console.log(this.dataJson.Value.Goods);
      /*       var CountGood = this.dataJson.Value.Goods[this.ID].P;
      var Price = this.dataJson.Value.Goods[this.ID].C;
      var IDgroup = this.dataJson.Value.Goods[this.ID].G;
      var IDGood = this.dataJson.Value.Goods[this.ID].T;
      var NameGroup = this.namesJson[IDgroup].G;
      var Name = this.namesJson[IDgroup].B[IDGood].N;
      console.log("Группа: " + this.namesJson[IDgroup].G);
      console.log("Имя товара: " + this.namesJson[IDgroup].B[IDGood].N);
      console.log("Цена: " + Price);
      console.log("Кол-во товара: " + CountGood);  */
      
      var DlinaMass = this.dataJson.Value.Goods.length;
      this.data1 = new Array(DlinaMass);
      for (let i = 0; i < DlinaMass; i++) {
        var CountGood = this.dataJson.Value.Goods[i].P;
        var Price = this.dataJson.Value.Goods[i].C;
        var Price2 = this.dataJson2.Value.Goods[i].C;
        var IDgroup = this.dataJson.Value.Goods[i].G;
        var IDGood = this.dataJson.Value.Goods[i].T;
        var NameGroup = this.namesJson[IDgroup].G;
        var Name = this.namesJson[IDgroup].B[IDGood].N;
        console.log(Name);
        var PriceDiff;
        if(Price > Price2) {
          PriceDiff = "up"; 
          //alert("up");
        } else if (Price < Price2) {
          PriceDiff = "down"; 
          //alert("down");
        } else {
          PriceDiff = "block2";
        }

        console.log("PriceDiff" + PriceDiff);
        //arr[i] = i;
        this.data1[i] = {
          group: NameGroup,
          name: Name,
          price: Price,
          count: CountGood,
          priceDiff: PriceDiff
        };
      }
      //console.log(this.data1);
      this.dataJson2 = this.dataJson;
      this.namesJson2 = this.namesJson; 

    },
    btn2() {
      console.log(this.data1);

      function unique(arr) {
        // ПОЛУЧЕНИЕ УНИКАЛЬНЫХ ЗНАЧЕНИЙ МАССИВА
        let result = [];

        for (let str of arr) {
          if (!result.includes(str.group)) {
            result.push(str.group);
            console.log(str.group);
          }
        }

        return result;
      }

      this.groups = unique(this.data1);
    },
    btn3() {
      console.log(this.groups.length);
      this.groupsContent = new Array(this.groups.length);
      for (let i = 0; i < this.groups.length; i++) {
        var gr = this.groups[i];
        this.groupsContent[i] = this.data1.filter(function (item) {
          return item.group === gr;
        });
      }

      console.log(this.groupsContent[1]);
    },
    btn4(event) {
      var id = event.target.dataset.id;

      var index = event.target.dataset.index;
      var name = this.groupsContent[index][id].name;
      console.log(this.groupsContent[index][id].name);
      var indexCart = this.cart.findIndex((item) => {
        return item.name == name;
        //console.log(item.name == name);
      });
      console.log(indexCart);
      if (indexCart == -1) {
        this.cart.push({
          name: this.groupsContent[index][id].name,
          price: this.groupsContent[index][id].price,
          count: 1,
        });
      } else {
        this.cart[indexCart].count += 1;
      }
      console.log(this.cart);
    },
    btn5(event) {
      var name = event.target.dataset.name;
      console.log(name);
      //console.log(this.groupsContent[index][id].name);
      var indexCart = this.cart.findIndex((item) => {
        return item.name == name;
        //console.log(item.name == name);
      });

      //  let indexCart = state.cart.findIndex((item) => item.value == res.value);
      //console.log(state.cart[indexDel].count);
      this.cart[indexCart].count -= 1;
      if (this.cart[indexCart].count == 0) {
        this.cart.splice(indexCart, 1);
      }
    },
    btn6() {
      this.dataJson2 = this.dataJson;
      this.namesJson2 = this.namesJson; 
    }
  },
};
</script>

<style>
.card2 {
  width: 100%;
  background-color: bisque;
  height: 100px;
  border: 1px solid;
  border-radius: 5px;
  margin: 5px;
}
.header2 {
  width: 100%;
  background-color: gray;
  height: 30px;
}
.row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.block2 {
  
  background-color: #ffdca3;
  margin: -1px;
  border: 1px solid grey;

  display: flex;
  align-items: center;
  justify-content: center;
}
.hfull {
  height: 100%;
}
.up {
  background-color:green;
   margin: -1px;
  border: 1px solid grey;

  display: flex;
  align-items: center;
  justify-content: center;
}
.down {
  background-color:red;
  margin: -1px;
  border: 1px solid grey;

  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
