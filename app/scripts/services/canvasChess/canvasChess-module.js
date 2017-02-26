import AppModule from '../../../app-module.js';
import BoardService from './board.js';
import GameService from './game.js';
import PieceService from './piece.js';
import PlayerService from './player.js';

AppModule.factory('boardService', BoardService)
   .factory('pieceService', PieceService)
   .factory('gameService', GameService)
   .factory('playerService', PlayerService);
   
