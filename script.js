document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const scoreElement = document.getElementById("score");
    const startBtn = document.getElementById("startBtn");
    let score = 0;
    let gameInterval;

    // Function to create a balloon
    const createBalloon = () => {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px"; // Random position
        gameArea.appendChild(balloon);

        // Balloon click event
        balloon.addEventListener("click", () => {
            popBalloon(balloon);
        });

        // Remove balloon after animation
        setTimeout(() => {
            if (gameArea.contains(balloon)) {
                gameArea.removeChild(balloon);
            }
        }, 5000);
    };

    // Function to pop a balloon
    const popBalloon = (balloon) => {
        score++;
        scoreElement.textContent = score;

        // Pop animation using GSAP
        gsap.to(balloon, {
            scale: 0,
            duration: 0.3,
            opacity: 0,
            onComplete: () => gameArea.removeChild(balloon),
        });
    };

    // Start the game
    const startGame = () => {
        score = 0;
        scoreElement.textContent = score;

        // Clear existing balloons and intervals
        gameArea.innerHTML = "";
        clearInterval(gameInterval);

        // Generate balloons every second
        gameInterval = setInterval(createBalloon, 1000);

        // Stop the game after 30 seconds
        setTimeout(() => {
            clearInterval(gameInterval);
            alert(`Game Over! Your score: ${score}`);
        }, 30000);
    };

    // Start button click
    startBtn.addEventListener("click", startGame);
});
