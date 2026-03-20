import { Component } from '@angular/core';
type Player = 'A' | 'B' | null;
@Component({
  selector: 'app-fanorona',
  standalone:true,
  imports: [],
  templateUrl: './fanorona.html',
  styleUrl: './fanorona.css',
})
export class Fanorona {

  rows = 5;
  cols = 9;

  board: Player[][] = [];
  currentPlayer: Player = 'A';

  selected: {r:number,c:number} | null = null;
  winner: Player = null;

  constructor(){
    this.resetGame();
  }

  resetGame(){

    this.board = [];

    for(let r=0;r<this.rows;r++){

      const row: Player[] = [];

      for(let c=0;c<this.cols;c++){

        if(r < 2) row.push('A');
        else if(r > 2) row.push('B');
        else{
          if(c < 4) row.push('A');
          else if(c > 4) row.push('B');
          else row.push(null);
        }

      }

      this.board.push(row);

    }

    this.currentPlayer = 'A';
    this.selected = null;
    this.winner = null;

  }

select(r:number,c:number){

  if(this.winner) return;

  const piece = this.board[r][c];

  if(this.selected){

    const sr = this.selected.r;
    const sc = this.selected.c;

    if(this.isValidMove(sr,sc,r,c)){

      this.board[r][c] = this.board[sr][sc];
      this.board[sr][sc] = null;

      this.capture(sr,sc,r,c);

      this.selected = null;

      this.checkWinner();

      this.currentPlayer = this.currentPlayer === 'A' ? 'B' : 'A';

      // 🔴 IMPORTANT : force Angular à rafraîchir le tableau
      this.board = [...this.board];

    }else{
      this.selected = null;
    }

  }else{

    if(piece === this.currentPlayer){
      this.selected = {r,c};
    }

  }

}

  isValidMove(sr:number,sc:number,r:number,c:number){

    if(this.board[r][c] !== null) return false;

    const dr = Math.abs(r-sr);
    const dc = Math.abs(c-sc);

    return dr<=1 && dc<=1;

  }

  capture(sr:number,sc:number,r:number,c:number){

    const dr = r-sr;
    const dc = c-sc;

    const enemy = this.currentPlayer === 'A' ? 'B' : 'A';

    let nr = r+dr;
    let nc = c+dc;

    while(
      nr>=0 && nr<this.rows &&
      nc>=0 && nc<this.cols &&
      this.board[nr][nc] === enemy
    ){
      this.board[nr][nc] = null;
      nr += dr;
      nc += dc;
    }

  }

  checkWinner(){

    let countA = 0;
    let countB = 0;

    for(let r of this.board){
      for(let c of r){
        if(c==='A') countA++;
        if(c==='B') countB++;
      }
    }

    if(countA === 0) this.winner = 'B';
    if(countB === 0) this.winner = 'A';

  }
}
