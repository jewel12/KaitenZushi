$(function() {
    // var socket = io();

    // socket.on('placed', function (data) {
    //     console.log("=============================");
    //     console.log(data);
    // });

    // var neta_input = new Vue({
    //     el: '#go'
    // })

    var deploy = function (neta) {
        console.log(neta);
    }

    Vue.use('page');
    // var page = require('page');

    // page('/', function() {console.log("---");});
    // // page('/neta/*', function(d) {console.log("---");});
    // page.start();

    // var routes = {
    //     '/kuma': function () { console.log('kuma'); },
    //     '/yabasa': function () { console.log('yabasa'); },
    //     '/neta/:neta': deploy
    // };

    // var router = Router(routes);
    // router.init();

    $('button').click(function() {
        console.log("!!!");
        // var neta = { neta: "kumwa" };
        // socket.emit('place', neta);
    });
});
