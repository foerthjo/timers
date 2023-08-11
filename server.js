const express = require('express');
const port = 80;
const server = express();

const fs = require('fs');
const index = fs.readFileSync('index.html', {encoding: "utf-8"});
const style = fs.readFileSync('style.css');
const icon = fs.readFileSync('icon.png');
const icon512 = fs.readFileSync('icon_512.png');
const manifest = fs.readFileSync('manifest.json');
const PWACache = ('' + fs.readFileSync('PWACache.js', {encoding: "utf-8"})).replace("@version", new Date());

server.get('/', (req, res) => {
	res.type('html');
	res.end(index);
});

server.get('/style.css', (req, res) => {
	res.type('css');
	res.end(style);
});

server.get('/favicon.ico', (req, res) => {
	res.type('application/png');
	res.end(icon);
});

server.get('/icon_512.png', (req, res) => {
	res.type('application/png');
	res.end(icon512);
});

server.get('/PWACache.js', (req, res) => {
	res.type('js');
	res.end(PWACache);
});

['time', 'validation', 'jsEssentials'].forEach(fileName => {
	const file = fs.readFileSync(`${fileName}.js`);
	server.get(`/${fileName}.js`, (req, res) => {
		res.type('js');
		res.end(file);
	});
});

['timerList', 'timer', 'days', 'minutes', 'months', 'weeks', 'years', 'once'].forEach(fileName => {
	const file = fs.readFileSync(`components/${fileName}.js`);
	server.get(`/${fileName}.js`, (req, res) => {
		res.type('js');
		res.end(file);
	});
});

server.get('/manifest.json', (req, res) => {
	res.type('application/json');
	res.end(manifest);
});

server.listen(port, () => {
	console.log(`express server listening on port ${port}`);
});