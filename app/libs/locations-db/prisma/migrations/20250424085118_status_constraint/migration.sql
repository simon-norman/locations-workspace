CREATE UNIQUE INDEX unique_active_pending_session_per_location 
ON charging_sessions (location_id) 
WHERE status IN ('ACTIVE', 'PENDING');