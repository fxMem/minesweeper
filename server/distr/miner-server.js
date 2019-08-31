/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../core/Field.ts":
/*!************************!*\
  !*** ../core/Field.ts ***!
  \************************/
/*! exports provided: TileState, Field */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileState", function() { return TileState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
var _a;
var TileState;
(function (TileState) {
    TileState[TileState["Closed"] = 0] = "Closed";
    TileState[TileState["Open"] = 1] = "Open";
    TileState[TileState["Flagged"] = 2] = "Flagged";
    TileState[TileState["Exploded"] = 3] = "Exploded";
})(TileState || (TileState = {}));
var TileAction;
(function (TileAction) {
    TileAction[TileAction["Open"] = 0] = "Open";
    TileAction[TileAction["Flag"] = 1] = "Flag";
    TileAction[TileAction["Probe"] = 2] = "Probe";
})(TileAction || (TileAction = {}));
var possibleActionsMap = (_a = {},
    _a[TileState.Closed] = [TileAction.Open, TileAction.Flag],
    _a[TileState.Open] = [TileAction.Probe],
    _a[TileState.Flagged] = [TileAction.Flag],
    _a[TileState.Exploded] = [],
    _a);
function canPerformTileAction(state, action) {
    return possibleActionsMap[state].some(function (a) { return a === action; });
}
var Tile = /** @class */ (function () {
    function Tile(pos, state, bomb, value) {
        this.pos = pos;
        this.state = state;
        this.bomb = bomb;
        this.value = value;
    }
    Tile.prototype.do = function (action) {
        var _this = this;
        if (!canPerformTileAction(this.state, action)) {
            throw new Error('Can\'t do requested action!');
        }
        var gameOver = false;
        var openTile = function () {
            _this.bomb ? (gameOver = true, _this.state = TileState.Exploded) : (_this.state = TileState.Open);
        };
        switch (action) {
            case TileAction.Open:
                openTile();
                break;
            case TileAction.Flag:
                this.state == TileState.Flagged ? this.state = TileState.Closed : this.state = TileState.Flagged;
                break;
            case TileAction.Probe:
                // we don't do anything here as probing logic requeres managing all field
                // this method just ensures that probing is allowed.
                break;
            default:
                throw new Error("Incorrect tile action " + action);
        }
        return gameOver;
    };
    Tile.prototype.getInfo = function () {
        var tileInfo = { state: this.state };
        switch (this.state) {
            case TileState.Closed:
            case TileState.Flagged:
            case TileState.Exploded:
                return tileInfo;
            case TileState.Open:
                return Object.assign({}, tileInfo, { value: this.value });
        }
    };
    return Tile;
}());
var moves = [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]];
var Field = /** @class */ (function () {
    function Field(_a) {
        var _this = this;
        var height = _a.height, width = _a.width, map = _a.map, flags = _a.flags;
        this.height = height;
        this.width = width;
        this.flagsRemain = flags;
        var countNearBombs = function (x, y) {
            var count = 0;
            for (var _i = 0, _a = _this.getNearTileCoordinates({ y: y, x: x }); _i < _a.length; _i++) {
                var coords = _a[_i];
                if (map[coords.y][coords.x]) {
                    count++;
                }
            }
            return count;
        };
        this.grid = [];
        for (var i = 0; i < height; i++) {
            this.grid[i] = [];
            for (var j = 0; j < this.width; j++) {
                this.grid[i][j] = new Tile({ y: i, x: j }, TileState.Closed, map[i][j], countNearBombs(j, i));
            }
        }
    }
    Field.prototype.getTileInfo = function (_a) {
        var y = _a.y, x = _a.x;
        return this.grid[y][x].getInfo();
    };
    Field.prototype.getAllTilesData = function () {
        var data = [];
        for (var i = 0; i < this.height; i++) {
            data[i] = [];
            for (var j = 0; j < this.width; j++) {
                data[i].push(this.grid[i][j].getInfo());
            }
        }
        return data;
    };
    Field.prototype.open = function (pos) {
        var tile = this.getTile(pos);
        return this.getResult(this.openSegmentWithCenter(tile));
    };
    Field.prototype.flag = function (pos) {
        var tile = this.getTile(pos);
        if (tile.state === TileState.Closed && this.flagsRemain === 0) {
            throw new Error("There is no flags left to put!");
        }
        tile.do(TileAction.Flag);
        if (tile.state === TileState.Flagged) {
            this.flagsRemain--;
            tile.bomb && this.flaggedBombs++;
        }
        else {
            this.flagsRemain++;
            tile.bomb && this.flaggedBombs--;
        }
        return this.getResult(false);
    };
    Field.prototype.probe = function (pos) {
        var tile = this.getTile(pos);
        // we have to call this in order to make sure action is allowed. 
        var blewOver = tile.do(TileAction.Probe);
        // Open all nearby tiles
        for (var _i = 0, _a = this.getNearTiles(pos); _i < _a.length; _i++) {
            var nearTile = _a[_i];
            if (nearTile.state === TileState.Closed) {
                blewOver = this.openSegmentWithCenter(nearTile);
            }
        }
        return this.getResult(blewOver);
    };
    Field.prototype.getResult = function (blewOver) {
        return {
            blewOver: blewOver,
            win: this.hiddenBombs === 0
        };
    };
    Field.prototype.openSegmentWithCenter = function (tile) {
        if (tile.do(TileAction.Open)) {
            // we got blown up on the first tile.
            return true;
        }
        if (tile.value > 0) {
            // We don't open nearby tiles if we have bomb in neighbor tile
            return false;
        }
        // Otherwise, we're good. We only open free tiles so we can't lose here.
        var q = [tile.pos];
        while (true) {
            if (q.length == 0) {
                break;
            }
            var _a = q.shift(), y = _a.y, x = _a.x;
            for (var _i = 0, _b = this.getNearTiles({ y: y, x: x }); _i < _b.length; _i++) {
                var tile_1 = _b[_i];
                if (tile_1.state === TileState.Closed) {
                    tile_1.do(TileAction.Open);
                    if (tile_1.value === 0) {
                        q.push(tile_1.pos);
                    }
                }
            }
        }
        return false;
    };
    Field.prototype.getNearTiles = function (_a) {
        var _this = this;
        var x = _a.x, y = _a.y;
        return this.getNearTileCoordinates({ y: y, x: x }).map(function (c) { return _this.grid[c.y][c.x]; });
    };
    Field.prototype.getNearTileCoordinates = function (_a) {
        var x = _a.x, y = _a.y;
        var result = [];
        for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
            var move = moves_1[_i];
            var next = { y: y + move[0], x: x + move[1] };
            if (!this.isInsideGrid(next)) {
                continue;
            }
            result.push({ x: next.x, y: next.y });
        }
        return result;
    };
    Field.prototype.getTile = function (pos) {
        this.ensureInsideGrid(pos);
        return this.grid[pos.y][pos.x];
    };
    Field.prototype.isInsideGrid = function (_a) {
        var y = _a.y, x = _a.x;
        return 0 <= y && y < this.height && 0 <= x && x < this.width;
    };
    Field.prototype.ensureInsideGrid = function (pos) {
        if (!this.isInsideGrid(pos)) {
            throw new Error("Position " + pos.x + ":" + pos.y + " is not inside game field!");
        }
    };
    return Field;
}());



/***/ }),

/***/ "../core/MinerGame.ts":
/*!****************************!*\
  !*** ../core/MinerGame.ts ***!
  \****************************/
/*! exports provided: MinerGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinerGame", function() { return MinerGame; });
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ "../core/Field.ts");
/* harmony import */ var _MinerPlayerAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MinerPlayerAction */ "../core/MinerPlayerAction.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var MinerGame = /** @class */ (function () {
    function MinerGame(options, send) {
        this.options = options;
        this.send = send;
        this.fields = new Map();
    }
    MinerGame.prototype.addPlayer = function (_a) {
        var nickname = _a.nickname;
        if (!this.fields.has(nickname)) {
            this.fields.set(nickname, {
                field: new _Field__WEBPACK_IMPORTED_MODULE_0__["Field"](__assign(__assign({}, this.options), { flags: this.options.flagsAvailable })),
                isAlive: true,
                remainigLives: this.options.lives
            });
        }
    };
    MinerGame.prototype.removePlayer = function (_a) {
        var nickname = _a.nickname;
        this.fields.delete(nickname);
    };
    MinerGame.prototype.message = function (_a, data) {
        var nickname = _a.nickname;
        if (data.action === _MinerPlayerAction__WEBPACK_IMPORTED_MODULE_1__["MinerPlayerAction"].checkState) {
            return this.buildGameState();
        }
        var field = this.fields.get(nickname).field;
        var result = this.makeMove(field, data);
        this.updateResultForPlayer(nickname, result);
        this.send(this.buildGameState());
        return result;
    };
    MinerGame.prototype.updateResultForPlayer = function (nickname, result) {
        result.win && (this.winner = nickname);
        if (result.blewOver) {
            var fieldData = this.fields.get(nickname);
            // TODO: Refactor to separate class
            fieldData.remainigLives--;
            fieldData.isAlive = fieldData.remainigLives > 0;
        }
    };
    MinerGame.prototype.makeMove = function (field, data) {
        var result = null;
        switch (data.action) {
            case _MinerPlayerAction__WEBPACK_IMPORTED_MODULE_1__["MinerPlayerAction"].open:
                result = field.open(data.pos);
                break;
            case _MinerPlayerAction__WEBPACK_IMPORTED_MODULE_1__["MinerPlayerAction"].flag:
                result = field.flag(data.pos);
                break;
            case _MinerPlayerAction__WEBPACK_IMPORTED_MODULE_1__["MinerPlayerAction"].probe:
                result = field.probe(data.pos);
                break;
        }
        return result;
    };
    MinerGame.prototype.buildGameState = function () {
        return {
            data: Array.from(this.fields).map(function (f) {
                return ({
                    name: f[0],
                    state: {
                        remainigLives: f[1].remainigLives,
                        remainingFlags: f[1].field.flagsRemain,
                        isAlive: f[1].isAlive,
                        map: f[1].field.getAllTilesData(),
                        fieldSize: {
                            width: f[1].field.width,
                            height: f[1].field.height,
                        }
                    }
                });
            }),
            winner: {
                name: this.winner
            }
        };
    };
    MinerGame.prototype.start = function () {
    };
    MinerGame.prototype.dispose = function () {
        this.fields.clear();
        // prob won't needed but whatever
        this.send = null;
    };
    return MinerGame;
}());



/***/ }),

/***/ "../core/MinerGameState.ts":
/*!*********************************!*\
  !*** ../core/MinerGameState.ts ***!
  \*********************************/
/*! exports provided: MinerGameStateUpdateHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinerGameStateUpdateHeader", function() { return MinerGameStateUpdateHeader; });
var MinerGameStateUpdateHeader = 'minerUpdate';


/***/ }),

/***/ "../core/MinerPlayerAction.ts":
/*!************************************!*\
  !*** ../core/MinerPlayerAction.ts ***!
  \************************************/
/*! exports provided: MinerPlayerAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinerPlayerAction", function() { return MinerPlayerAction; });
var MinerPlayerAction;
(function (MinerPlayerAction) {
    MinerPlayerAction[MinerPlayerAction["open"] = 0] = "open";
    MinerPlayerAction[MinerPlayerAction["flag"] = 1] = "flag";
    MinerPlayerAction[MinerPlayerAction["probe"] = 2] = "probe";
    MinerPlayerAction[MinerPlayerAction["checkState"] = 3] = "checkState";
})(MinerPlayerAction || (MinerPlayerAction = {}));


/***/ }),

/***/ "./MinerGameFactory.ts":
/*!*****************************!*\
  !*** ./MinerGameFactory.ts ***!
  \*****************************/
/*! exports provided: MinerGameFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinerGameFactory", function() { return MinerGameFactory; });
/* harmony import */ var _core_MinerGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/MinerGame */ "../core/MinerGame.ts");
/* harmony import */ var _core_MinerGameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/MinerGameState */ "../core/MinerGameState.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var MinerGameFactory = /** @class */ (function () {
    function MinerGameFactory() {
    }
    MinerGameFactory.prototype.create = function (session) {
        var _this = this;
        var game = new _core_MinerGame__WEBPACK_IMPORTED_MODULE_0__["MinerGame"](this.loadOptions(), function (payload) {
            session.sendMessage({ header: _core_MinerGameState__WEBPACK_IMPORTED_MODULE_1__["MinerGameStateUpdateHeader"], payload: payload });
        });
        session.subscribe({
            playerJoin: function (p) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    game.addPlayer(p);
                    return [2 /*return*/];
                });
            }); },
            playerLeave: function (p) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    game.removePlayer(p);
                    return [2 /*return*/];
                });
            }); },
            message: function (m, from) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, game.message(from, m)];
                });
            }); },
            started: function () {
                game.start();
            }
        });
        return function () {
            game.dispose();
        };
    };
    MinerGameFactory.prototype.loadOptions = function () {
        function generateRandomMap(n, m, bombsCount) {
            var map = [];
            for (var i = 0; i < n; i++) {
                map[i] = [];
                for (var j = 0; j < width; j++) {
                    map[i][j] = false;
                }
            }
            var remain = bombsCount;
            var averageOnLine = bombsCount / n;
            for (var i = 0; i < n; i++) {
                for (var h = 0; h < averageOnLine; h++) {
                    while (true) {
                        if (!remain) {
                            break;
                        }
                        var next = Math.floor(Math.random() * m);
                        if (!map[i][next]) {
                            map[i][next] = true;
                            remain--;
                            break;
                        }
                    }
                }
            }
            while (remain > 0) {
                var y = Math.floor(Math.random() * n);
                var x = Math.floor(Math.random() * m);
                if (!map[y][x]) {
                    map[y][x] = true;
                    remain--;
                }
            }
            return map;
        }
        var height = 15, width = 15, bombs = 20;
        return {
            flagsAvailable: bombs,
            height: height,
            width: width,
            lives: 1,
            map: generateRandomMap(height, width, bombs)
        };
    };
    return MinerGameFactory;
}());



/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var seedengine_server_chat_ChatManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! seedengine.server/chat/ChatManager */ "seedengine.server/chat/ChatManager");
/* harmony import */ var seedengine_server_chat_ChatManager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_chat_ChatManager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var seedengine_server_chat_ChatPipeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! seedengine.server/chat/ChatPipeline */ "seedengine.server/chat/ChatPipeline");
/* harmony import */ var seedengine_server_chat_ChatPipeline__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_chat_ChatPipeline__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var seedengine_server_core_Bootstrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! seedengine.server/core/Bootstrapper */ "seedengine.server/core/Bootstrapper");
/* harmony import */ var seedengine_server_core_Bootstrapper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_core_Bootstrapper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var seedengine_server_groups_GroupPipeline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! seedengine.server/groups/GroupPipeline */ "seedengine.server/groups/GroupPipeline");
/* harmony import */ var seedengine_server_groups_GroupPipeline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_groups_GroupPipeline__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var seedengine_server_invite_InvitationManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! seedengine.server/invite/InvitationManager */ "seedengine.server/invite/InvitationManager");
/* harmony import */ var seedengine_server_invite_InvitationManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_invite_InvitationManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var seedengine_server_invite_InvitesPipeline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! seedengine.server/invite/InvitesPipeline */ "seedengine.server/invite/InvitesPipeline");
/* harmony import */ var seedengine_server_invite_InvitesPipeline__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_invite_InvitesPipeline__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var seedengine_server_invite_KeyInvitationMethod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! seedengine.server/invite/KeyInvitationMethod */ "seedengine.server/invite/KeyInvitationMethod");
/* harmony import */ var seedengine_server_invite_KeyInvitationMethod__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_invite_KeyInvitationMethod__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var seedengine_server_lobby_LobbyPipeline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! seedengine.server/lobby/LobbyPipeline */ "seedengine.server/lobby/LobbyPipeline");
/* harmony import */ var seedengine_server_lobby_LobbyPipeline__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_lobby_LobbyPipeline__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var seedengine_server_lobby_VoteLobbyModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! seedengine.server/lobby/VoteLobbyModule */ "seedengine.server/lobby/VoteLobbyModule");
/* harmony import */ var seedengine_server_lobby_VoteLobbyModule__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_lobby_VoteLobbyModule__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var seedengine_server_log_Logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! seedengine.server/log/Logger */ "seedengine.server/log/Logger");
/* harmony import */ var seedengine_server_log_Logger__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_log_Logger__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var seedengine_server_log_LoggerScopes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! seedengine.server/log/LoggerScopes */ "seedengine.server/log/LoggerScopes");
/* harmony import */ var seedengine_server_log_LoggerScopes__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_log_LoggerScopes__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var seedengine_server_session_DefaultSessionManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! seedengine.server/session/DefaultSessionManager */ "seedengine.server/session/DefaultSessionManager");
/* harmony import */ var seedengine_server_session_DefaultSessionManager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_session_DefaultSessionManager__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var seedengine_server_session_SessionPipeline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! seedengine.server/session/SessionPipeline */ "seedengine.server/session/SessionPipeline");
/* harmony import */ var seedengine_server_session_SessionPipeline__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_session_SessionPipeline__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var seedengine_server_transport_HttpFacade__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! seedengine.server/transport/HttpFacade */ "seedengine.server/transport/HttpFacade");
/* harmony import */ var seedengine_server_transport_HttpFacade__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_transport_HttpFacade__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! seedengine.server/transport/SpecificMessageTypeHandler */ "seedengine.server/transport/SpecificMessageTypeHandler");
/* harmony import */ var seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var seedengine_server_users_InMemoryUserStorage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! seedengine.server/users/InMemoryUserStorage */ "seedengine.server/users/InMemoryUserStorage");
/* harmony import */ var seedengine_server_users_InMemoryUserStorage__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_users_InMemoryUserStorage__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var seedengine_server_users_SimpleIdentity__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! seedengine.server/users/SimpleIdentity */ "seedengine.server/users/SimpleIdentity");
/* harmony import */ var seedengine_server_users_SimpleIdentity__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(seedengine_server_users_SimpleIdentity__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _MinerGameFactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./MinerGameFactory */ "./MinerGameFactory.ts");


















function buildMinerServer() {
    Object(seedengine_server_log_LoggerScopes__WEBPACK_IMPORTED_MODULE_10__["initializeLogger"])(new seedengine_server_log_Logger__WEBPACK_IMPORTED_MODULE_9__["Log"]([new seedengine_server_log_Logger__WEBPACK_IMPORTED_MODULE_9__["DefaultConsoleLogger"]()]));
    var bootstrapper = new seedengine_server_core_Bootstrapper__WEBPACK_IMPORTED_MODULE_2__["Bootstrapper"]();
    bootstrapper
        .withHttpFacade(new seedengine_server_transport_HttpFacade__WEBPACK_IMPORTED_MODULE_13__["ExpressFacadeFactory"]())
        .withAuthMethod(new seedengine_server_users_SimpleIdentity__WEBPACK_IMPORTED_MODULE_16__["SimpleIdentity"].SimpleAuthModule())
        .withStorage(seedengine_server_users_SimpleIdentity__WEBPACK_IMPORTED_MODULE_16__["SimpleIdentity"].WithSuperUser(new seedengine_server_users_InMemoryUserStorage__WEBPACK_IMPORTED_MODULE_15__["InMemoryUserStorage"]()))
        .add(function (_) { return createSessionRelatedHandlers(_); })
        .add(function (_) { return createGroupsHandler(_); })
        .add(function (_) { return createChatHandler(_); })
        .withGame(new _MinerGameFactory__WEBPACK_IMPORTED_MODULE_17__["MinerGameFactory"]());
    return bootstrapper.build();
    function createGroupsHandler(_) {
        var groupHandler = Object(seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__["makeRegularHandler"])(new seedengine_server_groups_GroupPipeline__WEBPACK_IMPORTED_MODULE_3__["GroupPipeline"](_.groups));
        return [groupHandler];
    }
    function createChatHandler(_) {
        var chatManager = new seedengine_server_chat_ChatManager__WEBPACK_IMPORTED_MODULE_0__["ChatManager"](_.messageSender);
        var chatHandler = Object(seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__["makeRegularHandler"])(new seedengine_server_chat_ChatPipeline__WEBPACK_IMPORTED_MODULE_1__["ChatPipeline"](chatManager, _.users, _.groups));
        return [chatHandler];
    }
    function createSessionRelatedHandlers(_) {
        var sessionManager = new seedengine_server_session_DefaultSessionManager__WEBPACK_IMPORTED_MODULE_11__["DefaultSessionManager"]({ allowJoinAfterSessionStart: false }, _.messageSender, _.groups, _.game);
        var sessionPipeline = Object(seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__["makeRegularHandler"])(new seedengine_server_session_SessionPipeline__WEBPACK_IMPORTED_MODULE_12__["SessionPipeline"](sessionManager));
        var lobbyModule = new seedengine_server_lobby_VoteLobbyModule__WEBPACK_IMPORTED_MODULE_8__["VoteLobbyModule"]();
        var lobbyPipeline = Object(seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__["makeRegularHandler"])(new seedengine_server_lobby_LobbyPipeline__WEBPACK_IMPORTED_MODULE_7__["LobbyPipeline"](lobbyModule, sessionManager));
        var invitesManager = new seedengine_server_invite_InvitationManager__WEBPACK_IMPORTED_MODULE_4__["InvitationManager"](sessionManager);
        var inviteMethod = new seedengine_server_invite_KeyInvitationMethod__WEBPACK_IMPORTED_MODULE_6__["KeyInvitationMethod"](invitesManager);
        var invitesPipeline = Object(seedengine_server_transport_SpecificMessageTypeHandler__WEBPACK_IMPORTED_MODULE_14__["makeRegularHandler"])(new seedengine_server_invite_InvitesPipeline__WEBPACK_IMPORTED_MODULE_5__["InvitesPipeline"]([inviteMethod], invitesManager));
        return [sessionPipeline, lobbyPipeline, invitesPipeline];
    }
}
var instance = buildMinerServer();
instance.start();


/***/ }),

/***/ "seedengine.server/chat/ChatManager":
/*!*****************************************************!*\
  !*** external "seedengine.server/chat/ChatManager" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/chat/ChatManager");

/***/ }),

/***/ "seedengine.server/chat/ChatPipeline":
/*!******************************************************!*\
  !*** external "seedengine.server/chat/ChatPipeline" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/chat/ChatPipeline");

/***/ }),

/***/ "seedengine.server/core/Bootstrapper":
/*!******************************************************!*\
  !*** external "seedengine.server/core/Bootstrapper" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/core/Bootstrapper");

/***/ }),

/***/ "seedengine.server/groups/GroupPipeline":
/*!*********************************************************!*\
  !*** external "seedengine.server/groups/GroupPipeline" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/groups/GroupPipeline");

/***/ }),

/***/ "seedengine.server/invite/InvitationManager":
/*!*************************************************************!*\
  !*** external "seedengine.server/invite/InvitationManager" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/invite/InvitationManager");

/***/ }),

/***/ "seedengine.server/invite/InvitesPipeline":
/*!***********************************************************!*\
  !*** external "seedengine.server/invite/InvitesPipeline" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/invite/InvitesPipeline");

/***/ }),

/***/ "seedengine.server/invite/KeyInvitationMethod":
/*!***************************************************************!*\
  !*** external "seedengine.server/invite/KeyInvitationMethod" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/invite/KeyInvitationMethod");

/***/ }),

/***/ "seedengine.server/lobby/LobbyPipeline":
/*!********************************************************!*\
  !*** external "seedengine.server/lobby/LobbyPipeline" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/lobby/LobbyPipeline");

/***/ }),

/***/ "seedengine.server/lobby/VoteLobbyModule":
/*!**********************************************************!*\
  !*** external "seedengine.server/lobby/VoteLobbyModule" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/lobby/VoteLobbyModule");

/***/ }),

/***/ "seedengine.server/log/Logger":
/*!***********************************************!*\
  !*** external "seedengine.server/log/Logger" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/log/Logger");

/***/ }),

/***/ "seedengine.server/log/LoggerScopes":
/*!*****************************************************!*\
  !*** external "seedengine.server/log/LoggerScopes" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/log/LoggerScopes");

/***/ }),

/***/ "seedengine.server/session/DefaultSessionManager":
/*!******************************************************************!*\
  !*** external "seedengine.server/session/DefaultSessionManager" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/session/DefaultSessionManager");

/***/ }),

/***/ "seedengine.server/session/SessionPipeline":
/*!************************************************************!*\
  !*** external "seedengine.server/session/SessionPipeline" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/session/SessionPipeline");

/***/ }),

/***/ "seedengine.server/transport/HttpFacade":
/*!*********************************************************!*\
  !*** external "seedengine.server/transport/HttpFacade" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/transport/HttpFacade");

/***/ }),

/***/ "seedengine.server/transport/SpecificMessageTypeHandler":
/*!*************************************************************************!*\
  !*** external "seedengine.server/transport/SpecificMessageTypeHandler" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/transport/SpecificMessageTypeHandler");

/***/ }),

/***/ "seedengine.server/users/InMemoryUserStorage":
/*!**************************************************************!*\
  !*** external "seedengine.server/users/InMemoryUserStorage" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/users/InMemoryUserStorage");

/***/ }),

/***/ "seedengine.server/users/SimpleIdentity":
/*!*********************************************************!*\
  !*** external "seedengine.server/users/SimpleIdentity" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seedengine.server/users/SimpleIdentity");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvRmllbGQudHMiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvTWluZXJHYW1lLnRzIiwid2VicGFjazovLy8uLi9jb3JlL01pbmVyR2FtZVN0YXRlLnRzIiwid2VicGFjazovLy8uLi9jb3JlL01pbmVyUGxheWVyQWN0aW9uLnRzIiwid2VicGFjazovLy8uL01pbmVyR2FtZUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VlZGVuZ2luZS5zZXJ2ZXIvY2hhdC9DaGF0TWFuYWdlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL2NoYXQvQ2hhdFBpcGVsaW5lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VlZGVuZ2luZS5zZXJ2ZXIvY29yZS9Cb290c3RyYXBwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZWVkZW5naW5lLnNlcnZlci9ncm91cHMvR3JvdXBQaXBlbGluZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL2ludml0ZS9JbnZpdGF0aW9uTWFuYWdlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL2ludml0ZS9JbnZpdGVzUGlwZWxpbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZWVkZW5naW5lLnNlcnZlci9pbnZpdGUvS2V5SW52aXRhdGlvbk1ldGhvZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL2xvYmJ5L0xvYmJ5UGlwZWxpbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZWVkZW5naW5lLnNlcnZlci9sb2JieS9Wb3RlTG9iYnlNb2R1bGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZWVkZW5naW5lLnNlcnZlci9sb2cvTG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VlZGVuZ2luZS5zZXJ2ZXIvbG9nL0xvZ2dlclNjb3Blc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL3Nlc3Npb24vRGVmYXVsdFNlc3Npb25NYW5hZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VlZGVuZ2luZS5zZXJ2ZXIvc2Vzc2lvbi9TZXNzaW9uUGlwZWxpbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZWVkZW5naW5lLnNlcnZlci90cmFuc3BvcnQvSHR0cEZhY2FkZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL3RyYW5zcG9ydC9TcGVjaWZpY01lc3NhZ2VUeXBlSGFuZGxlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlZWRlbmdpbmUuc2VydmVyL3VzZXJzL0luTWVtb3J5VXNlclN0b3JhZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZWVkZW5naW5lLnNlcnZlci91c2Vycy9TaW1wbGVJZGVudGl0eVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixF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IFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBlbnVtIFRpbGVTdGF0ZSB7XHJcbiAgICBDbG9zZWQsXHJcbiAgICBPcGVuLFxyXG4gICAgRmxhZ2dlZCxcclxuICAgIEV4cGxvZGVkXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGlsZUluZm8ge1xyXG4gICAgc3RhdGU6IFRpbGVTdGF0ZTtcclxuICAgIHZhbHVlPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvb3JkaW5hdGVzIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUaWxlQWN0aW9uUmVzdWx0IHtcclxuICAgIGJsZXdPdmVyOiBib29sZWFuO1xyXG4gICAgd2luOiBib29sZWFuO1xyXG59XHJcblxyXG5lbnVtIFRpbGVBY3Rpb24ge1xyXG4gICAgT3BlbixcclxuICAgIEZsYWcsXHJcbiAgICBQcm9iZVxyXG59XHJcblxyXG5jb25zdCBwb3NzaWJsZUFjdGlvbnNNYXAgPSB7XHJcbiAgICBbVGlsZVN0YXRlLkNsb3NlZF06IFtUaWxlQWN0aW9uLk9wZW4sIFRpbGVBY3Rpb24uRmxhZ10sXHJcbiAgICBbVGlsZVN0YXRlLk9wZW5dOiBbVGlsZUFjdGlvbi5Qcm9iZV0sXHJcbiAgICBbVGlsZVN0YXRlLkZsYWdnZWRdOiBbVGlsZUFjdGlvbi5GbGFnXSxcclxuICAgIFtUaWxlU3RhdGUuRXhwbG9kZWRdOiBbXVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5QZXJmb3JtVGlsZUFjdGlvbihzdGF0ZTogVGlsZVN0YXRlLCBhY3Rpb246IFRpbGVBY3Rpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBwb3NzaWJsZUFjdGlvbnNNYXBbc3RhdGVdLnNvbWUoYSA9PiBhID09PSBhY3Rpb24pO1xyXG59XHJcblxyXG5jbGFzcyBUaWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3M6IENvb3JkaW5hdGVzLCBwdWJsaWMgc3RhdGU6IFRpbGVTdGF0ZSwgcHVibGljIGJvbWI6IGJvb2xlYW4sIHB1YmxpYyB2YWx1ZT86IG51bWJlcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkbyhhY3Rpb246IFRpbGVBY3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWNhblBlcmZvcm1UaWxlQWN0aW9uKHRoaXMuc3RhdGUsIGFjdGlvbikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IGRvIHJlcXVlc3RlZCBhY3Rpb24hJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IG9wZW5UaWxlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJvbWIgPyAoZ2FtZU92ZXIgPSB0cnVlLCB0aGlzLnN0YXRlID0gVGlsZVN0YXRlLkV4cGxvZGVkKSA6ICh0aGlzLnN0YXRlID0gVGlsZVN0YXRlLk9wZW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBUaWxlQWN0aW9uLk9wZW46XHJcbiAgICAgICAgICAgICAgICBvcGVuVGlsZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGlsZUFjdGlvbi5GbGFnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9PSBUaWxlU3RhdGUuRmxhZ2dlZCA/IHRoaXMuc3RhdGUgPSBUaWxlU3RhdGUuQ2xvc2VkIDogdGhpcy5zdGF0ZSA9IFRpbGVTdGF0ZS5GbGFnZ2VkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGlsZUFjdGlvbi5Qcm9iZTpcclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IGRvIGFueXRoaW5nIGhlcmUgYXMgcHJvYmluZyBsb2dpYyByZXF1ZXJlcyBtYW5hZ2luZyBhbGwgZmllbGRcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgbWV0aG9kIGp1c3QgZW5zdXJlcyB0aGF0IHByb2JpbmcgaXMgYWxsb3dlZC5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmNvcnJlY3QgdGlsZSBhY3Rpb24gJHthY3Rpb259YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2FtZU92ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5mbygpOiBUaWxlSW5mbyB7XHJcbiAgICAgICAgbGV0IHRpbGVJbmZvID0geyBzdGF0ZTogdGhpcy5zdGF0ZSB9O1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRpbGVTdGF0ZS5DbG9zZWQ6XHJcbiAgICAgICAgICAgIGNhc2UgVGlsZVN0YXRlLkZsYWdnZWQ6XHJcbiAgICAgICAgICAgIGNhc2UgVGlsZVN0YXRlLkV4cGxvZGVkOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbGVJbmZvO1xyXG4gICAgICAgICAgICBjYXNlIFRpbGVTdGF0ZS5PcGVuOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRpbGVJbmZvLCB7IHZhbHVlOiB0aGlzLnZhbHVlIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtb3ZlcyA9IFtbLTEsIDBdLCBbMSwgMF0sIFswLCAtMV0sIFswLCAxXSwgWzEsIDFdLCBbMSwgLTFdLCBbLTEsIC0xXSwgWy0xLCAxXV07XHJcbmV4cG9ydCBjbGFzcyBGaWVsZCB7XHJcbiAgICBwcml2YXRlIGdyaWQ6IFRpbGVbXVtdO1xyXG5cclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBmbGFnc1JlbWFpbjogbnVtYmVyO1xyXG4gICAgaGlkZGVuQm9tYnM6IG51bWJlcjtcclxuICAgIGZsYWdnZWRCb21iczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHsgaGVpZ2h0LCB3aWR0aCwgbWFwLCBmbGFncyB9OiB7IGhlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBmbGFnczogbnVtYmVyLCBtYXA6IGJvb2xlYW5bXVtdIH0pIHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5mbGFnc1JlbWFpbiA9IGZsYWdzO1xyXG5cclxuICAgICAgICBjb25zdCBjb3VudE5lYXJCb21icyA9ICh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvb3JkcyBvZiB0aGlzLmdldE5lYXJUaWxlQ29vcmRpbmF0ZXMoeyB5LCB4IH0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwW2Nvb3Jkcy55XVtjb29yZHMueF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFtpXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMud2lkdGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2ldW2pdID0gbmV3IFRpbGUoeyB5OiBpLCB4OiBqIH0sIFRpbGVTdGF0ZS5DbG9zZWQsIG1hcFtpXVtqXSwgY291bnROZWFyQm9tYnMoaiwgaSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRpbGVJbmZvKHsgeSwgeCB9OiBDb29yZGluYXRlcyk6IFRpbGVJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncmlkW3ldW3hdLmdldEluZm8oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxUaWxlc0RhdGEoKTogVGlsZUluZm9bXVtdIHtcclxuICAgICAgICBsZXQgZGF0YSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBkYXRhW2ldID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldLnB1c2godGhpcy5ncmlkW2ldW2pdLmdldEluZm8oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4ocG9zOiBDb29yZGluYXRlcyk6IFRpbGVBY3Rpb25SZXN1bHQge1xyXG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5nZXRUaWxlKHBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzdWx0KHRoaXMub3BlblNlZ21lbnRXaXRoQ2VudGVyKHRpbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBmbGFnKHBvczogQ29vcmRpbmF0ZXMpOiBUaWxlQWN0aW9uUmVzdWx0IHtcclxuXHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLmdldFRpbGUocG9zKTtcclxuXHJcbiAgICAgICAgaWYgKHRpbGUuc3RhdGUgPT09IFRpbGVTdGF0ZS5DbG9zZWQgJiYgdGhpcy5mbGFnc1JlbWFpbiA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIGZsYWdzIGxlZnQgdG8gcHV0IWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGlsZS5kbyhUaWxlQWN0aW9uLkZsYWcpO1xyXG5cclxuICAgICAgICBpZiAodGlsZS5zdGF0ZSA9PT0gVGlsZVN0YXRlLkZsYWdnZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mbGFnc1JlbWFpbi0tO1xyXG4gICAgICAgICAgICB0aWxlLmJvbWIgJiYgdGhpcy5mbGFnZ2VkQm9tYnMrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NSZW1haW4rKztcclxuICAgICAgICAgICAgdGlsZS5ib21iICYmIHRoaXMuZmxhZ2dlZEJvbWJzLS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXN1bHQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2JlKHBvczogQ29vcmRpbmF0ZXMpOiBUaWxlQWN0aW9uUmVzdWx0IHtcclxuXHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLmdldFRpbGUocG9zKTtcclxuXHJcbiAgICAgICAgLy8gd2UgaGF2ZSB0byBjYWxsIHRoaXMgaW4gb3JkZXIgdG8gbWFrZSBzdXJlIGFjdGlvbiBpcyBhbGxvd2VkLiBcclxuICAgICAgICBsZXQgYmxld092ZXIgPSB0aWxlLmRvKFRpbGVBY3Rpb24uUHJvYmUpO1xyXG5cclxuICAgICAgICAvLyBPcGVuIGFsbCBuZWFyYnkgdGlsZXNcclxuICAgICAgICBmb3IgKGNvbnN0IG5lYXJUaWxlIG9mIHRoaXMuZ2V0TmVhclRpbGVzKHBvcykpIHtcclxuICAgICAgICAgICAgaWYgKG5lYXJUaWxlLnN0YXRlID09PSBUaWxlU3RhdGUuQ2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBibGV3T3ZlciA9IHRoaXMub3BlblNlZ21lbnRXaXRoQ2VudGVyKG5lYXJUaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzdWx0KGJsZXdPdmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJlc3VsdChibGV3T3ZlcjogYm9vbGVhbik6IFRpbGVBY3Rpb25SZXN1bHQge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJsZXdPdmVyLFxyXG4gICAgICAgICAgICB3aW46IHRoaXMuaGlkZGVuQm9tYnMgPT09IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlblNlZ21lbnRXaXRoQ2VudGVyKHRpbGU6IFRpbGUpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGlsZS5kbyhUaWxlQWN0aW9uLk9wZW4pKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGdvdCBibG93biB1cCBvbiB0aGUgZmlyc3QgdGlsZS5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGlsZS52YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgb3BlbiBuZWFyYnkgdGlsZXMgaWYgd2UgaGF2ZSBib21iIGluIG5laWdoYm9yIHRpbGVcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSdyZSBnb29kLiBXZSBvbmx5IG9wZW4gZnJlZSB0aWxlcyBzbyB3ZSBjYW4ndCBsb3NlIGhlcmUuXHJcbiAgICAgICAgbGV0IHEgPSBbdGlsZS5wb3NdO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChxLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHsgeSwgeCB9ID0gcS5zaGlmdCgpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGhpcy5nZXROZWFyVGlsZXMoeyB5LCB4IH0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUuc3RhdGUgPT09IFRpbGVTdGF0ZS5DbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLmRvKFRpbGVBY3Rpb24uT3Blbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aWxlLnZhbHVlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHEucHVzaCh0aWxlLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROZWFyVGlsZXMoeyB4LCB5IH06IENvb3JkaW5hdGVzKTogVGlsZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXROZWFyVGlsZUNvb3JkaW5hdGVzKHsgeSwgeCB9KS5tYXAoYyA9PiB0aGlzLmdyaWRbYy55XVtjLnhdKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5lYXJUaWxlQ29vcmRpbmF0ZXMoeyB4LCB5IH06IENvb3JkaW5hdGVzKTogQ29vcmRpbmF0ZXNbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgbW92ZSBvZiBtb3Zlcykge1xyXG4gICAgICAgICAgICBsZXQgbmV4dCA9IHsgeTogeSArIG1vdmVbMF0sIHg6IHggKyBtb3ZlWzFdIH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0luc2lkZUdyaWQobmV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IHg6IG5leHQueCwgeTogbmV4dC55IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRpbGUocG9zOiBDb29yZGluYXRlcyk6IFRpbGUge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlSW5zaWRlR3JpZChwb3MpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRbcG9zLnldW3Bvcy54XTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzSW5zaWRlR3JpZCh7IHksIHggfTogQ29vcmRpbmF0ZXMpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gMCA8PSB5ICYmIHkgPCB0aGlzLmhlaWdodCAmJiAwIDw9IHggJiYgeCA8IHRoaXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbnN1cmVJbnNpZGVHcmlkKHBvczogQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNJbnNpZGVHcmlkKHBvcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3NpdGlvbiAke3Bvcy54fToke3Bvcy55fSBpcyBub3QgaW5zaWRlIGdhbWUgZmllbGQhYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRmllbGQsIENvb3JkaW5hdGVzLCBUaWxlQWN0aW9uUmVzdWx0LCBUaWxlSW5mbyB9IGZyb20gXCIuL0ZpZWxkXCI7XHJcbmltcG9ydCB7IE1pbmVyR2FtZU9wdGlvbnMsIE1pbmVyTWVzc2FnZSwgTWluZXJQbGF5ZXJBY3Rpb24gfSBmcm9tIFwiLi9NaW5lclBsYXllckFjdGlvblwiO1xyXG5pbXBvcnQgeyBNaW5lckdhbWVTdGF0ZSB9IGZyb20gXCIuL01pbmVyR2FtZVN0YXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXJHYW1lIHtcclxuXHJcbiAgICBwcml2YXRlIGZpZWxkcyA9IG5ldyBNYXA8c3RyaW5nLCB7IGZpZWxkOiBGaWVsZCwgaXNBbGl2ZTogYm9vbGVhbiwgcmVtYWluaWdMaXZlczogbnVtYmVyIH0+KCk7XHJcbiAgICBwcml2YXRlIHdpbm5lcjogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBNaW5lckdhbWVPcHRpb25zLCBwcml2YXRlIHNlbmQ6IChkYXRhOiBhbnkpID0+IHZvaWQpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUGxheWVyKHsgbmlja25hbWUgfTogeyBuaWNrbmFtZTogc3RyaW5nIH0pIHtcclxuICAgICAgICBpZiAoIXRoaXMuZmllbGRzLmhhcyhuaWNrbmFtZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5maWVsZHMuc2V0KG5pY2tuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZDogbmV3IEZpZWxkKHsgLi4udGhpcy5vcHRpb25zLCBmbGFnczogdGhpcy5vcHRpb25zLmZsYWdzQXZhaWxhYmxlIH0pLFxyXG4gICAgICAgICAgICAgICAgaXNBbGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlbWFpbmlnTGl2ZXM6IHRoaXMub3B0aW9ucy5saXZlc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlUGxheWVyKHsgbmlja25hbWUgfTogeyBuaWNrbmFtZTogc3RyaW5nIH0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5kZWxldGUobmlja25hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG1lc3NhZ2UoeyBuaWNrbmFtZSB9OiB7IG5pY2tuYW1lOiBzdHJpbmcgfSwgZGF0YTogTWluZXJNZXNzYWdlKTogVGlsZUFjdGlvblJlc3VsdCB8IE1pbmVyR2FtZVN0YXRlIHtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuYWN0aW9uID09PSBNaW5lclBsYXllckFjdGlvbi5jaGVja1N0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkR2FtZVN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzLmdldChuaWNrbmFtZSkuZmllbGQ7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5tYWtlTW92ZShmaWVsZCwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlUmVzdWx0Rm9yUGxheWVyKG5pY2tuYW1lLCByZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuc2VuZCh0aGlzLmJ1aWxkR2FtZVN0YXRlKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlUmVzdWx0Rm9yUGxheWVyKG5pY2tuYW1lOiBzdHJpbmcsIHJlc3VsdDogVGlsZUFjdGlvblJlc3VsdCkge1xyXG4gICAgICAgIHJlc3VsdC53aW4gJiYgKHRoaXMud2lubmVyID0gbmlja25hbWUpO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0LmJsZXdPdmVyKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZERhdGEgPSB0aGlzLmZpZWxkcy5nZXQobmlja25hbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gc2VwYXJhdGUgY2xhc3NcclxuICAgICAgICAgICAgZmllbGREYXRhLnJlbWFpbmlnTGl2ZXMtLTtcclxuICAgICAgICAgICAgZmllbGREYXRhLmlzQWxpdmUgPSBmaWVsZERhdGEucmVtYWluaWdMaXZlcyA+IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWFrZU1vdmUoZmllbGQ6IEZpZWxkLCBkYXRhOiBNaW5lck1lc3NhZ2UpOiBUaWxlQWN0aW9uUmVzdWx0IHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBUaWxlQWN0aW9uUmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChkYXRhLmFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIE1pbmVyUGxheWVyQWN0aW9uLm9wZW46XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmaWVsZC5vcGVuKGRhdGEucG9zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1pbmVyUGxheWVyQWN0aW9uLmZsYWc6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmaWVsZC5mbGFnKGRhdGEucG9zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1pbmVyUGxheWVyQWN0aW9uLnByb2JlOlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmllbGQucHJvYmUoZGF0YS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRHYW1lU3RhdGUoKTogTWluZXJHYW1lU3RhdGUge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBBcnJheS5mcm9tKHRoaXMuZmllbGRzKS5tYXBcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICBmID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5pZ0xpdmVzOiBmWzFdLnJlbWFpbmlnTGl2ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nRmxhZ3M6IGZbMV0uZmllbGQuZmxhZ3NSZW1haW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBbGl2ZTogZlsxXS5pc0FsaXZlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcDogZlsxXS5maWVsZC5nZXRBbGxUaWxlc0RhdGEoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFNpemU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGZbMV0uZmllbGQud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogZlsxXS5maWVsZC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgd2lubmVyOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLndpbm5lclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIC8vIHByb2Igd29uJ3QgbmVlZGVkIGJ1dCB3aGF0ZXZlclxyXG4gICAgICAgIHRoaXMuc2VuZCA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBUaWxlSW5mbyB9IGZyb20gXCIuL0ZpZWxkXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1pbmVyUGxheWVyU3RhdGUge1xyXG4gICAgbWFwOiBUaWxlSW5mb1tdW107XHJcbiAgICBmaWVsZFNpemU6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfTtcclxuXHJcbiAgICByZW1haW5pZ0xpdmVzOiBudW1iZXI7XHJcbiAgICByZW1haW5pbmdGbGFnczogbnVtYmVyO1xyXG5cclxuICAgIGlzQWxpdmU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIE1pbmVyR2FtZVN0YXRlID0ge1xyXG4gICAgZGF0YTogeyBuYW1lOiBzdHJpbmcsIHN0YXRlOiBNaW5lclBsYXllclN0YXRlIH1bXSxcclxuICAgIHdpbm5lcjogeyBuYW1lOiBzdHJpbmcgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWluZXJHYW1lU3RhdGVVcGRhdGVIZWFkZXIgPSAnbWluZXJVcGRhdGUnOyIsImltcG9ydCB7IENvb3JkaW5hdGVzIH0gZnJvbSBcIi4vRmllbGRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWluZXJHYW1lT3B0aW9ucyB7XHJcbiAgICBtYXA6IGJvb2xlYW5bXVtdO1xyXG5cclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGZsYWdzQXZhaWxhYmxlOiBudW1iZXI7XHJcbiAgICBsaXZlczogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBNaW5lclBsYXllckFjdGlvbiB7XHJcbiAgICBvcGVuLFxyXG4gICAgZmxhZyxcclxuICAgIHByb2JlLFxyXG4gICAgY2hlY2tTdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1pbmVyTWVzc2FnZSB7XHJcbiAgICBwb3M6IENvb3JkaW5hdGVzO1xyXG4gICAgYWN0aW9uOiBNaW5lclBsYXllckFjdGlvblxyXG59IiwiaW1wb3J0IHsgTWluZXJHYW1lIH0gZnJvbSBcIi4uL2NvcmUvTWluZXJHYW1lXCI7XHJcbmltcG9ydCB7IE1pbmVyR2FtZVN0YXRlVXBkYXRlSGVhZGVyIH0gZnJvbSBcIi4uL2NvcmUvTWluZXJHYW1lU3RhdGVcIjtcclxuaW1wb3J0IHsgTWluZXJHYW1lT3B0aW9ucyB9IGZyb20gXCIuLi9jb3JlL01pbmVyUGxheWVyQWN0aW9uXCI7XHJcblxyXG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvc2Vzc2lvbi9TZXNzaW9uJztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJ3NlZWRlbmdpbmUuc2VydmVyL2dhbWUvR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXJHYW1lRmFjdG9yeSBpbXBsZW1lbnRzIEdhbWUge1xyXG4gICAgY3JlYXRlKHNlc3Npb246IFNlc3Npb24pOiAoKSA9PiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBNaW5lckdhbWUodGhpcy5sb2FkT3B0aW9ucygpLCAocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICBzZXNzaW9uLnNlbmRNZXNzYWdlKHsgaGVhZGVyOiBNaW5lckdhbWVTdGF0ZVVwZGF0ZUhlYWRlciwgcGF5bG9hZCB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZXNzaW9uLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgIHBsYXllckpvaW46IGFzeW5jIChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmFkZFBsYXllcihwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxheWVyTGVhdmU6IGFzeW5jIChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnJlbW92ZVBsYXllcihwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZTogYXN5bmMgKG0sIGZyb20pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnYW1lLm1lc3NhZ2UoZnJvbSwgbSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0ZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWUuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBnYW1lLmRpc3Bvc2UoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRPcHRpb25zKCk6IE1pbmVyR2FtZU9wdGlvbnMge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbU1hcChuOiBudW1iZXIsIG06IG51bWJlciwgYm9tYnNDb3VudDogbnVtYmVyKTogYm9vbGVhbltdW10ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcFtpXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwW2ldW2pdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZW1haW4gPSBib21ic0NvdW50O1xyXG4gICAgICAgICAgICBjb25zdCBhdmVyYWdlT25MaW5lID0gYm9tYnNDb3VudCAvIG47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGF2ZXJhZ2VPbkxpbmU7IGgrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbWFpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXBbaV1bbmV4dF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFtpXVtuZXh0XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW4tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAocmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtYXBbeV1beF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXBbeV1beF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbi0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTUsIHdpZHRoID0gMTUsIGJvbWJzID0gMjA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmxhZ3NBdmFpbGFibGU6IGJvbWJzLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBsaXZlczogMSxcclxuICAgICAgICAgICAgbWFwOiBnZW5lcmF0ZVJhbmRvbU1hcChoZWlnaHQsIHdpZHRoLCBib21icylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ2hhdE1hbmFnZXIgfSBmcm9tICdzZWVkZW5naW5lLnNlcnZlci9jaGF0L0NoYXRNYW5hZ2VyJztcclxuaW1wb3J0IHsgQ2hhdFBpcGVsaW5lIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvY2hhdC9DaGF0UGlwZWxpbmUnO1xyXG5pbXBvcnQgeyBCb290c3RyYXBwZXIsIENvcmVEZXBlbmRlbmNpZXMgfSBmcm9tICdzZWVkZW5naW5lLnNlcnZlci9jb3JlL0Jvb3RzdHJhcHBlcic7XHJcbmltcG9ydCB7IEluc3RhbmNlIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvY29yZS9JbnN0YW5jZSc7XHJcbmltcG9ydCB7IEdyb3VwUGlwZWxpbmUgfSBmcm9tICdzZWVkZW5naW5lLnNlcnZlci9ncm91cHMvR3JvdXBQaXBlbGluZSc7XHJcbmltcG9ydCB7IEludml0YXRpb25NYW5hZ2VyIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvaW52aXRlL0ludml0YXRpb25NYW5hZ2VyJztcclxuaW1wb3J0IHsgSW52aXRlc1BpcGVsaW5lIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvaW52aXRlL0ludml0ZXNQaXBlbGluZSc7XHJcbmltcG9ydCB7IEtleUludml0YXRpb25NZXRob2QgfSBmcm9tICdzZWVkZW5naW5lLnNlcnZlci9pbnZpdGUvS2V5SW52aXRhdGlvbk1ldGhvZCc7XHJcbmltcG9ydCB7IExvYmJ5UGlwZWxpbmUgfSBmcm9tICdzZWVkZW5naW5lLnNlcnZlci9sb2JieS9Mb2JieVBpcGVsaW5lJztcclxuaW1wb3J0IHsgVm90ZUxvYmJ5TW9kdWxlIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvbG9iYnkvVm90ZUxvYmJ5TW9kdWxlJztcclxuaW1wb3J0IHsgRGVmYXVsdENvbnNvbGVMb2dnZXIsIExvZyB9IGZyb20gJ3NlZWRlbmdpbmUuc2VydmVyL2xvZy9Mb2dnZXInO1xyXG5pbXBvcnQgeyBpbml0aWFsaXplTG9nZ2VyIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvbG9nL0xvZ2dlclNjb3Blcyc7XHJcbmltcG9ydCB7IERlZmF1bHRTZXNzaW9uTWFuYWdlciB9IGZyb20gJ3NlZWRlbmdpbmUuc2VydmVyL3Nlc3Npb24vRGVmYXVsdFNlc3Npb25NYW5hZ2VyJztcclxuaW1wb3J0IHsgU2Vzc2lvblBpcGVsaW5lIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvc2Vzc2lvbi9TZXNzaW9uUGlwZWxpbmUnO1xyXG5pbXBvcnQgeyBFeHByZXNzRmFjYWRlRmFjdG9yeSB9IGZyb20gJ3NlZWRlbmdpbmUuc2VydmVyL3RyYW5zcG9ydC9IdHRwRmFjYWRlJztcclxuaW1wb3J0IHsgTWVzc2FnZUhhbmRsZXIgfSBmcm9tICdzZWVkZW5naW5lLnNlcnZlci90cmFuc3BvcnQvTWVzc2FnZVBpcGVsaW5lJztcclxuaW1wb3J0IHsgbWFrZVJlZ3VsYXJIYW5kbGVyIH0gZnJvbSAnc2VlZGVuZ2luZS5zZXJ2ZXIvdHJhbnNwb3J0L1NwZWNpZmljTWVzc2FnZVR5cGVIYW5kbGVyJztcclxuaW1wb3J0IHsgSW5NZW1vcnlVc2VyU3RvcmFnZSB9IGZyb20gJ3NlZWRlbmdpbmUuc2VydmVyL3VzZXJzL0luTWVtb3J5VXNlclN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBTaW1wbGVJZGVudGl0eSB9IGZyb20gJ3NlZWRlbmdpbmUuc2VydmVyL3VzZXJzL1NpbXBsZUlkZW50aXR5JztcclxuaW1wb3J0IHsgTWluZXJHYW1lRmFjdG9yeSB9IGZyb20gJy4vTWluZXJHYW1lRmFjdG9yeSc7XHJcblxyXG5mdW5jdGlvbiBidWlsZE1pbmVyU2VydmVyKCk6IEluc3RhbmNlIHtcclxuXHJcbiAgICBpbml0aWFsaXplTG9nZ2VyKG5ldyBMb2coW25ldyBEZWZhdWx0Q29uc29sZUxvZ2dlcigpXSkpO1xyXG5cclxuICAgIGNvbnN0IGJvb3RzdHJhcHBlciA9IG5ldyBCb290c3RyYXBwZXIoKTtcclxuICAgIGJvb3RzdHJhcHBlclxyXG4gICAgICAgIC53aXRoSHR0cEZhY2FkZShuZXcgRXhwcmVzc0ZhY2FkZUZhY3RvcnkoKSlcclxuICAgICAgICAud2l0aEF1dGhNZXRob2QobmV3IFNpbXBsZUlkZW50aXR5LlNpbXBsZUF1dGhNb2R1bGUoKSlcclxuICAgICAgICAud2l0aFN0b3JhZ2UoU2ltcGxlSWRlbnRpdHkuV2l0aFN1cGVyVXNlcihuZXcgSW5NZW1vcnlVc2VyU3RvcmFnZSgpKSlcclxuICAgICAgICAuYWRkKF8gPT4gY3JlYXRlU2Vzc2lvblJlbGF0ZWRIYW5kbGVycyhfKSlcclxuICAgICAgICAuYWRkKF8gPT4gY3JlYXRlR3JvdXBzSGFuZGxlcihfKSlcclxuICAgICAgICAuYWRkKF8gPT4gY3JlYXRlQ2hhdEhhbmRsZXIoXykpXHJcbiAgICAgICAgLndpdGhHYW1lKG5ldyBNaW5lckdhbWVGYWN0b3J5KCkpO1xyXG5cclxuICAgIHJldHVybiBib290c3RyYXBwZXIuYnVpbGQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVHcm91cHNIYW5kbGVyKF86IENvcmVEZXBlbmRlbmNpZXMpOiBNZXNzYWdlSGFuZGxlcltdIHtcclxuICAgICAgICBjb25zdCBncm91cEhhbmRsZXIgPSBtYWtlUmVndWxhckhhbmRsZXIobmV3IEdyb3VwUGlwZWxpbmUoXy5ncm91cHMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtncm91cEhhbmRsZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNoYXRIYW5kbGVyKF86IENvcmVEZXBlbmRlbmNpZXMpOiBNZXNzYWdlSGFuZGxlcltdIHtcclxuICAgICAgICBjb25zdCBjaGF0TWFuYWdlciA9IG5ldyBDaGF0TWFuYWdlcihfLm1lc3NhZ2VTZW5kZXIpO1xyXG4gICAgICAgIGNvbnN0IGNoYXRIYW5kbGVyID0gbWFrZVJlZ3VsYXJIYW5kbGVyKG5ldyBDaGF0UGlwZWxpbmUoY2hhdE1hbmFnZXIsIF8udXNlcnMsIF8uZ3JvdXBzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBbY2hhdEhhbmRsZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlc3Npb25SZWxhdGVkSGFuZGxlcnMoXzogQ29yZURlcGVuZGVuY2llcyk6IE1lc3NhZ2VIYW5kbGVyW10ge1xyXG4gICAgICAgIGNvbnN0IHNlc3Npb25NYW5hZ2VyID0gbmV3IERlZmF1bHRTZXNzaW9uTWFuYWdlcih7IGFsbG93Sm9pbkFmdGVyU2Vzc2lvblN0YXJ0OiBmYWxzZSB9LCBfLm1lc3NhZ2VTZW5kZXIsIF8uZ3JvdXBzLCBfLmdhbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBzZXNzaW9uUGlwZWxpbmUgPSBtYWtlUmVndWxhckhhbmRsZXIobmV3IFNlc3Npb25QaXBlbGluZShzZXNzaW9uTWFuYWdlcikpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2JieU1vZHVsZSA9IG5ldyBWb3RlTG9iYnlNb2R1bGUoKTtcclxuICAgICAgICBjb25zdCBsb2JieVBpcGVsaW5lID0gbWFrZVJlZ3VsYXJIYW5kbGVyKG5ldyBMb2JieVBpcGVsaW5lKGxvYmJ5TW9kdWxlLCBzZXNzaW9uTWFuYWdlcikpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZpdGVzTWFuYWdlciA9IG5ldyBJbnZpdGF0aW9uTWFuYWdlcihzZXNzaW9uTWFuYWdlcik7XHJcbiAgICAgICAgY29uc3QgaW52aXRlTWV0aG9kID0gbmV3IEtleUludml0YXRpb25NZXRob2QoaW52aXRlc01hbmFnZXIpO1xyXG4gICAgICAgIGNvbnN0IGludml0ZXNQaXBlbGluZSA9IG1ha2VSZWd1bGFySGFuZGxlcihuZXcgSW52aXRlc1BpcGVsaW5lKFtpbnZpdGVNZXRob2RdLCBpbnZpdGVzTWFuYWdlcikpO1xyXG5cclxuICAgICAgICByZXR1cm4gW3Nlc3Npb25QaXBlbGluZSwgbG9iYnlQaXBlbGluZSwgaW52aXRlc1BpcGVsaW5lXTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2UgPSBidWlsZE1pbmVyU2VydmVyKCk7XHJcbmluc3RhbmNlLnN0YXJ0KCk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvY2hhdC9DaGF0TWFuYWdlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9jaGF0L0NoYXRQaXBlbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9jb3JlL0Jvb3RzdHJhcHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9ncm91cHMvR3JvdXBQaXBlbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9pbnZpdGUvSW52aXRhdGlvbk1hbmFnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvaW52aXRlL0ludml0ZXNQaXBlbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9pbnZpdGUvS2V5SW52aXRhdGlvbk1ldGhvZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9sb2JieS9Mb2JieVBpcGVsaW5lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlZWRlbmdpbmUuc2VydmVyL2xvYmJ5L1ZvdGVMb2JieU1vZHVsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWVkZW5naW5lLnNlcnZlci9sb2cvTG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlZWRlbmdpbmUuc2VydmVyL2xvZy9Mb2dnZXJTY29wZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvc2Vzc2lvbi9EZWZhdWx0U2Vzc2lvbk1hbmFnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvc2Vzc2lvbi9TZXNzaW9uUGlwZWxpbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvdHJhbnNwb3J0L0h0dHBGYWNhZGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvdHJhbnNwb3J0L1NwZWNpZmljTWVzc2FnZVR5cGVIYW5kbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlZWRlbmdpbmUuc2VydmVyL3VzZXJzL0luTWVtb3J5VXNlclN0b3JhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VlZGVuZ2luZS5zZXJ2ZXIvdXNlcnMvU2ltcGxlSWRlbnRpdHlcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==