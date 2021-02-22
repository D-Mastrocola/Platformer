class Menu {
    draw(context, canvas) {
        context.fillStyle = '#2a2';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "90px Arial";
        context.fillStyle = "#fff";
        context.fillText("Basic Platformer", 70, canvas.height/2);
        context.font = "20px Arial";
        context.fillText("Press Space to Start", canvas.width/2 - 90, canvas.height/2 + 90);
    }
    update(context, canvas) {
        console.log('menu')
        this.draw(context, canvas);
    }
}

export default Menu;