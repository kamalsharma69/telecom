-- Insert demo SIM cards
INSERT INTO sim_cards (number, status, user_id, plan_id, plan_name, data_used, data_total, activation_date, expiry_date, created_at, updated_at) VALUES
('+1 (555) 123-4567', 'ACTIVE', 2, 2, 'Premium Plan', '8.2GB', '15GB', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), NOW()),
('+1 (555) 987-6543', 'INACTIVE', 2, 1, 'Basic Plan', '0GB', '5GB', DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY), NOW(), NOW());

-- Insert demo SIM requests
INSERT INTO sim_requests (customer_name, email, phone_number, plan_id, plan_name, status, request_date, documents) VALUES
('John Doe', 'john.doe@email.com', '+1 (555) 000-1234', 2, 'Premium Plan', 'PENDING', NOW(), 'ID Card, Address Proof'),
('Jane Smith', 'jane.smith@email.com', '+1 (555) 000-5678', 1, 'Basic Plan', 'PENDING', DATE_SUB(NOW(), INTERVAL 1 DAY), 'ID Card, Address Proof'),
('Mike Johnson', 'mike.johnson@email.com', '+1 (555) 000-9012', 3, 'Enterprise Plan', 'APPROVED', DATE_SUB(NOW(), INTERVAL 2 DAY), 'ID Card, Address Proof, Business License');
