-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 31, 2021 at 03:12 PM
-- Server version: 8.0.24
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `idadmin` int NOT NULL,
  `full_name` varchar(64) DEFAULT NULL,
  `username` varchar(32) DEFAULT NULL,
  `pwd_hash` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`idadmin`, `full_name`, `username`, `pwd_hash`) VALUES
(1, 'Alessandro Lorenzini', 'alessandro.lorenzini', '1a1dc91c907325c69271ddf0c944bc72'),
(2, 'Albus Percival Silente', 'albus.silente', '1a1dc91c907325c69271ddf0c944bc72');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `iddevice` int NOT NULL,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pwd_hash` varchar(32) DEFAULT NULL,
  `codroom` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`iddevice`, `username`, `pwd_hash`, `codroom`) VALUES
(1, 'rpi-1', 'b89749505e144b564adfe3ea8fc394aa', 2);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `idevent` int NOT NULL,
  `day` date DEFAULT NULL,
  `spots` int DEFAULT NULL,
  `difficulty` text NOT NULL,
  `codtemplate` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`idevent`, `day`, `spots`, `difficulty`, `codtemplate`) VALUES
(1, '2021-05-28', 30, 'Medium', 1),
(3, '2021-05-29', 15, 'Easy', 1),
(4, '2021-05-30', 20, 'Expert', 1),
(5, '2021-05-30', 35, 'Easy', 2),
(6, '2021-05-31', 30, 'Easy', 2),
(7, '2021-06-11', 15, 'Medium', 1),
(8, '2021-06-12', 45, 'Easy', 2);

-- --------------------------------------------------------

--
-- Table structure for table `event_lessons`
--

CREATE TABLE `event_lessons` (
  `idlesson` int NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_finish` time DEFAULT NULL,
  `is_break` tinyint(1) DEFAULT NULL,
  `codroom` int DEFAULT NULL,
  `codteacher` int DEFAULT NULL,
  `codtrack` int DEFAULT NULL,
  `codtemplate` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_lessons`
--

INSERT INTO `event_lessons` (`idlesson`, `name`, `time_start`, `time_finish`, `is_break`, `codroom`, `codteacher`, `codtrack`, `codtemplate`) VALUES
(1, 'Introduction to excel', '00:00:00', '12:00:00', 0, 1, 1, 1, 1),
(2, 'Word tricks & tips', '00:00:00', '12:00:00', 0, 2, 2, 2, 1),
(3, 'Introduction to PowerPoint', '00:00:00', '12:00:00', 0, 3, 3, 3, 1),
(4, 'Lunch Break', '12:00:00', '14:00:00', 1, 5, NULL, NULL, 1),
(5, 'Excel workshop', '14:00:00', '23:59:59', 0, 2, 2, 1, 1),
(6, 'J.K. Rowling talks', '14:00:00', '23:59:59', 0, 3, 3, 2, 1),
(7, 'Presentations competition', '14:00:00', '23:59:59', 0, 4, 1, 3, 1),
(8, 'Introduction to OneNote', '08:00:00', '10:00:00', 0, 1, 1, 4, 2),
(9, 'Organizing your notes', '10:00:00', '12:00:00', 0, 4, 2, 4, 2),
(10, 'Lunch Break', '12:00:00', '14:00:00', 1, 5, NULL, NULL, 2),
(11, 'Collaboration and notes sharing', '14:00:00', '16:00:00', 0, 3, 3, 4, 2),
(12, 'OneNote Workshop', '16:00:00', '19:00:00', 0, 2, 4, 4, 2),
(13, 'Introduction to Word', '08:00:00', '10:00:00', 0, 2, 2, 2, 2),
(14, 'How to write a thesis', '10:00:00', '12:00:00', 0, 1, 3, 2, 2),
(15, 'Real-time collaboration', '14:00:00', '16:00:00', 0, 4, 4, 2, 2),
(16, 'Word Workshop', '16:00:00', '19:00:00', 0, 3, 1, 2, 2),
(17, 'Introduction to PowerPoint', '08:00:00', '10:00:00', 0, 3, 3, 3, 2),
(18, 'Use PowerPoint at school', '10:00:00', '12:00:00', 0, 2, 4, 3, 2),
(19, 'Presentation design principles', '14:00:00', '16:00:00', 0, 1, 1, 3, 2),
(20, 'PowerPoint Competition', '16:00:00', '19:00:00', 0, 4, 2, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `event_templates`
--

CREATE TABLE `event_templates` (
  `idtemplate` int NOT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_templates`
--

INSERT INTO `event_templates` (`idtemplate`, `name`) VALUES
(1, 'Office at work'),
(2, 'Office for students');

-- --------------------------------------------------------

--
-- Table structure for table `event_tracks`
--

CREATE TABLE `event_tracks` (
  `idtrack` int NOT NULL,
  `name` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_tracks`
--

INSERT INTO `event_tracks` (`idtrack`, `name`) VALUES
(1, 'Excel'),
(2, 'Word'),
(3, 'PowerPoint'),
(4, 'OneNote');

-- --------------------------------------------------------

--
-- Table structure for table `login_types`
--

CREATE TABLE `login_types` (
  `id` int NOT NULL,
  `type` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login_types`
--

INSERT INTO `login_types` (`id`, `type`) VALUES
(1, 'standard'),
(2, 'google');

-- --------------------------------------------------------

--
-- Table structure for table `nfc_tags`
--

CREATE TABLE `nfc_tags` (
  `idnfc` int NOT NULL,
  `number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nfc_tags`
--

INSERT INTO `nfc_tags` (`idnfc`, `number`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `idparticipant` int NOT NULL,
  `codevent` int DEFAULT NULL,
  `codstudent` int DEFAULT NULL,
  `codnfc` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`idparticipant`, `codevent`, `codstudent`, `codnfc`) VALUES
(1, 1, 2, 1),
(3, 1, 1, NULL),
(4, 1, 4, NULL),
(5, 1, 5, NULL),
(46, 3, 16, 6),
(48, 3, 1, 5),
(50, 4, 1, 1),
(53, 6, 16, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `participant_lessons`
--

CREATE TABLE `participant_lessons` (
  `idpartlesson` int NOT NULL,
  `codparticipant` int DEFAULT NULL,
  `codlesson` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `participant_movements`
--

CREATE TABLE `participant_movements` (
  `idmove` int NOT NULL,
  `time` time DEFAULT NULL,
  `direction` tinyint(1) DEFAULT NULL,
  `codparticipant` int DEFAULT NULL,
  `codlesson` int DEFAULT NULL,
  `codroom` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `idroom` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `codroomtype` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`idroom`, `name`, `codroomtype`) VALUES
(1, 'A1', 1),
(2, 'A2', 1),
(3, 'B1', 1),
(4, 'B2', 1),
(5, 'Restaurant', 2),
(6, 'Terrace', 2);

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `idroomtype` int NOT NULL,
  `type` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`idroomtype`, `type`) VALUES
(1, 'meeting'),
(2, 'service');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `idstudent` int NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `full_name` varchar(64) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `pwd_hash` varchar(32) DEFAULT NULL,
  `login_type` int DEFAULT NULL,
  `login_id` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`idstudent`, `username`, `full_name`, `email`, `birth`, `pwd_hash`, `login_type`, `login_id`) VALUES
(1, 'rebecca.geninatti', 'Rebecca Geninatti', 'rebecca.geninatti@gmail.com', '2002-04-06', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL),
(2, 'samuele.allegranza', 'Samuele Allegranza', 'samuele.allegranza@gmail.com', '2002-02-03', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL),
(4, 'giacomo.sacco', 'Giacomo Sacco', 'giacomo.sacco@gmail.com', '2002-05-12', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL),
(5, 'alessandro.bertona', 'Alessandro Bertona', 'alessandro.bertona@gmail.com', '2002-05-06', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL),
(6, 'gallo.francesco', 'Gallo Francesco', 'gallo.francesco@gmail.com', '2002-05-03', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL),
(7, 'eleonora.geninatti', 'Eleonora Geninatti Togli', 'eleonora.geninatti@gmail.com', '2003-05-22', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL),
(16, 'harry.potter', 'Harry Potter', 'harry.potter@gmail.com', '2002-04-03', '1a1dc91c907325c69271ddf0c944bc72', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `idteacher` int NOT NULL,
  `full_name` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`idteacher`, `full_name`, `email`) VALUES
(1, 'Elon Musk', 'elon.musk@gmail.com'),
(2, 'Taran Fletcher', 'taran.fletcher@gmail.com'),
(3, 'Cooper Orr', 'cooper.orr@gmail.com'),
(4, 'Jax Paul', 'jax.paul@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`idadmin`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`iddevice`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`idevent`),
  ADD KEY `codtemplate` (`codtemplate`);

--
-- Indexes for table `event_lessons`
--
ALTER TABLE `event_lessons`
  ADD PRIMARY KEY (`idlesson`),
  ADD KEY `codroom` (`codroom`),
  ADD KEY `codteacher` (`codteacher`),
  ADD KEY `codtemplate` (`codtemplate`),
  ADD KEY `codtrack` (`codtrack`);

--
-- Indexes for table `event_templates`
--
ALTER TABLE `event_templates`
  ADD PRIMARY KEY (`idtemplate`);

--
-- Indexes for table `event_tracks`
--
ALTER TABLE `event_tracks`
  ADD PRIMARY KEY (`idtrack`);

--
-- Indexes for table `login_types`
--
ALTER TABLE `login_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nfc_tags`
--
ALTER TABLE `nfc_tags`
  ADD PRIMARY KEY (`idnfc`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`idparticipant`),
  ADD KEY `codevent` (`codevent`),
  ADD KEY `codstudent` (`codstudent`),
  ADD KEY `codnfc` (`codnfc`);

--
-- Indexes for table `participant_lessons`
--
ALTER TABLE `participant_lessons`
  ADD PRIMARY KEY (`idpartlesson`),
  ADD KEY `codparticipant` (`codparticipant`),
  ADD KEY `codlesson` (`codlesson`);

--
-- Indexes for table `participant_movements`
--
ALTER TABLE `participant_movements`
  ADD PRIMARY KEY (`idmove`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`idroom`),
  ADD KEY `codroomtype` (`codroomtype`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`idroomtype`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`idstudent`),
  ADD UNIQUE KEY `username` (`username`,`email`,`login_id`),
  ADD KEY `login_type` (`login_type`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`idteacher`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `idadmin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `iddevice` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `idevent` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `event_lessons`
--
ALTER TABLE `event_lessons`
  MODIFY `idlesson` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `event_templates`
--
ALTER TABLE `event_templates`
  MODIFY `idtemplate` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_tracks`
--
ALTER TABLE `event_tracks`
  MODIFY `idtrack` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `nfc_tags`
--
ALTER TABLE `nfc_tags`
  MODIFY `idnfc` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `idparticipant` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `participant_lessons`
--
ALTER TABLE `participant_lessons`
  MODIFY `idpartlesson` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participant_movements`
--
ALTER TABLE `participant_movements`
  MODIFY `idmove` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `idroom` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `idroomtype` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `idstudent` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `idteacher` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`codtemplate`) REFERENCES `event_templates` (`idtemplate`);

--
-- Constraints for table `event_lessons`
--
ALTER TABLE `event_lessons`
  ADD CONSTRAINT `event_lessons_ibfk_1` FOREIGN KEY (`codroom`) REFERENCES `rooms` (`idroom`),
  ADD CONSTRAINT `event_lessons_ibfk_2` FOREIGN KEY (`codteacher`) REFERENCES `teachers` (`idteacher`),
  ADD CONSTRAINT `event_lessons_ibfk_3` FOREIGN KEY (`codtemplate`) REFERENCES `event_templates` (`idtemplate`),
  ADD CONSTRAINT `event_lessons_ibfk_4` FOREIGN KEY (`codtrack`) REFERENCES `event_tracks` (`idtrack`);

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`codevent`) REFERENCES `events` (`idevent`),
  ADD CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`codstudent`) REFERENCES `students` (`idstudent`),
  ADD CONSTRAINT `participants_ibfk_3` FOREIGN KEY (`codnfc`) REFERENCES `nfc_tags` (`idnfc`);

--
-- Constraints for table `participant_lessons`
--
ALTER TABLE `participant_lessons`
  ADD CONSTRAINT `participant_lessons_ibfk_1` FOREIGN KEY (`codparticipant`) REFERENCES `participants` (`idparticipant`),
  ADD CONSTRAINT `participant_lessons_ibfk_2` FOREIGN KEY (`codlesson`) REFERENCES `event_lessons` (`idlesson`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`codroomtype`) REFERENCES `room_types` (`idroomtype`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`login_type`) REFERENCES `login_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
