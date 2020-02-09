-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2020 at 07:35 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee-details`
--

CREATE TABLE `employee-details` (
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `start_date` text NOT NULL,
  `job_title` text NOT NULL,
  `type` text NOT NULL,
  `city` text NOT NULL,
  `designation` text NOT NULL,
  `team` text NOT NULL,
  `manager` text NOT NULL,
  `salary` varchar(250) NOT NULL,
  `salary_date` text NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee-details`
--

INSERT INTO `employee-details` (`fname`, `lname`, `start_date`, `job_title`, `type`, `city`, `designation`, `team`, `manager`, `salary`, `salary_date`, `uid`) VALUES
('Name  ', 'LName  ', 'Fri Feb 07 2020', 'Title  ', 'Full Timer', 'Mangalore', 'Manager', 'developer', 'Name  ', '5000000  ', 'Fri Mar 06 2020', 1);

-- --------------------------------------------------------

--
-- Table structure for table `leave_table`
--

CREATE TABLE `leave_table` (
  `days` int(11) NOT NULL,
  `from_date` text NOT NULL,
  `to_date` text NOT NULL,
  `subject` varchar(250) NOT NULL,
  `message` text NOT NULL,
  `user_rid` int(11) NOT NULL,
  `approval` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_table`
--

INSERT INTO `leave_table` (`days`, `from_date`, `to_date`, `subject`, `message`, `user_rid`, `approval`) VALUES
(3, 'Mon Feb 10 2020', 'Wed Feb 12 2020', 'Sick leave', 'I couldnt attend because Im sick\r\nRegards', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `uid` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`uid`, `email`, `password`) VALUES
(1, 'contact@email.com', 'password'),
(2, 'admin@email.com', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `rating` int(11) NOT NULL,
  `subject` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`rating`, `subject`, `description`, `user_id`) VALUES
(3, 'Excellent', '               ', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
