CREATE DATABASE employee_tracker_db;

use employee_tracker_db;

CREATE TABLE `employee_tracker_db`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `employee_tracker_db`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `salary` DECIMAL(10,2) NOT NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `role_department_fk_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `role_department_fk`
    FOREIGN KEY (`department_id`)
    REFERENCES `employee_tracker_db`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `employee_tracker_db`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `role_id` INT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_role_fk_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `employee_role_fk`
    FOREIGN KEY (`role_id`)
    REFERENCES `employee_tracker_db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `employee_tracker_db`.`employee` 
ADD INDEX `employee_employee_fk_idx` (`manager_id` ASC) VISIBLE;

ALTER TABLE `employee_tracker_db`.`employee` 
ADD CONSTRAINT `employee_employee_fk`
  FOREIGN KEY (`manager_id`)
  REFERENCES `employee_tracker_db`.`employee` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
