// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zxxivxngsdwvxkzxunmr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eGl2eG5nc2R3dnhrenh1bm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMDcyMjQsImV4cCI6MjA5NzU4MzIyNH0.q8JrxxM4jY7owTnX_fjdTY5jhtdX4Vcin_7qgJ8Xi6I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
