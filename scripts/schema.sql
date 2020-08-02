DROP DATABASE IF EXISTS sounds_db;

CREATE DATABASE sounds_db;
USE sounds_db;

CREATE TABLE sounds
(
	id int NOT NULL AUTO_INCREMENT,
	beat varchar(255) NOT NULL,
    song_id INT,
	PRIMARY KEY (id)
);


