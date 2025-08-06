-- Insert demo users
INSERT INTO users (full_name, email, password, role, phone_number, address, is_active, created_at, updated_at) VALUES
('Admin User', 'admin@telecom.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN', '+1 (555) 000-0001', '123 Admin St, Admin City', true, NOW(), NOW()),
('Customer User', 'customer@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'CUSTOMER', '+1 (555) 000-0002', '456 Customer Ave, Customer Town', true, NOW(), NOW());

-- Password for both users is 'secret'
