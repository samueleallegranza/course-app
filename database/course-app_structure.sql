-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 31, 2021 at 03:13 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `event_templates`
--

CREATE TABLE `event_templates` (
  `idtemplate` int NOT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_tracks`
--

CREATE TABLE `event_tracks` (
  `idtrack` int NOT NULL,
  `name` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_types`
--

CREATE TABLE `login_types` (
  `id` int NOT NULL,
  `type` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nfc_tags`
--

CREATE TABLE `nfc_tags` (
  `idnfc` int NOT NULL,
  `number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `idroomtype` int NOT NULL,
  `type` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  MODIFY `idadmin` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `iddevice` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `idevent` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_lessons`
--
ALTER TABLE `event_lessons`
  MODIFY `idlesson` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_templates`
--
ALTER TABLE `event_templates`
  MODIFY `idtemplate` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_tracks`
--
ALTER TABLE `event_tracks`
  MODIFY `idtrack` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nfc_tags`
--
ALTER TABLE `nfc_tags`
  MODIFY `idnfc` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `idparticipant` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participant_lessons`
--
ALTER TABLE `participant_lessons`
  MODIFY `idpartlesson` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participant_movements`
--
ALTER TABLE `participant_movements`
  MODIFY `idmove` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `idroom` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `idroomtype` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `idstudent` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `idteacher` int NOT NULL AUTO_INCREMENT;

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
