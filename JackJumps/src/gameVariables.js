let currentLevel = 1;

let bodyBackground = document.querySelector("body");
let winScreen = document.querySelector(".winning-screen");
let gameCanvas = document.querySelector("#canvas");

let health = 100;

let coins = [];
let coinsCollected = 0;

canvas.width = 1024;
canvas.height = 576;

//player
let tempFrameVariable = 0;
let playerCurrentPosition = 0;

//events varibles
let isJumping = false;
let isGrounded = true;
let lastKeyPressed;
let disableUserInput = false;
let showPause = false;
let pauseCanvas = false;

//flag and fireball
let fireballs = [];
let sharpnels = [];
let flags = [];

//flower
let flowers = [];
let frameSpeed = 0;

//game variables
let fps = 100;
let levelChanged = false;
let gameData;

// goomba
let goombas = [];
let lifes = [];

//platform
let platforms = [];
let platformDistance = 0;
let platformMap = [];

//mainboss variables
let shotFired = false;
let mainBoss;
tempFrameVariable = 0;
mainBossHealth = 100;

//blocks and moving blocks
let movingBlocks = [];
let blocks = [];

let particles = [];
