// import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// if (!supabaseUrl || !supabaseServiceRoleKey) {
//   throw new Error("Supabase environment variables are missing");
// }

// export const supabase = createClient(
//   supabaseUrl,
//   supabaseServiceRoleKey
// );
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

console.log("SUPABASE_URL exists:", !!supabaseUrl);
console.log("SUPABASE_SECRET_KEY exists:", !!supabaseSecretKey);

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error("Supabase environment variables are missing");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey
);