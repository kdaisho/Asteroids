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

function drawShip(ctx, radius, options) {
    options = options || {};
    let angle = (options.angle || .5 * Math.PI) / 2;
    console.log('ANGLE', angle);
    // now we have two curve arguments
    let curve1 = options.curve1 || .25;
    let curve2 = options.curve2 || .75;
    ctx.save();
    if (options.guide) {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'rgba(0, 0, 0, .25)';
        ctx.lineWidth = .5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || 'white'
    ctx.fillStyle = options.fill || 'black';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    // drawing right side
    ctx.quadraticCurveTo(
        Math.cos(angle) * radius * curve2,
        Math.sin(angle) * radius * curve2,
        Math.cos(Math.PI - angle) * radius,
        Math.sin(Math.PI - angle) * radius
    );
    // drawing tail
    ctx.quadraticCurveTo(
        -radius * curve1,
        0,
        Math.cos(Math.PI + angle) * radius,
        Math.sin(Math.PI + angle) * radius
    );
    // drawing left side
    ctx.quadraticCurveTo(
        Math.cos(-angle) * radius * curve2,
        Math.sin(-angle) * radius * curve2,
        radius,
        0
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawAsteroid(ctx, radius, segments, options) {
    options = options || {};
    ctx.strokeStyle = options.stroke || 'white';
    ctx.fillStyle = options.fill || 'black';
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < segments; i++) {
        ctx.rotate(2 * Math.PI / segments);
        ctx.lineTo(radius, 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (options.guide) {
        ctx.lineWidth = .5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    ctx.restore();
}