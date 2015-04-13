// Modifed from http://codepen.io/jackrugile/pen/JAKbg
(function() {
  var Loader = {};

  Loader.Particle = function( opt ) {
    this.radius = 7;
    this.x = opt.x;
    this.y = opt.y;
    this.angle = opt.angle;
    this.speed = opt.speed;
    this.accel = opt.accel;
    this.decay = 0.01;
    this.life = 1;
  };

  Loader.Particle.prototype.step = function( i ) {
    this.speed += this.accel;
    this.x += Math.cos( this.angle ) * this.speed;
    this.y += Math.sin( this.angle ) * this.speed;
    this.angle += Loader.PI / 64;
    this.accel *= 1.01;
    this.life -= this.decay;

    if( this.life <= 0 ) { Loader.particles.splice( i, 1 ); }
  };

  Loader.Particle.prototype.draw = function( i ) {
    Loader.ctx.fillStyle = Loader.ctx.strokeStyle = 'hsla(' + ( Loader.tick + ( this.life * 120 ) ) + ', 100%, 60%, ' + this.life + ')';
    Loader.ctx.beginPath();
    if( Loader.particles[ i - 1 ] ) {
      Loader.ctx.moveTo( this.x, this.y );
      Loader.ctx.lineTo( Loader.particles[ i - 1 ].x, Loader.particles[ i - 1 ].y );
    }
    Loader.ctx.stroke();

    Loader.ctx.beginPath();
    Loader.ctx.arc( this.x, this.y, Math.max( 0.001, this.life * this.radius ), 0, Loader.TWO_PI );
    Loader.ctx.fill();

    var size = Math.random() * 1.25;
    Loader.ctx.fillRect( ~~( this.x + ( ( Math.random() - 0.5 ) * 35 ) * this.life ), ~~( this.y + ( ( Math.random() - 0.5 ) * 35 ) * this.life ), size, size );
  };

  Loader.step = function() {
    Loader.particles.push( new Loader.Particle({
      x: Loader.width / 2 + Math.cos( Loader.tick / 20 ) * Loader.min / 2,
      y: Loader.height / 2 + Math.sin( Loader.tick / 20 ) * Loader.min / 2,
      angle: Loader.globalRotation + Loader.globalAngle,
      speed: 0,
      accel: 0.01
    }));

    Loader.particles.forEach( function( elem, index ) {
      elem.step( index );
    });

    Loader.globalRotation += Loader.PI / 6;
    Loader.globalAngle += Loader.PI / 6;
  };

  Loader.draw = function() {
    Loader.ctx.clearRect( 0, 0, Loader.width, Loader.height );

    Loader.particles.forEach( function( elem, index ) {
      elem.draw( index );
    });
  };

  Loader.init = function(query) {
    Loader.canvas = document.createElement( 'canvas' );
    Loader.ctx = Loader.canvas.getContext( '2d' );
    Loader.width = Loader.canvas.width = 300;
    Loader.height = Loader.canvas.height = 300;
    Loader.min = Loader.width * 0.5;
    Loader.particles = [];
    Loader.globalAngle = 0;
    Loader.globalRotation = 0;
    Loader.tick = 0;
    Loader.PI = Math.PI;
    Loader.TWO_PI = Loader.PI * 2;
    Loader.ctx.globalCompositeOperation = 'lighter';
    $(query).append( Loader.canvas );
    Loader.loop();
  };

  Loader.loop = function() {
    requestAnimationFrame( Loader.loop );
    Loader.step();
    Loader.draw();
    Loader.tick++;
  };

  exports.Loader = Loader;
}).call(this);
