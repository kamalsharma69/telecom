-- Insert demo plans
INSERT INTO plans (name, price, data, calls, sms, validity, description, is_active, created_at, updated_at) VALUES
('Basic Plan', 29.99, '5GB', 'Unlimited', '100', '30 days', 'Perfect for light users', true, NOW(), NOW()),
('Premium Plan', 49.99, '15GB', 'Unlimited', 'Unlimited', '30 days', 'Best for regular users', true, NOW(), NOW()),
('Enterprise Plan', 99.99, 'Unlimited', 'Unlimited', 'Unlimited', '30 days', 'For heavy data users', true, NOW(), NOW());
