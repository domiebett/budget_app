CREATE USER 'food_service'@'%' IDENTIFIED BY 'food_service_password';
CREATE DATABASE IF NOT EXISTS `food_service`;
GRANT ALL PRIVILEGES ON food_service.* TO `food_service`@`%`;
