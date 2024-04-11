// Middleware para registrar solicitudes HTTP
const fs = require('fs');

function logRequest(req, res, next) {
    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()} ${date.getMinutes()} ${date.getSeconds()}`;
    const method = req.method;
    const url = req.originalUrl;
    const queryParams = JSON.stringify(req.query);
    const body = JSON.stringify(req.body);
    const ip = req.ip;

    const logLine = `${formattedDate} [${method}] ${url} ${queryParams} ${body} ${ip}\n`;

    fs.appendFile('access_log.txt', logLine, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });

    next();
}

module.exports = logRequest;
