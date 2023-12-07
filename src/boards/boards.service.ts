/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board-entity';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) { }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto)
  }

  async getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id)
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)

    board.status = status;
    await this.boardRepository.save(board)
    return board
  }

  async getAllBoards(): Promise<Board[]> {
    const result = await this.boardRepository.find()
    return result
  }
}
