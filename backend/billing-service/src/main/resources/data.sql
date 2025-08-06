-- Insert demo bills
INSERT INTO bills (user_id, month, amount, status, due_date, paid_date, plan_name, data_usage, created_at) VALUES
(2, 'January 2024', 49.99, 'Paid', '2024-01-31', '2024-01-25', 'Premium Plan', '12.5GB', NOW()),
(2, 'December 2023', 49.99, 'Paid', '2023-12-31', '2023-12-28', 'Premium Plan', '14.8GB', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(2, 'November 2023', 29.99, 'Paid', '2023-11-30', '2023-11-22', 'Basic Plan', '4.2GB', DATE_SUB(NOW(), INTERVAL 60 DAY));
