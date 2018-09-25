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
        ctx.lineWidth = (x % major === 0) ? .5 : .25;
        ctx.stroke();
        if (x % major === 0) ctx.fillText(x, x, 10);
    }

    for (let y = 0; y < height; y += minor) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = (y % major === 0) ? .5 : .25;
        ctx.textBaseline = 'top';
        ctx.stroke();
        if (y % major === 0) ctx.fillText(y, 0, y);
    }
    ctx.restore();
}

function drawPacman(ctx, x, y, radius, mouthSize) {
    x = x || 200;
    y = y || 200;
    angle = .2 * Math.PI * mouthSize;
    radius = radius || 150;

    ctx.save();
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = .5;
    ctx.beginPath();
    ctx.arc(x, y, radius, angle, -angle);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawShip(ctx, radius, options) {
    options = options || {};
    ctx.save();
    // optionally draw a guide showing the collision radius
    if (options.guide) {
        ctx.strokeStyle = '#fff';
        ctx.fillStyle = 'rgba(0, 0, 0, .25)';
        ctx.lineWidth = .5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    // set some default values
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || '#fff';
    ctx.fillStyle = options.fill || '#000';
    let angle = (options.angle || .5 * Math.PI) / 2;
    // draw the ship in three lines
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(
        Math.cos(Math.PI - angle) * radius,
        Math.sin(Math.PI - angle) * radius
    );
    ctx.lineTo(
        Math.cos(Math.PI + angle) * radius,
        Math.sin(Math.PI + angle) * radius
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}