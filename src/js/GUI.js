define('GUI', ['UserPointer', 'UserKeyboard', 'Util'], function(UserPointer, UserKeyboard, Util){

	var 

		// reference to the Phaser Game object
		phaserGame,

		// reference to the singleton GUI object 
		singleton,

		// setting up the frames for the individual GUI animations
		animations = (function(){

			return {

				'click-move': [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				'click-enemy': [ 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
				'click-friendly': [ 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],

				'select-enemy-big': [121, 122, 123, 124, 125],
				'select-enemy-extrabig': [126, 127, 128, 129, 130],
				'select-enemy-medium': [131, 132, 133, 134, 135],
				'select-enemy-small': [136, 137, 138, 139, 140],

				'select-big': [141, 142, 143, 144, 145],
				'select-extrabig': [147, 148, 149, 150, 151],
				'select-medium': [152, 153, 154, 155, 156],
				'select-small': [157, 158, 159, 160, 161]

			};

		})();


	return (function(){

		var 
			/**
			 * Hiding sprite element
			 * @return {void}
			 */
			hide = function(){
				this.visible = false;
			},

			/**
			 * Unhiding sprite element
			 * @return {void}
			 */
			show = function(){
				this.visible = true;
			},

			// reference to a Phaser.Sprite object that displays the click animation
			clickAnim,

			// Frame rate for the click animations
			clickAnimFrameRate = 20;


		function GUI(){
			initClickAnimations();
		}

		function initClickAnimations(){
			var anim;
			clickAnim = phaserGame.add.sprite(0, 0, 'gui');
			clickAnim.visible = false;
			clickAnim.anchor.setTo(0.5, 0.5);

			['click-move', 'click-enemy', 'click-friendly'].forEach(function(animation){

				anim = clickAnim.animations.add(animation, animations[animation]);
				anim.onStart.add(show, clickAnim);
				anim.onComplete.add(hide, clickAnim);

			});
		}

		GUI.prototype = {

			/**
			 * Placing and triggering the click animation onto the game area
			 * @param  {integer} x
			 * @param  {integer} y
			 * @param  {integer} anim
			 * @return {void}
			 */
			putClickAnim: function(x, y, anim){
				if (undefined === anim){
					anim = 'click-move';
				}
				clickAnim.x = x;
				clickAnim.y = y;
				clickAnim.animations.stop(null, true);
				clickAnim.play(anim, clickAnimFrameRate);
			},

			/**
			 * Creating a seletor sprite and setting up the corresponding animation sequences
			 * @return {object} Phaser.Sprite
			 */
			createSelectorSprite: function(){

				var selector = phaserGame.add.sprite(0, 0, 'gui');
				selector.visible = false;
				selector.anchor.setTo(0.5, 0.5);

				[
					'select-enemy-big'
					'select-enemy-extrabig',
					'select-enemy-medium',
					'select-enemy-small',
					'select-big'
					'select-extrabig',
					'select-medium',
					'select-small',					
				].forEach(function(animation){

					anim = selector.animations.add(animation, animations[animation]);
					anim.onStart.add(show, selector);

				});				
				
				return selector;
			}

		};

		return {

			setGame: function(game){
				phaserGame = game;
			},

			getInstance: function(){
				if (!phaserGame){
					throw 'Invoke setGame first to pass the Phaser Game entity!';
				}			
				if (!singleton){
					singleton = new GUI();
				}
				return singleton;
			}		

		};


	})();


});