import { Role } from "@/entities/user/model";
import { DBTable, supabase } from "@/shared/api/supabaseClient";
import log from "@/shared/log";
import { Board } from "../model";
import { useBoardStore } from "../store";

const getCurrentTimestamp = () => new Date().toISOString();

export async function fetchOrCreateBoard(
  userId: string,
  boardId?: string,
  boardName?: string
): Promise<Board> {
  if (boardId && boardName) {
    useBoardStore.setState({ id: boardId, name: boardName });
    log.info(`🔄 START TO GET: boardId=${boardId}, boardName=${boardName}`);

    const board = await fetchBoardById(boardId);

    if (board) {
      log.info(`✅📋 Board fetched successfully: ${board.id}`);
      useBoardStore.getState().updateBoard(board);
      return board;
    } else {
      log.info("🚑 Board not found, creating a new board.");
    }
  }

  return await createBoard(userId);
}

async function createBoard(userId: string): Promise<Board> {
  const now = getCurrentTimestamp();
  const { id, name, transform } = useBoardStore.getState();

  if (id) {
    log.info(`✅📋 Board already exists in storage: ${id}`);
    return { id, name, transform };
  }

  const { data: boardData, error: boardError } = await supabase
    .from(DBTable.Board)
    .insert([{ name, transform, created_at: now }])
    .select()
    .single();

  if (boardError && boardError.code !== "PGRST116") {
    throw new Error(`🚑 createBoard Error: ${boardError.message}`);
  }

  useBoardStore.getState().updateBoard(boardData);
  log.info(`✅📋 New Board created: ${boardData.id}`);

  const { error: junctionError } = await supabase
    .from(DBTable.User_Board)
    .insert({
      user_id: userId,
      board_id: boardData.id,
      role: Role.Owner,
      created_at: now,
    });

  if (junctionError) {
    throw new Error(`🚑 createBoard Error: ${junctionError.message}`);
  }

  return boardData;
}

async function fetchBoardById(boardId: string): Promise<Board> {
  const { data, error } = await supabase
    .from(DBTable.Board)
    .select("id, name, transform")
    .eq("id", boardId)
    .single();

  if (error) {
    throw new Error(`🚑 fetchBoardById Error: ${error.message}`);
  }

  log.info(`✅📋 Board fetched by ID: ${JSON.stringify(data)}`);

  return data;
}

export async function updateBoard(boardId: string, board: Partial<Board>) {
  const { data, error } = await supabase
    .from(DBTable.Board)
    .update({ ...board, updated_at: getCurrentTimestamp() })
    .eq("id", boardId)
    .select("id, name, transform")
    .single();

  if (error) {
    throw new Error(`🚑 updateBoard Error: ${error.message}`);
  }

  log.info(`✅📋 Board updated: ${JSON.stringify(data)}`);

  return data;
}

export async function fetchBoardsByUserId(
  userId: string
): Promise<Record<string, string>[]> {
  const { data, error } = await supabase
    .from(DBTable.User_Board)
    .select("board (id, name)")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`🚑 fetchBoardsByUserId Error: ${error.message}`);
  }

  log.info(`✅📋 Boards fetched for userId=${userId}: ${JSON.stringify(data)}`);

  return data.flatMap((entry) => entry.board);
}
