import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ifsfkuydecwtwmkjnidx.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmc2ZrdXlkZWN3dHdta2puaWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODg5NDAsImV4cCI6MjA3Nzk2NDk0MH0.D5vv3In2Mnr-gYl0CfjW31tec4WreN1fZOERmQFLrLA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
