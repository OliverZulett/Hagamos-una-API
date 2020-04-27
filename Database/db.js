var mongo = new Mongo('localhost:27017'); 
mongo.getDB("admin").auth('root', 'root'); 
var db = mongo.getDB('bakeryStoreDB');

db.createUser(
    {
        user: "seller",
        pwd: "seller",
        roles: [ { role: "readWrite", db: "bakeryStoreDB" } ]
    }
);

db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [ 
            {
                "role" : "readWrite",
                "db" : "bakeryStoreDB"
            }, 
            {
                "role" : "dbAdmin",
                "db" : "bakeryStoreDB"
            }, 
            {
                "role" : "userAdmin",
                "db" : "bakeryStoreDB"
            }
        ]
    }
);

db.products.insert([
    { name: "Cupcake Red Velvet", price: 7, ingerdients:["non", "alias", "sequi"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "qui et quia" },
    { name: "Cupcake Tres Leches", price: 8, ingerdients:["dolorem", "possimus", "qui"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "fugit quis accusamus" },
    { name: "Cupcake Cholate", price: 5, ingerdients:["et", "quae", "quis"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "sint aut cupiditate" },
    { name: "Cupcake Vainilla", price: 5, ingerdients:["aspernatur", "aut", "doloribus"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "beatae commodi quae" },
    { name: "Cupcake Frutas", price: 5, ingerdients:["consequuntur", "doloremque", "ullam"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "itaque architecto molestiae" },
    { name: "Cupcake Con Relleno", price: 8, ingerdients:["quia", "esse", "possimus"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "quis nemo nobis" },
    { name: "Cupcake Yogurt", price: 6, ingerdients:["cumque", "placeat", "repellendus"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "ea molestiae et" },
    { name: "Cupcake Pizza", price: 8, ingerdients:["ut", "nostrum", "eos"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "nemo omnis error" },
    { name: "Cupcake Selva negra", price: 8, ingerdients:["dolorem", "animi", "adipisci"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "aut cupiditate dolorum" },
    { name: "Cupcake Nutella", price: 7.5, ingerdients:["magni", "qui", "aut"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "minima eum quo" },
    { name: "Cupcake Vegano", price: 6.5, ingerdients:["aut", "et", "pariatur"], order_time: 1, image: "http://lorempixel.com/640/480" , description: "totam vero est" },
    { name: "Cupcake Zanahoria", price: 8.5, ingerdients:["esse", "blanditiis", "libero"], order_time: 1, image: "http://lorempixel.com/640/480", description: "eaque qui libero" }
]);