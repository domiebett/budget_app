CREATE USER 'test'@'%' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS `test`;
GRANT ALL PRIVILEGES ON test.* TO `test`@`%`;
