window.onload = function() {

	var gameBegin  = document.getElementsByClassName('gameBegin')[0];
	var gameOverDiv = document.getElementsByClassName('gameOver-div')[0];
	var gameOverP = document.getElementsByClassName('gameOver-p')[0];
	var startGameP = document.getElementsByClassName('startGame-p')[0];
	var startGameDiv = document.getElementsByClassName('startGame-div')[0];

	gameOverP.onclick = initialization;

	startGameP.onclick = initialization;

		var map;
		var contextMap;

		var	playerCvsCvs;
		var contextPlayer;

		var enemyCvs;
		var contextEnemy;

		var width = 800;
		var height = 500;

		var background = new Image();
		background.src = 'bg.jpg';

		var playerImg = new Image();
		playerImg.src = 'earth.png';

		var enemyImg = new Image();
		enemyImg.src = 'asteroid.png';

		var player;
		var enemy;
		var flag;
		var enemies = [];
		var health;
		var score = 0;

		var requestAnimateframe = window.requestAnimationFrame ||
	 		window.webkitRequestAnimationFrame ||
	  		window.mozRequestAnimationFrame ||
	   		window.oRequestAnimationFrame || 
	   		window.msRequestAnimationFrame;

					

		function initialization() {
			map = document.getElementById('map');
			contextMap = map.getContext('2d');

			playerCvs = document.getElementById('player');
			contextPlayer = playerCvs.getContext('2d');

			enemyCvs = document.getElementById('enemy');
			contextEnemy = enemyCvs.getContext('2d');

			map.height = height;
			map.width = width;

			playerCvs.width = width;
			playerCvs.height = height;

			enemyCvs.width = width;
			enemyCvs.height = height;

			health = 100;

			player = new Player(100, 200, 70, 70); 

			document.addEventListener('keydown', keyDown, false);
			document.addEventListener('keyup', keyUp, false);
			
			startLoop();
			drawBg();
			spawnEnemy(10);
		}

		function spawnEnemy(count) {
			for(var i = 0; i < count; i++) {
				enemies[i] = new Enemy();
			}
		}

		function loop () {
			if(flag) {
				draw();
				update();
				requestAnimateframe(loop);
			}
		}

		function startLoop () {
			flag = true;
			loop();
		}

		function stopLoop () {
			flag = false;
		}			


		function Player (x, y, z, k) {
			this.coordsX = x;
			this.coordsY = y;
			this.width = z;
			this.height = k;
			this.speed = 5;
			this.isUp = false;
			this.isDown = false;
			this.isRight = false;
			this.isLeft = false;
		}

		Player.prototype.draw = function() {
			clearRectPlayer();
			contextPlayer.drawImage(playerImg, this.coordsX, this.coordsY, this.width, this.height);
		}

		Player.prototype.update = function () {
			if(health < 5) {
				gameBegin.classList.add('none');
				gameOverDiv.classList.remove('none');
				resetHealth();
				resetscore();
				stopLoop ();
			}

			this.direction();
			if(this.coordsX < 0) this.coordsX = 0;
			if(this.coordsX > width - this.width) this.coordsX = width - this.width;
			if(this.coordsY < 0) this.coordsY = 0;
			if(this.coordsY > height - this.height) this.coordsY = height - this.height; 

			for(var i = 0; i < enemies.length; i++) {
				if(this.coordsX >= enemies[i].coordsX && 
					this.coordsY >= enemies[i].coordsY &&
					this.coordsX <= enemies[i].coordsX + enemies[i].width - 5 &&
					this.coordsY <= enemies[i].coordsY + enemies[i].height - 5) {
					health = health - 5;
					document.getElementById('outerHealth').innerHTML = health;
				}
			}
		}

		Player.prototype.direction = function() {
			if(this.isUp) this.coordsY -= this.speed;
			if(this.isDown) this.coordsY += this.speed;
			if(this.isRight) this.coordsX += this.speed;
			if(this.isLeft) this.coordsX -= this.speed;
		}

		function keyDown(e) {
			var keyId = e.keyCode || e.which; 
			var keyChar = String.fromCharCode(keyId);
			
			if(keyChar == 'W' || keyId == 38)player.isUp = true;
			e.preventDefault();
			if(keyChar == 'S' || keyId == 40)player.isDown = true;
			e.preventDefault();
			if(keyChar == 'D' || keyId == 39)player.isRight = true;
			e.preventDefault();
			if(keyChar == 'A' || keyId == 37)player.isLeft = true;
			e.preventDefault();
		} 

		function keyUp(e) {
			var keyId = e.keyCode || e.which; 
			var keyChar = String.fromCharCode(keyId);
			
			if(keyChar == 'W' || keyId == 38)player.isUp = false;
			e.preventDefault();
			if(keyChar == 'S' || keyId == 40)player.isDown = false;
			e.preventDefault();
			if(keyChar == 'D' || keyId == 39)player.isRight = false;
			e.preventDefault();
			if(keyChar == 'A' || keyId == 37)player.isLeft = false;
			e.preventDefault();
		} 

		function Enemy(x, y, z, k) {
			this.coordsX = Math.floor(Math.random() * width ) + width;
			this.coordsY = Math.floor(Math.random() * 430);
			this.width = 80;
			this.height = 70;
			this.speed = 5;
		}

		Enemy.prototype.draw = function () {
			contextEnemy.drawImage(enemyImg, this.coordsX, this.coordsY, this.width, this.height);
		}

		Enemy.prototype.update = function () {
			this.coordsX -= this.speed;
			if(this.coordsX < 0 - this.width) {
				score = score + 1;
				document.getElementById('outer').innerHTML = score; 
				document.getElementById('myscore').innerHTML = score; 
				this.coordsX = Math.floor(Math.random() * 2000) + width;
				this.coordsY = Math.floor(Math.random() *  430);
			}

			if(score > 10) this.speed = 6;
			if(score > 30) this.speed = 7;
			if(score > 50) this.speed = 8;
			if(score > 100) this.speed = 9;
			if(score > 200) this.speed = 10;
			if(score > 300) this.speed = 11;
			if(score > 500) this.speed = 12;
		}


		function draw() {
			player.draw();
			clearRectEnemy();
			for(var i = 0; i < enemies.length; i++) {
				enemies[i].draw();
			}
		}

		function update() {
			player.update();
			for(var i = 0; i < enemies.length; i++) {
				enemies[i].update();
			}
		}
		
		function drawBg () {
	 		contextMap.drawImage(background, 0, 0, width, height);
	 	}

	 	function clearRectPlayer() {
	 		contextPlayer.clearRect(0,0,width, height);
	 	}

	 	function clearRectEnemy() {
	 		contextEnemy.clearRect(0,0,width, height);
	 	}

	 	function resetHealth() {
	 		health = 100;
	 	}

	 	function resetscore() {
	 		score = 0;
	 	}

}