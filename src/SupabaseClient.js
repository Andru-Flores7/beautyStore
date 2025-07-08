// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wqsitzxrxopugzdswflc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxc2l0enhyeG9wdWd6ZHN3ZmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTI5ODcsImV4cCI6MjA2NzQ4ODk4N30.8k20_ezTO3mbJ8CGzXp0QSMoI-PYygsV0nHbEpEt6Jg'
export const supabase = createClient(supabaseUrl, supabaseKey)
