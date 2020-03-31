CREATE USER 'user_service'@'%' IDENTIFIED BY 'user_service_password';
CREATE DATABASE IF NOT EXISTS `user_service`;
GRANT ALL PRIVILEGES ON user_service.* TO `user_service`@`%`;
