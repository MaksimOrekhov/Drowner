import Phaser from 'phaser';
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', function() {
            var config = {
                type: Phaser.WEBGL,
                width: '100%',
                height: '100%',
                parent: 'game',
                scene: {
                    preload: preload,
                    create: create
                }
            };

            var game = new Phaser.Game(config);

            function preload() {
            }

            function create() {
            }
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
