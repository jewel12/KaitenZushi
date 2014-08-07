$(function() {
    'use strict';
    
    var sushi = new Vue({
        el: '#kaitenzushi',
        data: {
            neta: '鯵',
            broadcaster: null
        },
        created: function () {
            // Change background color when the neta is changed.
            this.$watch('neta', this.changeBackgroundColor);
        },
        methods: {
            onClick: function () {
                if( this.broadcaster ) { this.broadcaster(this.neta); }
            },
            changeBackgroundColor: function () {
                var color = '#' + CryptoJS.SHA256(this.neta).toString(CryptoJS.enc.Hex).substr(0,6);
                $(this.$el).css('background-color', color);
            }
        }
    });

    var activities = new Vue({
        el: '#activities',
        data: {
            items: []
        },
        methods: {
            now: function () {
                var time = new Date;
                return time.toLocaleString();
            },
            add: function (type) {
                this.items.unshift({ type: type, time: this.now() });
            },
            join: function () {
                this.items = [];   
                this.add('JOIN');
            },
            broadcast: function () {
                this.add('BROADCAST');
            },
            arrived: function () {
                this.add('ARRIVED');
            }
        }
    });
    
    // Setup Socket.IO
    var socket = io();
    sushi.$data.broadcaster = function (neta) {
        activities.broadcast();
        socket.emit('place', { neta: neta });
    };
    socket.on('placed', function (data) {
        if (sushi.$data.neta == data.neta) {
            activities.arrived();
            notify(sushi.$data.neta);
        }
    });

    function notify(neta) {
        if (Notification.permission) {
            new Notification('KaitenZushi', {
                tag: 'KaitenZushi',
                body: sushi.$data.neta
            });
        }
    }

    function startKaitenZushi(inputText) {
        activities.join();
        var decoded = Base64.decode(inputText);
        sushi.$data.neta = decoded;
    }

    // Routing
    var routes = {
        '/sushi/:neta': startKaitenZushi
    };
    var router = Router(routes).configure({
        notfound: function () { location.href = location.protocol + '//' + location.host; }
    });
    router.init();
    
    // Initialize App
    $('input#sushi').on('keydown', function(e) {
        if (e.keyCode == 13) {
            var encoded = Base64.encodeURI($('input#sushi').val());
            var url =
                location.protocol + '//' + 
                location.host + '/#/sushi/' + encoded;
            location.href = url;
        }
    });
    
    //// Enable web notification
    if (Notification.permission !== 'granted') {
        var notification_enable_tag = $('#enable_notification');
        notification_enable_tag.show();
        notification_enable_tag.on('click', function(e) {
            Notification.requestPermission();
        });
    }
});
