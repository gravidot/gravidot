import { DBTable, supabase } from "@/shared/api/supabaseClient";
import log from "@/shared/log";
import { GravidotActiveUser } from "../model";
import { useUserStore } from "../store";

const now = new Date().toISOString();

export async function createUser(): Promise<GravidotActiveUser> {
  const user = await initializeUser();

  const { data: existingUser, error: readExistedUserError } = await supabase
    .from(DBTable.GravidotUser)
    .select("*")
    .eq("uid", user.uid)
    .maybeSingle();

  // "PGRST116" code means the result contains 0 rows when using .maybeSingle()
  if (readExistedUserError && readExistedUserError.code !== "PGRST116") {
    throw new Error(`🚑 createUser 🗯️ ${readExistedUserError.message}`);
  }

  if (existingUser) {
    log.info(`✅😃 existingUser 🗯️`, existingUser);
    return existingUser;
  }

  const { data: newUser, error: createNewUserError } = await supabase
    .from(DBTable.GravidotUser)
    .insert([{ uid: user.uid, name: user.name, created_at: now }])
    .select()
    .maybeSingle();

  if (createNewUserError) {
    throw new Error(`🚑 createUser 🗯️ ${createNewUserError.message}`);
  }

  if (!newUser) {
    throw new Error(`🚑 createUser 🗯️ ${newUser}`);
  }

  log.info(`✅😃 createUser 🗯️`, newUser);
  return newUser;
}

async function initializeUser(): Promise<GravidotActiveUser> {
  const initialUser = useUserStore.getState();

  if (initialUser.uid) {
    log.info(`✅😃 Reusing anonymous user: `, initialUser);
    return initialUser;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signInAnonymously();

  if (error || !user) {
    throw new Error(`🚑 Anonymous sign-in failed 🗯️ error: ${error}`);
  }

  useUserStore.setState({ uid: user.id, is_anonymous: user.is_anonymous });

  return useUserStore.getState();
}

export async function fetchUserById(userId: string) {
  const { data, error } = await supabase
    .from(DBTable.GravidotUser)
    .select("*")
    .eq("uid", userId)
    .single();

  if (error) {
    throw new Error(`🚑 fetchUserById 🗯️ ${error.message}`);
  }

  log.info(`✅😃 fetchUserById 🗯️`, data);

  return data;
}
