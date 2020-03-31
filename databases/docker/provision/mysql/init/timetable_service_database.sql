CREATE USER 'timetable_service'@'%' IDENTIFIED BY 'timetable_service_password';
CREATE DATABASE IF NOT EXISTS `timetable_service`;
GRANT ALL PRIVILEGES ON timetable_service.* TO `timetable_service`@`%`;
