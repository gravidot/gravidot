import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

export const enum DBTable {
  Board = "board",
  DotNode = "node",
  GravidotUser = "user",
  User_Board = "user_board",
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
