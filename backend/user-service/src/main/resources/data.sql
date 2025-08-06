-- Insert demo users
INSERT INTO users (id, email, password, full_name, role, is_active, created_at, updated_at) VALUES 
(1, 'admin@telecom.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin User', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'customer@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Customer User', 'CUSTOMER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Passwords are encoded version of 'password123'
