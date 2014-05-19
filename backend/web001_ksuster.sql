-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 19, 2014 at 08:11 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `web001_ksuster`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pw` varchar(20) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `pw`) VALUES
(1, 'Bastian Morath', 'bastian.morath@me.com', 'pw'),
(4003155, 'Lukas Reichart', 'lukas.reichart@hotmail.com', 'pw');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `post_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`post_id`, `comment_id`, `comment`, `user_id`, `timestamp`) VALUES
(10, 18, 'test', 4003155, '2014-05-19 01:35:42'),
(10, 19, 'test', 4003155, '2014-05-19 01:35:44'),
(10, 20, 'test', 4003155, '2014-05-19 01:35:46'),
(10, 21, 'Guten morgen\n', 4003155, '2014-05-19 01:35:51');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `eventid` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `title` text NOT NULL,
  `location` text NOT NULL,
  `desc` text NOT NULL,
  PRIMARY KEY (`eventid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` text NOT NULL,
  `content` text NOT NULL,
  `mintUps` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id` (`post_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `subject_id`, `admin_id`, `timestamp`, `url`, `content`, `mintUps`) VALUES
(1, 1, 1, '2014-05-19 15:44:43', '2', '2', 0),
(2, 2, 2, '2014-05-19 15:45:08', '2', '2', 0),
(3, 1, 1, '2014-05-19 15:47:00', 'www.youtube.com', 'Hello World this is awesome', 0),
(4, 1, 1, '2014-05-19 15:47:34', 'www.youtube.com', 'Hello World this is awesome', 0),
(5, 1, 1, '2014-05-19 15:47:36', 'www.youtube.com', 'Hello World this is awesome', 0),
(6, 1, 1, '2014-05-19 15:47:57', 'www.youtube.com', 'Hello World this is awesome', 0),
(7, 1, 1, '2014-05-19 15:53:26', 'www.youtube.com', 'Hello World this is awesome', 0),
(8, 1, 1, '2014-05-19 15:53:29', 'www.youtube.com', 'Hello World this is awesome', 0),
(9, 1, 1, '2014-05-19 15:54:25', 'www.youtube.com', 'Hello World this is awesome', 0),
(12, 1, 1, '2014-05-19 15:56:57', 'www.youtube.com', 'Hello World this is awesome', 0),
(13, 1, 1, '2014-05-19 15:56:58', 'www.youtube.com', 'Hello World this is awesome', 0),
(14, 1, 1, '2014-05-19 15:57:38', 'www.youtube.com', 'Hello World this is awesome', 0),
(15, 1, 1, '2014-05-19 15:58:50', 'www.youtube.com', 'Hello World this is awesome', 0),
(16, 1, 1, '2014-05-19 15:59:13', 'www.youtube.com', 'Hello World this is awesome', 0),
(17, 1, 1, '2014-05-19 16:01:09', 'www.youtube.com', 'Hello World this is awesome', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_prop`
--

CREATE TABLE IF NOT EXISTS `post_prop` (
  `post_prop_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `url` text NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`post_prop_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `post_prop`
--

INSERT INTO `post_prop` (`post_prop_id`, `content`, `url`, `timestamp`, `user_id`) VALUES
(1, 'first prop posal', 'www.youtube.com', '2014-05-19 17:09:40', 4003155),
(2, 'first prop posal', 'www.youtube.com', '2014-05-19 17:09:46', 4003155),
(3, 'first prop posal', 'www.youtube.com', '2014-05-19 17:09:46', 4003155),
(4, 'first prop posal', 'www.youtube.com', '2014-05-19 17:09:47', 4003155),
(5, 'first prop posal', 'www.youtube.com', '2014-05-19 17:09:47', 4003155);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `css_map` text NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `name`, `css_map`) VALUES
(1, 'Mathematik', '{"background" : "dodgerblue"}'),
(2, 'Informatik', '{"background" : "dodgerblue"}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL,
  `token` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `token`, `name`) VALUES
(4003155, '4003155', 'Bastian Morath'),
(4003198, '4003198', 'Lukas Reichart');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
