import { createClient } from '@supabase/supabase-js';

// Grab credentials from environment variables
const {
    REACT_APP_DATABASE_URL,
    REACT_APP_SUPABASE_SERVICE_API_KEY
} = process.env;

export const supabase = createClient(REACT_APP_DATABASE_URL, REACT_APP_SUPABASE_SERVICE_API_KEY)