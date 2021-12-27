--Tables Created for !-CLONE Database

1. -- User Names Table
CREATE TABLE `User_Name` (
  `U_Id` int(11) DEFAULT NULL,
  `User_Name` varchar(20) NOT NULL,
  `F_Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`User_Name`),
  KEY `U_Id` (`U_Id`),
  CONSTRAINT `user_name_ibfk_1` FOREIGN KEY (`U_Id`) REFERENCES `user_details` (`U_Id`)
)

2.--User Details Table
CREATE TABLE `user_details` (
  `U_Id` int(11) NOT NULL,
  `U_Name` varchar(20) DEFAULT NULL,
  `F_Name` varchar(20) DEFAULT NULL,
  `L_Name` varchar(20) DEFAULT NULL,
  `Email_Id` varchar(30) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `P_pic` blob,
  `D_O_B` date DEFAULT NULL,
  `D_O_Creation` date DEFAULT NULL,
  `Bio` text,
  PRIMARY KEY (`U_Id`),
  UNIQUE KEY `U_Id` (`U_Id`)
)

3.-- Friends Table
CREATE TABLE `friends` (
  `U_Id` int(11) DEFAULT NULL,
  `Friend_Id` int(11) NOT NULL,
  `Friends_Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Friend_Id`),
  KEY `U_Id` (`U_Id`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`U_Id`) REFERENCES `User_Details` (`U_Id`)
)

4.--Photo Details Table
CREATE TABLE `photos` (
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `U_Id` int(11) DEFAULT NULL,
  `Caption` text,
  `Location` varchar(30) DEFAULT NULL,
  `Photo_Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `U_Id` (`U_Id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`U_Id`) REFERENCES `User_Details` (`U_Id`)
)

5.-- Photo Creation Date Table
CREATE TABLE `Photo_Cre_date` (
  `photo_id` int(11) DEFAULT NULL,
  `Date_of_Cre` datetime DEFAULT CURRENT_TIMESTAMP
)

6.--Likes Table 
 CREATE TABLE `likes` (
  `U_Id` int(11) DEFAULT NULL,
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `Likes` int(11) DEFAULT NULL,
  KEY `U_Id` (`U_Id`),
  KEY `photo_id` (`photo_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`U_Id`) REFERENCES `User_Details` (`U_Id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`photo_id`)
)

7.--Comment Table
CREATE TABLE `comment` (
  `U_Id` int(11) DEFAULT NULL,
  `photo_id` int(11) DEFAULT NULL,
  `comment` text,
  `Time` time DEFAULT NULL,
  `C_Name` varchar(20) DEFAULT NULL
)

8.--Messages Table
CREATE TABLE `Messages` (
  `U_Id` int(11) NOT NULL,
  `U_Name` varchar(20) DEFAULT NULL,
  `Messages` text,
  `M_Id` int(11) NOT NULL,
  KEY `U_Id` (`U_Id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`U_Id`) REFERENCES `User_Details` (`U_Id`)
)


--Stored Procedure Creation
DELIMITER $$
CREATE PROCEDURE add_date_entry(IN id INT(11)) 
BEGIN 
    INSERT INTO `photo_cre_date`(`photo_id`) VALUE(id);
END$$

--Trigger Function For Inserting Date and Time
CREATE TRIGGER `main_trigger` 
AFTER INSERT 
ON `iclone`.`photos` 
FOR EACH ROW 
BEGIN 
    CALL add_date_entry(NEW.photo_id);
END$$
DELIMITER ;


1.User_Details;
+--------------+-------------+------+-----+---------+-------+
| Field        | Type        | Null | Key | Default | Extra |
+--------------+-------------+------+-----+---------+-------+
| U_Id         | int(11)     | NO   | PRI | NULL    |       |
| U_Name       | varchar(20) | YES  |     | NULL    |       |
| F_Name       | varchar(20) | YES  |     | NULL    |       |
| L_Name       | varchar(20) | YES  |     | NULL    |       |
| Email_Id     | varchar(30) | YES  |     | NULL    |       |
| Gender       | char(1)     | YES  |     | NULL    |       |
| P_pic        | blob        | YES  |     | NULL    |       |
| D_O_B        | date        | YES  |     | NULL    |       |
| D_O_Creation | date        | YES  |     | NULL    |       |
| Bio          | text        | YES  |     | NULL    |       |
+--------------+-------------+------+-----+---------+-------+

2.User_Name;
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| U_Id      | int(11)     | YES  | MUL | NULL    |       |
| User_Name | varchar(20) | NO   | PRI | NULL    |       |
| F_Name    | varchar(20) | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+

3.Friends;
+--------------+-------------+------+-----+---------+-------+
| Field        | Type        | Null | Key | Default | Extra |
+--------------+-------------+------+-----+---------+-------+
| U_Id         | int(11)     | YES  | MUL | NULL    |       |
| Friend_Id    | int(11)     | NO   | PRI | NULL    |       |
| Friends_Name | varchar(20) | YES  |     | NULL    |       |
+--------------+-------------+------+-----+---------+-------+

4.photos;
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| photo_id   | int(11)     | NO   | PRI | NULL    | auto_increment |
| U_Id       | int(11)     | YES  | MUL | NULL    |                |
| Caption    | text        | YES  |     | NULL    |                |
| Location   | varchar(30) | YES  |     | NULL    |                |
| Photo_Name | varchar(20) | YES  |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+

5.Likes;
+----------+---------+------+-----+---------+----------------+
| Field    | Type    | Null | Key | Default | Extra          |
+----------+---------+------+-----+---------+----------------+
| U_Id     | int(11) | YES  | MUL | NULL    |                |
| photo_id | int(11) | NO   | MUL | NULL    | auto_increment |
| Likes    | int(11) | YES  |     | NULL    |                |
+----------+---------+------+-----+---------+----------------+

6.Comment;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| U_Id     | int(11)     | YES  |     | NULL    |       |
| photo_id | int(11)     | YES  |     | NULL    |       |
| comment  | text        | YES  |     | NULL    |       |
| Time     | time        | YES  |     | NULL    |       |
| C_Name   | varchar(20) | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+

7. Messages;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| U_Id     | int(11)     | NO   | MUL | NULL    |       |
| U_Name   | varchar(20) | YES  |     | NULL    |       |
| Messages | text        | YES  |     | NULL    |       |
| M_Id     | int(11)     | NO   |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
