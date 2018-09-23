function drawGrid(ctx, minor, major, stroke, fill) {
    minor = minor || 10;
    major = major || 50;
    stroke = stroke || '#00ff00';
    fill = fill || '#009900';

    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    let width = ctx.canvas.width,
        height = ctx.canvas.height;
    for (let x = 0; x < width; x += minor) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = (x % major === 0)? .5 : .25;
        ctx.stroke();
        if (x % major === 0) ctx.fillText(x, x, 10);
    }

    for (let y = 0; y < height; y += minor) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = (y % major === 0)? .5 : .25;
        ctx.textBaseline = 'top';
        ctx.stroke();
        if (y % major === 0) ctx.fillText(y, 0, y);
    }
    ctx.restore();
}