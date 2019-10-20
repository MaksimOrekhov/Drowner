import Phaser from 'phaser';

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', function () {
            var config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                scene: {
                    preload: preload,
                    create: create,
                    update: update
                }
            };

            var game = new Phaser.Game(config);

            function preload() {
                this.load.image('logo', 'assets/sky.png');
            }

            function create() {
                this.add.image(400, 300, 'logo');
            }

            function update() {
            }
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
