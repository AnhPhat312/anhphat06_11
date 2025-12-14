import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zvuigscarozwevtvqoxm.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dWlnc2Nhcm96d2V2dHZxb3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODIyOTksImV4cCI6MjA3NzM1ODI5OX0.ZRiGKOvcLPgXT-G5v4eE2GakrHV17TRUbbRDsOxEpbE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
