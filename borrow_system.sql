-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 27, 2020 at 02:16 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `borrow_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `bor_id` varchar(500) NOT NULL DEFAULT '',
  `bor_book_date` date NOT NULL,
  `bor_book_time` time NOT NULL,
  `bor_date` date NOT NULL,
  `bor_time` time NOT NULL,
  `bor_return_date` date NOT NULL,
  `bor_return_time` time NOT NULL,
  `bor_subject` varchar(500) DEFAULT '-',
  `bor_sub_prof` varchar(500) DEFAULT '-',
  `bor_object` text DEFAULT NULL,
  `bor_phone1` varchar(100) DEFAULT '-',
  `bor_phone2` varchar(100) DEFAULT '-',
  `mem_id` varchar(50) NOT NULL DEFAULT '',
  `bor_note` text DEFAULT NULL,
  `bor_status` char(10) DEFAULT 'p'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `borrow`
--

INSERT INTO `borrow` (`bor_id`, `bor_book_date`, `bor_book_time`, `bor_date`, `bor_time`, `bor_return_date`, `bor_return_time`, `bor_subject`, `bor_sub_prof`, `bor_object`, `bor_phone1`, `bor_phone2`, `mem_id`, `bor_note`, `bor_status`) VALUES
('2020-05-0813:29:09-40111', '2020-05-25', '13:29:09', '2020-05-29', '09:00:00', '2020-06-02', '10:05:00', 'COS105', 'อ.อรรถศิษฐ์ พัฒนะศิริ', '-', '-', '-', '40130010111', '-', 'a'),
('2020-05-2517:33:45-59999', '2020-05-25', '17:33:45', '2020-05-28', '15:40:00', '2020-05-29', '16:00:00', 'COS101', 'อ.อุสุมา สุขสวัสดิ์', '000', '099-999-9999', '-', '59099910999', '-', 'a'),
('2020-05-2705:45:43-59999', '2020-05-27', '05:45:43', '2020-06-09', '09:45:00', '2020-06-10', '10:45:00', 'COS101', 'อ.อุสุมา สุขสวัสดิ์', 'test', '099-999-9999', '-', '59099910999', '-', 'r');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_data`
--

CREATE TABLE `borrow_data` (
  `bor_data_id` varchar(500) NOT NULL DEFAULT '',
  `bor_equip_id` varchar(500) NOT NULL DEFAULT '',
  `bor_amount` int(11) DEFAULT 0,
  `bor_id` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `borrow_data`
--

INSERT INTO `borrow_data` (`bor_data_id`, `bor_equip_id`, `bor_amount`, `bor_id`) VALUES
('2020-05-0813:29:09-40111-0', '007-T01', NULL, '2020-05-0813:29:09-40111'),
('2020-05-2517:33:45-59999-0', '010-E010', 0, '2020-05-2517:33:45-59999'),
('2020-05-2517:33:45-59999-1', '010-E011', 0, '2020-05-2517:33:45-59999'),
('2020-05-2705:45:43-59999-0', '007-T01', 0, '2020-05-2705:45:43-59999');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_data_detail`
--

CREATE TABLE `borrow_data_detail` (
  `equip_id` varchar(500) NOT NULL DEFAULT '',
  `bor_equip_amount` int(11) NOT NULL,
  `bor_data_id` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `borrow_data_detail`
--

INSERT INTO `borrow_data_detail` (`equip_id`, `bor_equip_amount`, `bor_data_id`) VALUES
('007-E001', 1, '2020-05-0813:29:09-40111-0'),
('007-E001', 1, '2020-05-2705:45:43-59999-0'),
('007-E002', 1, '2020-05-0813:29:09-40111-0'),
('007-E002', 1, '2020-05-2705:45:43-59999-0'),
('007-E003', 1, '2020-05-0813:29:09-40111-0'),
('007-E003', 1, '2020-05-2705:45:43-59999-0'),
('007-E004', 2, '2020-05-0813:29:09-40111-0'),
('007-E004', 2, '2020-05-2705:45:43-59999-0'),
('007-E005', 1, '2020-05-0813:29:09-40111-0'),
('007-E005', 1, '2020-05-2705:45:43-59999-0'),
('007-E006', 1, '2020-05-2517:29:58-59999-0'),
('007-E007', 1, '2020-05-2517:29:58-59999-0'),
('007-E008', 1, '2020-05-2517:29:58-59999-0'),
('007-E009', 1, '2020-05-2517:29:58-59999-0'),
('007-E010', 2, '2020-05-2517:29:58-59999-0'),
('007-E011', 1, '2020-05-2517:29:58-59999-0'),
('010-E010', 0, '2020-05-2517:33:45-59999-0'),
('010-E011', 0, '2020-05-2517:33:45-59999-1');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_temp`
--

CREATE TABLE `borrow_temp` (
  `bor_date` date NOT NULL,
  `bor_return_date` date NOT NULL,
  `bor_equip_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `calendar_holiday`
--

CREATE TABLE `calendar_holiday` (
  `holiday_date` date NOT NULL,
  `holiday_name` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `calendar_holiday`
--

INSERT INTO `calendar_holiday` (`holiday_date`, `holiday_name`) VALUES
('2020-01-01', 'วันขึ้นปีใหม่'),
('2020-02-10', 'วันหยุดชดเชยวันมาฆบูชา'),
('2020-04-06', 'วันวันจักรี'),
('2020-04-13', 'วันสงกรานต์'),
('2020-04-14', 'วันสงกรานต์'),
('2020-04-15', 'วันสงกรานต์'),
('2020-05-04', 'วันฉัตรมงคล'),
('2020-05-06', 'วันวิสาขบูชา'),
('2020-05-11', 'วันพืชมงคล'),
('2020-06-03', 'วันเฉลิมพระชนมพรรษาพระบรมราชินี'),
('2020-07-06', 'วันหยุดชดเชยวันอาสาฬหบูชา'),
('2020-07-28', 'วันเฉลิมพระชนมพรรษา สมเด็จพระเจ้าอยู่หัวมหาวชิราลงกรณฯ '),
('2020-08-12', 'วันแม่แห่งชาติ'),
('2020-10-13', 'วันคล้ายวันสวรรคตในหลวง ร.9'),
('2020-10-23', 'วันปิยมหาราช'),
('2020-12-07', 'วันหยุดชดเชยวันวันพ่อแห่งชาติ'),
('2020-12-10', 'วันรัฐธรรมนูญ'),
('2020-12-31', 'วันสิ้นปี');

-- --------------------------------------------------------

--
-- Table structure for table `color_calendar`
--

CREATE TABLE `color_calendar` (
  `id` varchar(1024) NOT NULL DEFAULT '',
  `color_code` varchar(255) DEFAULT '#FFFF33'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `color_calendar`
--

INSERT INTO `color_calendar` (`id`, `color_code`) VALUES
('00000052', '#8A2BE2'),
('00000053', '#556B2F'),
('00000054', '#EBE108'),
('00000055', '#8B008B'),
('00000056', '#D9BFD8'),
('00000057', '#FF00FF'),
('00000058', '#C71585'),
('00000100', '#7B66EE'),
('00000101', '#FF6346'),
('00000102', '#999815'),
('00000103', '#FFFC9E'),
('00000104', '#ADFF2F'),
('00000105', '#228B22'),
('00000106', '#01FFFF'),
('00000107', '#5F9EA0'),
('00000108', '#8A2BE2'),
('00000109', '#DA71D6'),
('00000110', '#DDA0DD'),
('00000169', '#7B66EE'),
('00000170', '#800180'),
('00000171', '#FF7F4F'),
('00000172', '#FFD500'),
('00000173', '#808000'),
('00000174', '#FFFF02'),
('00000175', '#FF69B3'),
('00000176', '#00FF02'),
('00000199', '#008080'),
('00000200', '#48D1CC'),
('00000201', '#01BFFF'),
('00000202', '#EE82EE'),
('00000203', '#FF1493'),
('00000204', '#FFB6C1'),
('00000205', '#FFD7E6'),
('00000206', '#F5DEB3'),
('00000207', '#A0522D'),
('00000208', '#D2691D'),
('00000209', '#F4A460'),
('00000210', '#BC8F8F'),
('00000211', '#4682B4'),
('00000212', '#B0C4DE'),
('00000213', '#FFFF02'),
('00000214', '#A52A2A'),
('00000215', '#D4FB79'),
('00000216', '#2F4F4F'),
('00000217', '#8B008B'),
('001', '#941751'),
('002', '#A52A2A'),
('003', '#FF8C00'),
('004', '#FFFF02'),
('005', '#9ACD32'),
('006', '#2F4F4F'),
('Ba01', '#B928B8'),
('Ba02', '#DC143C'),
('Ba03', '#FFA500'),
('L01', '#0433FF'),
('L02', '#FE0000'),
('L03', '#FFA07A'),
('L04', '#EBE108'),
('L05', '#FFFC9E'),
('L06', '#008080'),
('L07', '#808000'),
('L08', '#00CED1'),
('L09', '#7FFFD4'),
('L10', '#4682B4');

-- --------------------------------------------------------

--
-- Table structure for table `color_code`
--

CREATE TABLE `color_code` (
  `id` int(11) UNSIGNED NOT NULL,
  `color_code` char(10) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `color_code`
--

INSERT INTO `color_code` (`id`, `color_code`) VALUES
(1, '#AF0080'),
(2, '#AF00FF'),
(3, '#6F00FF'),
(4, '#6F8F40'),
(5, '#008FA0'),
(6, '#CFCF00'),
(7, '#EF6F40'),
(8, '#D2691E'),
(9, '#FF00A0'),
(10, '#FF0040'),
(11, '#CF00C0'),
(12, '#EF6FFF'),
(13, '#6FAFFF'),
(14, '#6FCF40'),
(15, '#4FAF80'),
(16, '#FFFF40'),
(17, '#EFAF40'),
(18, '#BC8F8F'),
(19, '#EF8FC0'),
(20, '#FF4F80'),
(21, '#AF8FC0'),
(22, '#FFCFFF'),
(23, '#4FEFFF'),
(24, '#8FFF80'),
(25, '#8FEFC0'),
(26, '#F5FFAA'),
(27, '#FFFCAD'),
(28, '#FFDEAD'),
(29, '#F9CAEB'),
(30, '#FFB1AD'),
(31, '#CF4FC0'),
(32, '#EFAFFF'),
(33, '#8FCFFF'),
(34, '#4FEF40'),
(35, '#AFCFA0'),
(36, '#E1F776'),
(37, '#FFD479'),
(38, '#D2B48C'),
(39, '#FFB6C1'),
(40, '#FF8F80'),
(41, '#AF00C0'),
(42, '#CF4FFF'),
(43, '#6F6FFF'),
(44, '#6FAF40'),
(45, '#8FAFC0'),
(46, '#F0F20A'),
(47, '#FF8F00'),
(48, '#F4A460'),
(49, '#EF4FC0'),
(50, '#FF6F40');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `cou_id` char(20) NOT NULL DEFAULT '',
  `cou_name` varchar(500) NOT NULL DEFAULT '',
  `cou_initials` varchar(200) NOT NULL DEFAULT '',
  `cou_en_name` varchar(500) NOT NULL DEFAULT '',
  `cou_en_initials` varchar(200) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`cou_id`, `cou_name`, `cou_initials`, `cou_en_name`, `cou_en_initials`) VALUES
('300046001', 'ศิลปศาสตรบัณฑิต (นวัตกรรมสื่อสารสังคม)', 'ศศ.บ. (นวัตกรรมสื่อสารสังคม)', 'Bachelor of Arts (Social Communication Innovation)', 'B.A. (Social Communication Innovation)'),
('300126102', 'ศิลปศาสตรบัณฑิต (นวัตกรรมการสื่อสาร)', 'ศศ.บ. (นวัตกรรมการสื่อสาร)', 'Bachelor of Arts (Communication Innovation)', 'B.A (Communication Innovation)'),
('300186001', 'ศิลปศาสตรบัณฑิต (ภาพยนตร์และสื่อดิจิทัล)', 'ศศ.บ. (ภาพยนตร์และสื่อดิจิทัล)', 'Bachelor of Arts (Cinema and Digital Media)', 'B.A. (Cinema and Digital Media)'),
('951535701', 'ศิลปศาสตรมหาบัณฑิต (การสื่อสารวิทยาศาสตร์และสุขภาพ)', 'ศศ.ม. (การสื่อสารวิทยาศาสตร์และสุขภาพ)', 'Master of Arts (Science and Health Communication)', 'M.A. (Science and Health Communication)'),
('951556201', 'ศิลปศาสตรมหาบัณฑิต (การออกแบบธุรกิจ)', 'ศศ.ม. (การออกแบบธุรกิจ)', 'Master of Arts (Design for Business)', 'M.A. (Design for Business)'),
('951626101', 'ศิลปศาสตรมหาบัณฑิต (สื่อและนวัตกรรมสื่อสาร)', 'ศศ.ม. (สื่อและนวัตกรรมสื่อสาร)', 'Master of Arts Program (Media and Communication Innovation)', 'M.A. (Media and Communication Innovation)');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equip_id` varchar(500) NOT NULL DEFAULT '',
  `equip_serial_number` varchar(500) DEFAULT '-',
  `equip_name` varchar(255) NOT NULL DEFAULT '',
  `equip_brand` varchar(255) DEFAULT '-',
  `equip_model` varchar(200) DEFAULT '-',
  `equip_stock` int(255) DEFAULT 0,
  `equip_can_borrow` char(10) DEFAULT '0',
  `type_id` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equip_id`, `equip_serial_number`, `equip_name`, `equip_brand`, `equip_model`, `equip_stock`, `equip_can_borrow`, `type_id`) VALUES
('001-E001', '-', 'กล้อง Canon C100', 'canon', '-', 0, 'x', '001-T01'),
('001-E002', '-', 'Battery Canon	canon', 'canon', '-', 0, 'x', '001-T01'),
('001-E003', '-', 'Battery Canon Charger', 'canon', '-', 0, 'x', '001-T01'),
('001-E004', '-', 'Handle&Internal Mic.', '-', '-', 0, 'x', '001-T01'),
('001-E005', '-', 'SD Card', '-', '-', 0, 'x', '001-T01'),
('001-E006', '-', 'Card Reader', '-', '-', 0, 'x', '001-T01'),
('001-E007', '-', 'ขาตั้งกล้อง Miller', 'miller', '-', 0, 'x', '001-T01'),
('001-E008', '-', 'HDMI Cable', '-', '-', 0, 'x', '001-T02'),
('001-E009', '-', 'USB Cable', '-', '-', 0, 'x', '001-T02'),
('001-E010', '-', 'เลนส์ Canon 50 mm', 'canon', '-', 0, 'x', '001-T03'),
('001-E011', '-', 'เลนส์ Canon 10-22 mm', 'canon', '-', 0, 'x', '001-T03'),
('001-E012', '-', 'เลนส์ Canon 24-105 mm', 'canon', '-', 0, 'x', '001-T03'),
('001-E013', '-', 'เลนส์ Canon 70-200 mm', 'canon', '-', 0, 'x', '001-T03'),
('002-E001', '-', 'กล้อง Canon C100', 'canon', '-', 0, 'x', '002-T01'),
('002-E002', '-', 'Battery Canon', 'canon', '-', 0, 'x', '002-T01'),
('002-E003', '-', 'Battery Canon Charger', 'canon', '-', 0, 'x', '002-T01'),
('002-E004', '-', 'Handle&Internal Mic.', '-', '-', 0, 'x', '002-T01'),
('002-E005', '-', 'SD Card', '-', '-', 0, 'x', '002-T01'),
('002-E006', '-', 'Card Reader', '-', '-', 0, 'x', '002-T01'),
('002-E007', '-', 'Marshall Monitor', 'marshall', '-', 0, 'x', '002-T01'),
('002-E008', '-', 'AC Adapter', '-', '-', 0, 'x', '002-T01'),
('002-E009', '-', 'Panasonic battery', 'panasonic', '-', 0, 'x', '002-T01'),
('002-E010', '-', 'Panasonic battery Charger', 'panasonic', '-', 0, 'x', '002-T01'),
('002-E011', '-', 'ขาตั้งกล้อง Miller', 'miller', '-', 0, 'x', '002-T01'),
('002-E012', '-', 'Rod Support', '-', '-', 0, 'x', '002-T01'),
('002-E013', '-', 'V-Mount Adapter', '-', '-', 0, 'x', '002-T01'),
('002-E014', '-', 'Follow Focus', '-', '-', 0, 'x', '002-T01'),
('002-E015', '-', 'Magic Arm', '-', '-', 0, 'x', '002-T01'),
('002-E016', '-', 'AC Cable', '-', '-', 0, 'x', '002-T02'),
('002-E017', '-', 'HDMI Cable', '-', '-', 0, 'x', '002-T02'),
('002-E018', '-', 'เลนส์ Samyang 14 mm', 'samyang', '-', 0, 'x', '002-T03'),
('002-E019', '-', 'เลนส์ Samyang 24 mm', 'samyang', '-', 0, 'x', '002-T03'),
('002-E020', '-', 'เลนส์ Samyang 35 mm', 'samyang', '-', 0, 'x', '002-T03'),
('002-E021', '-', 'เลนส์ Samyang 50 mm', 'samyang', '-', 0, 'x', '002-T03'),
('002-E022', '-', 'เลนส์ Samyang 85 mm', 'samyang', '-', 0, 'x', '002-T03'),
('003-E001', '-', 'กล้อง canon C100', 'canon', '-', 0, 'x', '003-T01'),
('003-E002', '-', 'Battery Canon', 'canon', '-', 0, 'x', '003-T01'),
('003-E003', '-', 'Battery Canon Charger', 'canon', '-', 0, 'x', '003-T01'),
('003-E004', '-', 'Handle&Internal Mic.', 'canon', '-', 0, 'x', '003-T01'),
('003-E005', '-', 'SD Card', '-', '-', 0, 'x', '003-T01'),
('003-E006', '-', 'Card Reader', '-', '-', 0, 'x', '003-T01'),
('003-E007', '-', 'Marshall Monitor', '-', '-', 0, 'x', '003-T01'),
('003-E008', '-', 'AC Adapter', '-', '-', 0, 'x', '003-T01'),
('003-E009', '-', 'Panasonic battery', '-', '-', 0, 'x', '003-T01'),
('003-E010', '-', 'Panasonic battery Charger', '-', '-', 0, 'x', '003-T01'),
('003-E011', '-', 'ขาตั้งกล้อง Miller', '-', '-', 0, 'x', '003-T01'),
('003-E012', '-', 'Rod Support', '-', '-', 0, 'x', '003-T01'),
('003-E013', '-', 'V-Mount Adapter', '-', '-', 0, 'x', '003-T01'),
('003-E014', '-', 'Follow Focus', '-', '-', 0, 'x', '003-T01'),
('003-E015', '-', 'Magic Arm', '-', '-', 0, 'x', '003-T01'),
('003-E016', '-', 'AC Cable', '-', '-', 0, 'x', '003-T02'),
('003-E017', '-', 'HDMI Cable', '-', '-', 0, 'x', '003-T02'),
('003-E018', '-', 'เลนส์ Samyang 14 mm', '-', '-', 0, 'x', '003-T03'),
('003-E019', '-', 'เลนส์ Samyang 24 mm', '-', '-', 0, 'x', '003-T03'),
('003-E020', '-', 'เลนส์ Samyang 35 mm', '-', '-', 0, 'x', '003-T03'),
('003-E021', '-', 'เลนส์ Samyang 50 mm', '-', '-', 0, 'x', '003-T03'),
('003-E022', '-', 'เลนส์ Samyang 85 mm', '-', '-', 0, 'x', '003-T03'),
('004-E001', '-', 'กล้อง Sony FS700', 'sony', '-', 0, 'x', '004-T01'),
('004-E002', '-', 'Small HD DP6', '-', '-', 0, 'x', '004-T01'),
('004-E003', '-', 'Metabone', '-', '-', 0, 'x', '004-T01'),
('004-E004', '-', 'V-mount Battery IDX', '-', '-', 0, 'x', '004-T01'),
('004-E005', '-', 'V- mount Changer', '-', '-', 0, 'x', '004-T01'),
('004-E006', '-', 'Battery Sony', '-', '-', 0, 'x', '004-T01'),
('004-E007', '-', 'Battery Sony Charger', '-', '-', 0, 'x', '004-T01'),
('004-E008', '-', 'ขาตั้งกล้อง Miller', '-', '-', 0, 'x', '004-T01'),
('004-E009', '-', 'Light Meter', '-', '-', 0, 'x', '004-T01'),
('004-E010', '-', 'SD Card', '-', '-', 0, 'x', '004-T01'),
('004-E011', '-', 'Slate', '-', '-', 0, 'x', '004-T01'),
('004-E012', '-', 'HDMI ยาว 30 cm', '-', '-', 0, 'x', '004-T02'),
('004-E013', '-', 'เลนส์ Sony 28-135 mm', 'sony', '-', 0, 'x', '004-T03'),
('004-E014', '-', 'เลนส์ Samyang 14 mm', 'samyang', '-', 0, 'x', '004-T03'),
('004-E015', '-', 'เลนส์ Samyang 24 mm', 'samyang', '-', 0, 'x', '004-T03'),
('004-E016', '-', 'เลนส์ Samyang 35 mm', 'samyang', '-', 0, 'x', '004-T03'),
('004-E017', '-', 'เลนส์ Samyang 50 mm', 'samyang', '-', 0, 'x', '004-T03'),
('004-E018', '-', 'เลนส์ Samyang 85 mm', 'samyang', '-', 0, 'x', '004-T03'),
('004-E019', '-', 'เลนส์ Samyang 100 mm', 'samyang', '-', 0, 'x', '004-T03'),
('005-E001', '-', 'กล้อง Sony FS7', 'sony', '-', 0, 'x', '005-T01'),
('005-E002', '-', 'Follow focus', '-', '-', 0, 'x', '005-T01'),
('005-E003', '-', 'Matt Box', '-', '-', 0, 'x', '005-T01'),
('005-E004', '-', 'Small HD AC7', '-', '-', 0, 'x', '005-T01'),
('005-E005', '-', 'V-mount Battery IDX', '-', '-', 0, 'x', '005-T01'),
('005-E006', '-', 'V- mount Changer', '-', '-', 0, 'x', '005-T01'),
('005-E007', '-', 'Battery Sony', '-', '-', 0, 'x', '005-T01'),
('005-E008', '-', 'Battery Sony Charger', '-', '-', 0, 'x', '005-T01'),
('005-E009', '-', 'Battery Panasonic ', '-', '-', 0, 'x', '005-T01'),
('005-E010', '-', 'Battery Panasonic Charger', '-', '-', 0, 'x', '005-T01'),
('005-E011', '-', 'ขาตั้งกล้อง Miller', '-', '-', 0, 'x', '005-T01'),
('005-E012', '-', 'Light Meter', '-', '-', 0, 'x', '005-T01'),
('005-E013', '-', 'Card XQD', '-', '-', 0, 'x', '005-T01'),
('005-E014', '-', 'Card reader', '-', '-', 0, 'x', '005-T01'),
('005-E015', '-', 'Slate', '-', '-', 0, 'x', '005-T01'),
('005-E016', '-', 'ND SE', '-', '-', 0, 'x', '005-T01'),
('005-E017', '-', 'Monitor TV Logic 17', '-', '-', 0, 'x', '005-T01'),
('005-E018', '-', 'Checker', '-', '-', 0, 'x', '005-T01'),
('005-E019', '-', 'HDMI ยาว 20 ซ.ม', '-', '-', 0, 'x', '005-T02'),
('005-E020', '-', 'SDI  ยาว 30 ซ.ม', '-', '-', 0, 'x', '005-T02'),
('005-E021', '-', 'HDMI ยาว 5 ซ.ม', '-', '-', 0, 'x', '005-T02'),
('005-E022', '-', 'SDI  ยาว 10 ซ.ม', '-', '-', 0, 'x', '005-T02'),
('005-E023', '-', 'เลนส์ Samyang 14 mm', '-', '-', 0, 'x', '005-T03'),
('005-E024', '-', 'เลนส์ Samyang 24 mm', '-', '-', 0, 'x', '005-T03'),
('005-E025', '-', 'เลนส์ Samyang 35 mm', '-', '-', 0, 'x', '005-T03'),
('005-E026', '-', 'เลนส์ Samyang 50 mm', '-', '-', 0, 'x', '005-T03'),
('005-E027', '-', 'เลนส์ Samyang 85 mm', '-', '-', 0, 'x', '005-T03'),
('005-E028', '-', 'เลนส์ Samyang 100 mm', '-', '-', 0, 'x', '005-T03'),
('006-E001', '-', 'กล้อง Sony FS7', 'sony', '-', 0, 'x', '006-T01'),
('006-E002', '-', 'Follow focus', '-', '-', 0, 'x', '006-T01'),
('006-E003', '-', 'Matt Box', '-', '-', 0, 'x', '006-T01'),
('006-E004', '-', 'Small HD AC7', '-', '-', 0, 'x', '006-T01'),
('006-E005', '-', 'V-mount Battery', '-', '-', 0, 'x', '006-T01'),
('006-E006', '-', 'V- mount Changer', '-', '-', 0, 'x', '006-T01'),
('006-E007', '-', 'Battery Sony', '-', '-', 0, 'x', '006-T01'),
('006-E008', '-', 'Battery Sony Charger', '-', '-', 0, 'x', '006-T01'),
('006-E009', '-', 'Battery Panasonic ', '-', '-', 0, 'x', '006-T01'),
('006-E010', '-', 'Battery Panasonic Charger', '-', '-', 0, 'x', '006-T01'),
('006-E011', '-', 'ขาตั้งกล้อง Miller', '-', '-', 0, 'x', '006-T01'),
('006-E012', '-', 'Light Meter', '-', '-', 0, 'x', '006-T01'),
('006-E013', '-', 'Card XQD', '-', '-', 0, 'x', '006-T01'),
('006-E014', '-', 'Card reader', '-', '-', 0, 'x', '006-T01'),
('006-E015', '-', 'Slate', '-', '-', 0, 'x', '006-T01'),
('006-E016', '-', 'ND SE', '-', '-', 0, 'x', '006-T01'),
('006-E017', '-', 'Monitor TV Logic 17', '-', '-', 0, 'x', '006-T01'),
('006-E018', '-', 'Checker', '-', '-', 0, 'x', '006-T01'),
('006-E019', '-', 'D-TAP', '-', '-', 0, 'x', '006-T01'),
('006-E020', '-', 'HDMI ยาว 20 ซ.ม', '-', '-', 0, 'x', '006-T02'),
('006-E021', '-', 'SDI  ยาว 30 ซ.ม', '-', '-', 0, 'x', '006-T02'),
('006-E022', '-', 'HDMI ยาว 5 ซ.ม', '-', '-', 0, 'x', '006-T02'),
('006-E023', '-', 'SDI  ยาว 10 ซ.ม', '-', '-', 0, 'x', '006-T02'),
('006-E024', '-', 'เลนส์ Sony 28-135 mm', '-', '-', 0, 'x', '006-T03'),
('006-E025', '-', 'เลนส์ Samyang 14 mm', '-', '-', 0, 'x', '006-T03'),
('006-E026', '-', 'เลนส์ Samyang 24 mm', '-', '-', 0, 'x', '006-T03'),
('006-E027', '-', 'เลนส์ Samyang 35 mm', '-', '-', 0, 'x', '006-T03'),
('006-E028', '-', 'เลนส์ Samyang 50 mm', '-', '-', 0, 'x', '006-T03'),
('006-E029', '-', 'เลนส์ Samyang 85 mm', '-', '-', 0, 'x', '006-T03'),
('006-E030', '-', 'เลนส์ Samyang 100 mm', '-', '-', 0, 'x', '006-T03'),
('007-E001', '-', 'กล้อง Canon 80D + Camera Bag', 'canon', '-', 0, 'x', '007-T01'),
('007-E002', '-', 'เลนส์ 18-135 mm', '-', '-', 0, 'x', '007-T01'),
('007-E003', '-', 'Battery  Charger', '-', '-', 0, 'x', '007-T01'),
('007-E004', '-', 'Battery', '-', '-', 0, 'x', '007-T01'),
('007-E005', '-', 'SD Card (Sandisk Extreme 32G)', '-', '-', 0, 'x', '007-T01'),
('007-E006', '-', 'กล้อง Canon 70D + Camera Bag', 'canon', '-', 0, 'x', '007-T02'),
('007-E007', '-', 'เลนส์ 18-135 mm', '-', '-', 0, 'x', '007-T02'),
('007-E008', '-', 'ขาตั้งกล้อง Manfrotto (Monopod/Tripod)', 'manfrotto', '-', 0, 'x', '007-T02'),
('007-E009', '-', 'Battery  Charger', '-', '-', 0, 'x', '007-T02'),
('007-E010', '-', 'Battery', '-', '-', 0, 'x', '007-T02'),
('007-E011', '-', 'SD Card (Sandisk Extreme 32G)', '-', '-', 0, 'x', '007-T02'),
('007-E012', '-', 'กล้อง Canon 60D + Camera Bag', 'canon', '-', 0, 'x', '007-T03'),
('007-E013', '-', 'เลนส์ 18-135 mm', '-', '-', 0, 'x', '007-T03'),
('007-E014', '-', 'Battery  Charger', '-', '-', 0, 'x', '007-T03'),
('007-E015', '-', 'Battery', '-', '-', 0, 'x', '007-T03'),
('007-E016', '-', 'SD Card (Sandisk Extreme 32G)', '-', '-', 0, 'x', '007-T03'),
('007-E017', '-', 'Canon lergria', 'canon', '-', 10, 'o', '007-T04'),
('007-E018', '-', 'JVC HM 150', '-', '-', 0, 'o', '007-T04'),
('007-E019', '-', 'JVC HM 600', '-', '-', 0, 'o', '007-T04'),
('007-E020', '-', 'Wireless Microphone Sony', 'sony', '-', 0, 'o', '007-T05'),
('007-E021', '-', 'Wireless Microphone Sennheiser', 'sennheiser', '-', 0, 'o', '007-T05'),
('007-E022', '-', 'Tripod(FSB4)', '-', '-', 8, 'o', '007-T06'),
('007-E023', '-', 'Slider Edelkrone', '-', '-', 9, 'o', '007-T06'),
('008-E001', '-', 'Sider MYT(Large /Small)', '-', '-', 0, 'o', '008-T01'),
('008-E002', '-', 'Ronin+Easy Rig', '-', '-', 0, 'o', '008-T01'),
('008-E003', '-', 'Shoulder Rig', '-', '-', 0, 'o', '008-T01'),
('008-E004', '-', 'Dolly', '-', '-', 0, 'o', '008-T01'),
('008-E005', '-', 'Mini Jib', '-', '-', 0, 'o', '008-T01'),
('008-E006', '-', 'Steadicam glidecam', '-', '-', 0, 'o', '008-T01'),
('008-E007', '-', 'เครื่องบันทึกเสียง', '-', '-', 0, 'o', '008-T02'),
('008-E008', '-', 'ไมค์บูม', '-', '-', 0, 'o', '008-T02'),
('009-E001', '-', 'Hot light 150W.+Stand', '-', '-', 0, 'x', '009-T01'),
('009-E002', '-', '650W.+Stand', '-', '-', 0, 'x', '009-T02'),
('009-E003', '-', '300W.+Stand', '-', '-', 0, 'x', '009-T02'),
('009-E004', '-', '150W.+Stand', '-', '-', 0, 'x', '009-T02'),
('009-E005', '-', '1000W.+Stand', '-', '-', 0, 'x', '009-T03'),
('009-E006', '-', '650W.+Stand', '-', '-', 0, 'x', '009-T03'),
('009-E007', '-', '300W.+Stand', '-', '-', 0, 'x', '009-T03'),
('009-E008', '-', '1000W.+Stand', '-', '-', 0, 'x', '009-T04'),
('009-E009', '-', '650W.+Stand', '-', '-', 0, 'x', '009-T04'),
('009-E010', '-', 'LED + Stand', '-', '-', 0, 'x', '009-T05'),
('009-E011', '-', 'Battery', '-', '-', 0, 'x', '009-T05'),
('009-E012', '-', 'LED + Stand', '-', '-', 0, 'x', '009-T06'),
('009-E013', '-', 'Battery', '-', '-', 0, 'x', '009-T06'),
('009-E014', '-', 'LED Pocket', '-', '-', 0, 'x', '009-T07'),
('009-E015', '-', 'Fluorescent', '-', '-', 0, 'x', '009-T08'),
('009-E016', '-', 'Stand', '-', '-', 0, 'x', '009-T08'),
('009-E017', '-', 'LED 9.1 + Dimmer', '-', '-', 0, 'x', '009-T09'),
('009-E018', '-', 'LED 4.1 + Dimmer', '-', '-', 0, 'x', '009-T09'),
('009-E019', '-', 'Stand', '-', '-', 0, 'x', '009-T09'),
('009-E020', '-', 'Kino 4Bank', '-', '-', 0, 'x', '009-T10'),
('009-E021', '-', 'Stand', '-', '-', 0, 'x', '009-T10'),
('009-E022', '-', 'Ballat', '-', '-', 0, 'x', '009-T10'),
('010-E001', '-', 'C-Stand', '-', '-', 0, 'o', '010-T01'),
('010-E002', '-', 'Minimax Stand', '-', '-', 0, 'o', '010-T01'),
('010-E003', '-', 'Green Screen+ Frame +Stand', '-', '-', 0, 'o', '010-T01'),
('010-E004', '-', 'Send Bag', '-', '-', 0, 'o', '010-T01'),
('010-E005', '-', 'Diffuse', '-', '-', 0, 'o', '010-T01'),
('010-E006', '-', 'Blue Gel', '-', '-', 0, 'o', '010-T01'),
('010-E007', '-', 'Apple Box Full', '-', '-', 0, 'o', '010-T01'),
('010-E008', '-', 'Apple Box Half', '-', '-', 0, 'o', '010-T01'),
('010-E009', '-', 'Apple Box Quarter', '-', '-', 0, 'o', '010-T01'),
('010-E010', '-', 'ปลั๊ก Roll', '-', '-', 0, 'o', '010-T01'),
('010-E011', '-', 'Frame ขนาด 24x18 นิ้ว', '-', '-', 0, 'o', '010-T01'),
('010-E012', '-', 'Frame ขนาด 24x24 นิ้ว', '-', '-', 0, 'o', '010-T01'),
('010-E013', '-', 'Frame ขนาด 36x24 นิ้ว', '-', '-', 0, 'o', '010-T01'),
('010-E014', '-', 'Frame ขนาด 36x36 นิ้ว', '-', '-', 0, 'o', '010-T01'),
('010-E015', '-', 'Cutter ขนาด 1x1.6 ฟุต', '-', '-', 0, 'o', '010-T01'),
('010-E016', '-', 'Cutter ขนาด 1.6x2 ฟุต', '-', '-', 0, 'o', '010-T01'),
('010-E017', '-', 'Cutter ขนาด 1x3 ฟุต', '-', '-', 0, 'o', '010-T01'),
('010-E018', '-', 'Light Kit Control', '-', '-', 0, 'o', '010-T01'),
('010-E019', '-', 'ผ้าดำ', '-', '-', 0, 'o', '010-T01'),
('011-E001', '-', 'iMac', 'apple', '-', 0, 'o', '011-T01'),
('012-E001', '-', 'iPad', 'apple', '-', 0, 'o', '012-T01'),
('013-E001', '-', 'KEYBOARD', '-', '-', 0, 'o', '013-T01'),
('014-E001', '-', 'LAN CABLE 3-5 M.', '-', '-', 0, 'o', '014-T01'),
('015-E001', '-', 'MacBook', '-', '-', 0, 'o', '015-T01'),
('016-E001', '-', 'MICROPHONE & SPEAKER', '-', '-', 0, 'o', '016-T01'),
('017-E001', '-', 'MOUSE', '-', '-', 0, 'o', '017-T01'),
('018-E001', '-', 'NOTEBOOK', '-', '-', 0, 'o', '018-T01'),
('019-E001', '-', 'PERSONAL COMPUTER', '-', '-', 0, 'o', '019-T01'),
('020-E001', '-', 'PLUG 3-5 M.', '-', '-', 0, 'o', '020-T01'),
('021-E001', '-', 'WACOM INTUOS PEN', '-', '-', 0, 'o', '021-T01');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_borrow`
--

CREATE TABLE `equipment_borrow` (
  `equip_id` varchar(500) NOT NULL DEFAULT '',
  `equip_amount` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment_borrow`
--

INSERT INTO `equipment_borrow` (`equip_id`, `equip_amount`) VALUES
('001-E001', 1),
('001-E002', 2),
('001-E003', 1),
('001-E004', 1),
('001-E005', 2),
('001-E006', 1),
('001-E007', 1),
('001-E008', 1),
('001-E009', 1),
('001-E010', 1),
('001-E011', 1),
('001-E012', 1),
('001-E013', 1),
('002-E001', 1),
('002-E002', 2),
('002-E003', 1),
('002-E004', 1),
('002-E005', 2),
('002-E006', 1),
('002-E007', 1),
('002-E008', 1),
('002-E009', 2),
('002-E010', 1),
('002-E011', 1),
('002-E012', 1),
('002-E013', 1),
('002-E014', 1),
('002-E015', 1),
('002-E016', 1),
('002-E017', 1),
('002-E018', 1),
('002-E019', 1),
('002-E020', 1),
('002-E021', 1),
('002-E022', 1),
('003-E001', 1),
('003-E002', 2),
('003-E003', 1),
('003-E004', 1),
('003-E005', 2),
('003-E006', 1),
('003-E007', 1),
('003-E008', 1),
('003-E009', 2),
('003-E010', 1),
('003-E011', 1),
('003-E012', 1),
('003-E013', 1),
('003-E014', 1),
('003-E015', 1),
('003-E016', 1),
('003-E017', 1),
('003-E018', 1),
('003-E019', 1),
('003-E020', 1),
('003-E021', 1),
('003-E022', 1),
('004-E001', 1),
('004-E002', 1),
('004-E003', 1),
('004-E004', 2),
('004-E005', 1),
('004-E006', 2),
('004-E007', 1),
('004-E008', 1),
('004-E009', 1),
('004-E010', 1),
('004-E011', 1),
('004-E012', 1),
('004-E013', 1),
('004-E014', 1),
('004-E015', 1),
('004-E016', 1),
('004-E017', 1),
('004-E018', 1),
('004-E019', 1),
('005-E001', 1),
('005-E002', 1),
('005-E003', 1),
('005-E004', 1),
('005-E005', 2),
('005-E006', 1),
('005-E007', 2),
('005-E008', 1),
('005-E009', 2),
('005-E010', 1),
('005-E011', 1),
('005-E012', 1),
('005-E013', 2),
('005-E014', 2),
('005-E015', 1),
('005-E016', 1),
('005-E017', 1),
('005-E018', 1),
('005-E019', 1),
('005-E020', 1),
('005-E021', 1),
('005-E022', 1),
('005-E023', 1),
('005-E024', 1),
('005-E025', 1),
('005-E026', 1),
('005-E027', 1),
('005-E028', 1),
('006-E001', 1),
('006-E002', 1),
('006-E003', 1),
('006-E004', 1),
('006-E005', 2),
('006-E006', 1),
('006-E007', 2),
('006-E008', 1),
('006-E009', 2),
('006-E010', 1),
('006-E011', 1),
('006-E012', 1),
('006-E013', 2),
('006-E014', 2),
('006-E015', 1),
('006-E016', 1),
('006-E017', 1),
('006-E018', 1),
('006-E019', 1),
('006-E020', 1),
('006-E021', 1),
('006-E022', 1),
('006-E023', 1),
('006-E024', 1),
('006-E025', 1),
('006-E026', 1),
('006-E027', 1),
('006-E028', 1),
('006-E029', 1),
('006-E030', 1),
('007-E001', 1),
('007-E002', 1),
('007-E003', 1),
('007-E004', 2),
('007-E005', 1),
('007-E006', 1),
('007-E007', 1),
('007-E008', 1),
('007-E009', 1),
('007-E010', 2),
('007-E011', 1),
('007-E012', 1),
('007-E013', 1),
('007-E014', 1),
('007-E015', 2),
('007-E016', 1),
('007-E017', 1),
('007-E018', 1),
('007-E019', 1),
('007-E020', 1),
('007-E021', 1),
('007-E022', 1),
('007-E023', 1),
('008-E001', 1),
('008-E002', 1),
('008-E003', 1),
('008-E004', 1),
('008-E005', 1),
('008-E006', 1),
('008-E007', 1),
('008-E008', 1),
('009-E001', 3),
('009-E002', 1),
('009-E003', 2),
('009-E004', 2),
('009-E005', 1),
('009-E006', 2),
('009-E007', 2),
('009-E008', 1),
('009-E009', 2),
('009-E010', 2),
('009-E011', 1),
('009-E012', 6),
('009-E013', 1),
('009-E014', 1),
('009-E015', 1),
('009-E016', 1),
('009-E017', 4),
('009-E018', 1),
('009-E019', 1),
('009-E020', 1),
('009-E021', 1),
('009-E022', 1),
('010-E001', 0),
('010-E002', 0),
('010-E003', 0),
('010-E004', 0),
('010-E005', 0),
('010-E006', 0),
('010-E007', 0),
('010-E008', 0),
('010-E009', 0),
('010-E010', 0),
('010-E011', 0),
('010-E012', 0),
('010-E013', 0),
('010-E014', 0),
('010-E015', 0),
('010-E016', 0),
('010-E017', 0),
('010-E018', 0),
('010-E019', 0),
('011-E001', 1),
('012-E001', 1),
('013-E001', 1),
('014-E001', 1),
('015-E001', 1),
('016-E001', 1),
('017-E001', 1),
('018-E001', 1),
('019-E001', 1),
('020-E001', 1),
('021-E001', 1);

-- --------------------------------------------------------

--
-- Table structure for table `equipment_color`
--

CREATE TABLE `equipment_color` (
  `id_equip` varchar(1024) NOT NULL DEFAULT '',
  `color_id` varchar(255) DEFAULT '#FFFF33'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment_color`
--

INSERT INTO `equipment_color` (`id_equip`, `color_id`) VALUES
('001', '1'),
('002', '1'),
('003', '1'),
('004', '1'),
('005', '1'),
('006', '1'),
('007-E017', '4'),
('007-E018', '5'),
('007-E019', '6'),
('007-E020', '7'),
('007-E021', '8'),
('007-E022', '9'),
('007-E023', '10'),
('007-T01', '1'),
('007-T02', '2'),
('007-T03', '3'),
('008-E001', '1'),
('008-E002', '2'),
('008-E003', '3'),
('008-E004', '4'),
('008-E005', '5'),
('008-E006', '6'),
('008-E007', '7'),
('008-E008', '8'),
('009-T01', '1'),
('009-T02', '2'),
('009-T03', '3'),
('009-T04', '4'),
('009-T05', '5'),
('009-T06', '6'),
('009-T07', '7'),
('009-T08', '8'),
('009-T09', '9'),
('009-T10', '10'),
('010-E001', '1'),
('010-E002', '2'),
('010-E003', '3'),
('010-E004', '4'),
('010-E005', '5'),
('010-E006', '6'),
('010-E007', '7'),
('010-E008', '8'),
('010-E009', '9'),
('010-E010', '10'),
('010-E011', '11'),
('010-E012', '12'),
('010-E013', '13'),
('010-E014', '14'),
('010-E015', '15'),
('010-E016', '16'),
('010-E017', '17'),
('010-E018', '18'),
('010-E019', '19'),
('011-E001', '1'),
('012-E001', '1'),
('013-E001', '1'),
('014-E001', '1'),
('015-E001', '1'),
('016-E001', '1'),
('017-E001', '1'),
('018-E001', '1'),
('019-E001', '1'),
('020-E001', '1'),
('021-E001', '1'),
('022-E001', '2'),
('022-E002', '3'),
('022-T01', '1'),
('022-T03', '4'),
('023-E003', '0'),
('023-E004', '0'),
('023-T02', '2'),
('023-T03', '3');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_set`
--

CREATE TABLE `equipment_set` (
  `set_id` varchar(800) NOT NULL DEFAULT '',
  `set_name` varchar(255) NOT NULL DEFAULT '',
  `set_category` varchar(255) NOT NULL DEFAULT '',
  `set_can_borrow` char(10) DEFAULT '0',
  `set_stock` int(255) DEFAULT 0,
  `set_pic` varchar(200) NOT NULL DEFAULT '',
  `staff_id` varchar(255) NOT NULL DEFAULT '',
  `set_borrower` varchar(50) NOT NULL DEFAULT 'all',
  `set_status` char(50) NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment_set`
--

INSERT INTO `equipment_set` (`set_id`, `set_name`, `set_category`, `set_can_borrow`, `set_stock`, `set_pic`, `staff_id`, `set_borrower`, `set_status`) VALUES
('001', 'CAMERA A', 'camera', 'o', 1, 'camera-a.jpg', '20005', 'all', 'on'),
('002', 'CAMERA B', 'camera', 'o', 1, 'camera-b.jpg', '20005', 'all', 'on'),
('003', 'CAMERA C', 'camera', 'o', 1, 'camera-c.jpg', '20005', 'all', 'on'),
('004', 'CAMERA D', 'camera', 'o', 1, 'camera-d.jpg', '20005', 'all', 'on'),
('005', 'CAMERA E', 'camera', 'o', 1, 'camera-e.jpg', '20005', 'all', 'on'),
('006', 'CAMERA F', 'camera', 'o', 1, 'camera-f.jpg', '20005', 'all', 'on'),
('007', 'CAMERA Basic', 'camera', 'x', 1, 'camera-basic.jpg', '20005', 'all', 'on'),
('008', 'GRIP & SOUND', 'assessory', 'x', 1, 'assessory-grip_sound.jpg', '20005', 'all', 'on'),
('009', 'LIGHTING', 'assessory', 'x', 1, 'assessory-light.jpg', '20005', 'all', 'on'),
('010', 'SPACIAL EQUIPMENT', 'assessory', 'x', 1, 'assessory-spacial.jpg', '20005', 'all', 'on'),
('011', 'iMac', 'device', 'x', 1, 'device-imac.jpg', '20022', 'all', 'on'),
('012', 'iPad', 'device', 'x', 1, 'device-ipad.jpg', '20022', 'all', 'on'),
('013', 'KEYBOARD', 'device', 'x', 1, 'device-keyboard.jpg', '20022', 'all', 'on'),
('014', 'LAN CABLE 3-5 M.', 'device', 'x', 1, 'device-lan.jpg', '20022', 'all', 'on'),
('015', 'MacBook', 'device', 'x', 1, 'device-macbook.jpg', '20022', 'all', 'on'),
('016', 'MICROPHONE & SPEAKER', 'device', 'x', 1, 'device-mic.jpg', '20022', 'all', 'on'),
('017', 'MOUSE', 'device', 'x', 1, 'device-mouse.jpg', '20022', 'all', 'on'),
('018', 'NOTEBOOK', 'device', 'x', 1, 'device-notebook.jpg', '20022', 'all', 'on'),
('019', 'PERSONAL COMPUTER', 'device', 'x', 1, 'device-pc.jpg', '20022', 'all', 'on'),
('020', 'PLUG 3-5 M.', 'device', 'x', 1, 'device-plug.jpg', '20022', 'all', 'on'),
('021', 'WACOM INTUOS PEN', 'device', 'x', 1, 'device-wacom.jpg', '20022', 'all', 'on');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_type`
--

CREATE TABLE `equipment_type` (
  `type_id` varchar(500) NOT NULL DEFAULT '',
  `type_name` varchar(255) NOT NULL DEFAULT '',
  `type_can_borrow` char(10) NOT NULL DEFAULT '0',
  `type_stock` int(255) DEFAULT 0,
  `set_id` varchar(800) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment_type`
--

INSERT INTO `equipment_type` (`type_id`, `type_name`, `type_can_borrow`, `type_stock`, `set_id`) VALUES
('001-T01', 'อุปกรณ์กล้อง', 'x', 1, '001'),
('001-T02', 'สายสัญญาณ', 'x', 1, '001'),
('001-T03', 'เลนส์', 'x', 1, '001'),
('002-T01', 'อุปกรณ์กล้อง', 'x', 1, '002'),
('002-T02', 'สายสัญญาณ', 'x', 1, '002'),
('002-T03', 'เลนส์', 'x', 1, '002'),
('003-T01', 'อุปกรณ์กล้อง', 'x', 1, '003'),
('003-T02', 'สายสัญญาณ', 'x', 1, '003'),
('003-T03', 'เลนส์', 'x', 1, '003'),
('004-T01', 'อุปกรณ์กล้อง', 'x', 1, '004'),
('004-T02', 'สายสัญญาณ', 'x', 1, '004'),
('004-T03', 'เลนส์', 'x', 1, '004'),
('005-T01', 'อุปกรณ์กล้อง', 'x', 1, '005'),
('005-T02', 'สายสัญญาณ', 'x', 1, '005'),
('005-T03', 'เลนส์', 'x', 1, '005'),
('006-T01', 'อุปกรณ์กล้อง', 'x', 1, '006'),
('006-T02', 'สายสัญญาณ', 'x', 1, '006'),
('006-T03', 'เลนส์', 'x', 1, '006'),
('007-T01', 'ชุดอุปกรณ์กล้อง 80D', 'o', 1, '007'),
('007-T02', 'ชุดอุปกรณ์กล้อง 70D', 'o', 1, '007'),
('007-T03', 'ชุดอุปกรณ์กล้อง 60D', 'o', 1, '007'),
('007-T04', 'VIDEO CAMERA', 'x', 1, '007'),
('007-T05', 'อุปกรณ์เสียง', 'x', 1, '007'),
('007-T06', 'GRIP', 'x', 1, '007'),
('008-T01', 'GRIP', 'x', 1, '008'),
('008-T02', 'SOUND/MICROPHONE', 'x', 1, '008'),
('009-T01', 'Small Set (Dedo.light)', 'o', 1, '009'),
('009-T02', 'Medium Set', 'o', 1, '009'),
('009-T03', 'Large Set', 'o', 1, '009'),
('009-T04', 'Extra Large Set', 'o', 1, '009'),
('009-T05', 'LED Bicolor Set', 'o', 1, '009'),
('009-T06', 'LED Daylight Set', 'o', 1, '009'),
('009-T07', 'LED Pocket', 'o', 1, '009'),
('009-T08', 'Fluorescent set', 'o', 1, '009'),
('009-T09', 'Dedo Light Extre Large set', 'o', 1, '009'),
('009-T10', 'Kino Flo 4Bank set', 'o', 1, '009'),
('010-T01', 'SPACIAL EQUIPMENT', 'x', 1, '010'),
('011-T01', 'อุปกรณ์', 'x', 1, '011'),
('012-T01', 'อุปกรณ์', 'x', 1, '012'),
('013-T01', 'อุปกรณ์', 'x', 1, '013'),
('014-T01', 'อุปกรณ์', 'x', 1, '014'),
('015-T01', 'อุปกรณ์', 'x', 1, '015'),
('016-T01', 'อุปกรณ์', 'x', 1, '016'),
('017-T01', 'อุปกรณ์', 'x', 1, '017'),
('018-T01', 'อุปกรณ์', 'x', 1, '018'),
('019-T01', 'อุปกรณ์', 'x', 1, '019'),
('020-T01', 'อุปกรณ์', 'x', 1, '020'),
('021-T01', 'อุปกรณ์', 'x', 1, '021');

-- --------------------------------------------------------

--
-- Table structure for table `forgot_password`
--

CREATE TABLE `forgot_password` (
  `dates` date NOT NULL,
  `times` time NOT NULL,
  `username` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(10) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `forgot_password`
--

INSERT INTO `forgot_password` (`dates`, `times`, `username`, `status`) VALUES
('2020-02-14', '13:10:41', 'one', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `maj_id` char(10) NOT NULL DEFAULT '',
  `maj_th_name` varchar(200) NOT NULL DEFAULT '',
  `maj_en_name` varchar(200) NOT NULL DEFAULT '',
  `cou_id` char(20) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `major`
--

INSERT INTO `major` (`maj_id`, `maj_th_name`, `maj_en_name`, `cou_id`) VALUES
('001', 'การออกแบบสื่อปฏิสัมพันธ์และมัลติมีเดีย ', 'Interactive and Multimedia Design', '300046001'),
('002', 'การจัดการธุรกิจไซเบอร์', 'Cyber Business Management', '300046001'),
('003', 'คอมพิวเตอร์เพื่อการสื่อสาร', 'Computer for Communication', '300046001'),
('004', 'การผลิตภาพยนตร์และสื่อดิจิทัล', 'Cinema and Digital Media Production', '300186001'),
('005', 'การแสดงและกํากับการแสดงภาพยนตร์', 'Acting and Directing for Cinema', '300186001'),
('006', 'การออกแบบเพื่องานภาพยนตร์และสื่อดิจิทัล', 'Production Design', '300186001'),
('007', 'การสื่อสารเพื่อการท่องเที่ยว', 'Tourism Communication', '300126102'),
('008', 'การสื่อสารเพื่อสุขภาพ', 'Health Communication', '300126102'),
('009', 'การสื่อสารเพื่อการจัดการนวัตกรรม', 'Innovation Management Communication', '300126102'),
('010', 'การสื่อสารสุขภาพ', 'Health Communication', '951626101'),
('011', 'ภาพยนตร์และสื่อดิจิทัล', 'Cinema Digital Media', '951626101'),
('012', 'นวัตกรรมสื่อสาร', 'Communication Innovation', '951626101');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `mem_id` varchar(50) NOT NULL DEFAULT '',
  `mem_username` varchar(255) DEFAULT 'undefined',
  `mem_password` varchar(200) NOT NULL DEFAULT '',
  `mem_phone` varchar(15) DEFAULT NULL,
  `mem_email` varchar(200) DEFAULT NULL,
  `mem_status` varchar(100) DEFAULT NULL,
  `mem_pic` varchar(500) DEFAULT 'default.png',
  `mem_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `mem_username`, `mem_password`, `mem_phone`, `mem_email`, `mem_status`, `mem_pic`, `mem_type`) VALUES
('00000', 'undefined', '888', '085-555-5555', 'abcd@mail.com', NULL, 'default.png', 'staff'),
('00001', 'admin', 'admin', '087-123-4567', 'admin@mail.com', 'admin', 'admin.png', 'admin'),
('40130010111', 'one', '000', '080-000-0000', 'xyz_13@mail.com', NULL, 'one.jpeg', 'student'),
('59099910999', 'username', '1234', '099-999-8888', 'new_email@mail.com', NULL, '59099910999.png', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `satisfaction_assessment_form`
--

CREATE TABLE `satisfaction_assessment_form` (
  `saf_bor_id` varchar(500) NOT NULL DEFAULT '',
  `saf_score` int(11) DEFAULT 0,
  `saf_comment` text DEFAULT NULL,
  `saf_date` date DEFAULT NULL,
  `saf_staff` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `set`
--

CREATE TABLE `set` (
  `set_id` varchar(100) NOT NULL,
  `set_name` varchar(255) NOT NULL,
  `set_category` varchar(255) NOT NULL,
  `set_pic` varchar(255) NOT NULL,
  `staff_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `set`
--

INSERT INTO `set` (`set_id`, `set_name`, `set_category`, `set_pic`, `staff_id`) VALUES
('001', 'CAMERA A', 'camera', 'camera-a.jpg', '-'),
('002', 'CAMERA B', 'camera', 'camera-b.jpg', '-'),
('003', 'CAMERA C', 'camera', 'camera-c.jpg', '-'),
('004', 'CAMERA D', 'camera', 'camera-d.jpg', '-'),
('005', 'CAMERA E', 'camera', 'camera-e.jpg', '-'),
('006', 'CAMERA F', 'camera', 'camera-f.jpg', '-'),
('007', 'CAMERA Basic', 'camera', 'camera-basic.jpg', '-'),
('008', 'GRIP& SOUND', 'assessory', 'assessory-grip&sound.jpg', '-'),
('009', 'LIGHTING', 'assessory', 'assessory-light.jpg', '-'),
('010', 'SPACIAL EQUIPMENT', 'assessory', 'assessory-spacial.jpg', '-'),
('011', 'IMAC', 'device', 'device-imac.jpg', '-'),
('012', 'IPAD', 'device', 'device-ipad.jpg', '-'),
('013', 'KEYBOARD', 'device', 'device-keyboard.jpg', '-'),
('014', 'LAN CABLE 3-5 M.', 'device', 'device-lan.jpg', '-'),
('015', 'MACBOOK', 'device', 'device-macbook.jpg', '-'),
('016', 'MICROPHONE & SPEAKER', 'device', 'device-mic.jpg', '-'),
('017', 'MOUSE', 'device', 'device-mouse.jpg', '-'),
('018', 'NOTEBOOK', 'device', 'device-notebook.jpg', '-'),
('019', 'PERSONAL COMPUTER', 'device', 'device-pc.jpg', '-'),
('020', 'PLUG 3-5 M.', 'device', 'device-plug.jpg', '-'),
('021', 'WACOM INTUOS PEN', 'device', 'device-wacom.jpg', '-');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` varchar(255) NOT NULL,
  `staff_name` varchar(255) DEFAULT NULL,
  `staff_position` varchar(255) DEFAULT NULL,
  `staff_email` varchar(255) DEFAULT NULL,
  `staff_phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `staff_name`, `staff_position`, `staff_email`, `staff_phone`) VALUES
('00000', 'ตัวอย่าง บุคลากร', 'นักจัดการงานทั่วไป', 'abc@mail.com', '085-000-5555'),
('00001', 'ตัวอย่าง ผู้ดูแล', 'นักจักการงานทั่วไป', 'a23@mail.com', '098-888-9999'),
('10001', 'ผู้ช่วยศาสตราจารย์ ดร.นพดล อินทร์จันทร์ ', 'คณบดีวิทยาลัยนวัตกรรมสื่อสารสังคม', 'noppadoli@hotmail.com', '085-5245661'),
('10002', 'ผู้ช่วยศาสตราจารย์ ดร.ปรวัน แพทยานนท์', 'รองคณบดีฝ่ายบริหาร', 'porawanp@g.swu.ac.th', '063-956-5142'),
('10003', 'อาจารย์ ดร.เสาวลักษณ์ พันธบุตร', 'รองคณบดีฝ่ายวิชาการและวิจัย', 'saowaluck@g.swu.ac.th', '081-355-9355'),
('10004', 'ผู้ช่วยศาสตราจารย์ ดร.ศรีรัฐ ภักดีรณชิต', 'รองคณบดีฝ่ายแผนและประกันคุณภาพ', 'coscisrirath@gmail.com', '081-100-2051'),
('10005', 'อาจารย์ ดร.รินบุญ นุชน้อมบุญ', 'รองคณบดีฝ่ายพัฒนาศักยภาพนิสิต', 'rinbun@g.swu.ac.th', '084-377-1712'),
('10006', 'อาจารย์ ดร.หม่อมหลวงอุสุมา สุขสวัสดิ์', 'หัวหน้าสาขาภาพยนตร์และสื่อดิจิทัล', 'usuma@hotmail.com', '081-692-2069'),
('10007', 'ผู้ช่วยศาสตราจารย์ ดร.จารุวัส หนูทอง', 'ผู้ช่วยศาสตราจารย์', 'dr.jaruwat@gmail.com', '090-154-6545'),
('10008', 'ผู้ช่วยศาสตราจารย์ ดร.สามมิติ สุขบรรจง', 'ผู้ช่วยศาสตราจารย์', 'sammiti@gmail.com', '090-941-7948'),
('10009', 'อาจารย์ภัทรนันท์ ไวทยะสิน', 'ผู้ช่วยคณบดีฝ่ายเทคโนโลยีสารสนเทศและประชาสัมพันธ์', 'aui.amada@gmail.com', '096-292-4195'),
('10010', 'อาจารย์ ดร.อภิเชฐ กำภู ณ อยุธยา ', 'อาจารย์', 'guionearth@gmail.com', '098-569-5957'),
('10011', 'อาจารย์ ดร.ไกรวุฒิ จุลพงศธร', 'อาจารย์', 'teandyou@hotmail.com', '081-810-1375'),
('10012', 'อาจารย์อธิป เตชะพงศธร', 'อาจารย์', 'athip@g.swu.ac.th', '081-424-9090'),
('10013', 'อาจารย์อรรถศิษฐ์ พัฒนะศิริ', 'หัวหน้าสาขาคอมพิวเตอร์มัลติมีเดียและธุรกิจไซเบอร์', 'toattasit@gmail.com', '083-118-8777'),
('10014', 'ผู้ช่วยศาสตราจารย์ ดร.ประมา ศาสตระรุจิ', 'ผู้ช่วยศาสตราจารย์', 'ppeekkk@yahoo.com', '090-503-9999'),
('10015', 'ผู้ช่วยศาสตราจารย์ ดร.ฐะณุพงศ์ ศรีกาฬสินธุ์', 'ผู้ช่วยศาสตราจารย์', 'srikalsin@gmail.com', '090-294-5636'),
('10016', 'อาจารย์ ดร.วรรณยศ บุญเพิ่ม', 'อาจารย์', 'wannayos@gmail.com ', '081-831-4322'),
('10017', 'อาจารย์ ดร.อัญชนา กลิ่นเทียน', 'อาจารย์', 'unapor@gmail.com', '097-969-5951'),
('10018', 'อาจารย์ ดร.วีระนันท์ คำนึงวุฒิ', 'อาจารย์', 'raetae7@hotmail.com', '097-969-4565'),
('10019', 'อาจารย์ ดร.เบญจวรรณ อารักษ์การุณ', 'อาจารย์', 'benjawanar@gmail.com', '084-110-9555'),
('10020', 'อาจารย์ ดร.ฉัตรเมือง เผ่ามานะเจริญ', 'อาจารย์', 'achatcyber@gmail.com', '081-206-7331'),
('10021', 'อาจารย์ ดร.ฐิศิรักน์ โปตะวณิช', 'อาจารย์', 'Tisiruk.p@gmail.com', '081-888-9666'),
('10022', 'อาจารย์เอกลักษณ์ โภคทรัพย์ไพบูลย์', 'อาจารย์', 'akee8eak@hotmail.com', '086-509-3071'),
('10023', 'อาจารย์สิทธิชัย วรโชติกำจร   ', 'ผู้ช่วยคณบดีฝ่ายพัฒนาระบบงานและระบบดิจิทัล', 'sittichaiw@g.swu.ac.th', '081-458-1368'),
('10024', 'อาจารย์พัชราภรณ์ วรโชติกำจร', 'อาจารย์', 'patcharaporn@g.swu.ac.th', '084-122-2674'),
('10025', 'อาจารย์อภิชญา อังคะวิภาต ', 'อาจารย์', 'juniordesign@icloud.com', '089-144-5937'),
('10026', 'อาจารย์อภิรพี เศรษฐรักษ์ ตันเจริญวงศ์', 'หัวหน้าสาขานวัตกรรมการสื่อสาร', 'apirapee@hotmail.com', '081-917-9127'),
('10027', 'อาจารย์อาทิตยา ทรัพย์สินวิวัฒน์', 'ผู้ช่วยคณบดีฝ่ายบริการวิชาการแก่ชุมชน', 'noon_imp@hotmail.com', '095-636-9549'),
('10028', 'ผู้ช่วยศาสตราจารย์ ดร.กฤชณัท แสนทวี', 'ผู้ช่วยศาสตราจารย์', 'arjarn.news@hotmail.com', '081-010-5004'),
('10029', 'อาจารย์ ดร.ภัทธิรา ธีรสวัสดิ์', 'อาจารย์', 'gwanghtc@gmail.com', '083-072-6655'),
('10030', 'อาจารย์ ดร.ศศิธร ยุวโกศล', 'อาจารย์', 'sasithon.y@gmail.com', '086-781-8818'),
('10031', 'อาจารย์ ดร.ชัชฎา อัครศรีวร นากาโอคะ', 'อาจารย์', 'chatchada@g.swu.ac.th ', '097-961-4195'),
('10032', 'อาจารย์ ดร.ชนญญา ชัยวงศ์โรจน์', 'อาจารย์', 'chaiwong_non@hotmail.com', '094-641-5141'),
('10033', 'อาจารย์ ดร.ปรัชญา เปี่ยมการุณ', 'อาจารย์', 'prachaya@g.swu.ac.th', '089-811-8454'),
('10034', 'อาจารย์ยุคลวัชร์ ภักดีจักริวุฒิ์', 'อาจารย์', 'yukolwat@gmail.com', '081-407-9362'),
('10035', 'อาจารย์กิติศักดิ์ เยาวนานนท์', 'อาจารย์', 'itan707@gmail.com', '089-734-3569'),
('10036', 'อาจารย์สุภฆเณศร์ ชุณหศิริรักษ์', 'อาจารย์', 'Supkanate@gmail.com', '086-970-8346'),
('10037', 'อาจารย์ ดร.ปิลันลน์ ปุณญประภา', 'หัวหน้าศูนย์นวัตกรรมและวิทยบริการ', 'heartpilan@yahoo.com', '086-785-1114'),
('10038', 'อาจารย์ทิพภาวรรณ พลล่องช้าง', 'อาจารย์', 'Nanthip.1011@gmail.com ', '087-521-4513'),
('10039', 'Mr. Martin Brian Holland ', 'อาจารย์', '', ''),
('20001', 'นายวรทัศน์ วัฒนชีวโนปกรณ์', 'ผู้อำนวยการสำนักงานคณบดี ', 'choompol_w@hotmail.com', '086-565-1590'),
('20002', 'ว่าที่ร้อยตรีหญิงสุกัญญา สังสระน้อย', 'นักจัดการงานทั่วไป (งานประกันคุณภาพ)', 'sukanyasu@g.swu.ac.th', '089-081-8439'),
('20003', 'นางสาววิรงรอง ว่องวิทย์', 'นักวิชาการพัสดุ', 'kittysom2011@hotmail.com', '086-155-4661'),
('20004', 'นางสาวสุธาดา นุกูลวุฒิโอภาส', 'นักวิชาการศึกษา (งานวิชาการ)', 'cher_stat@hotmail.com', '090-942-9698'),
('20005', 'นายณภัทร สุบรรณพงษ์', 'นักวิชาการโสตทัศนศึกษา', 'napatsu@hotmail.com', '084-137-3731'),
('20006', 'นางสาวณัฏฐนันท์ สุวงศ์ษา', 'นักวิชาการศึกษา (งานวิชาการและวิจัย)', 'psuwongsa16@gmail.com', '097-083-6352'),
('20007', 'นายสิทธิพัทธิ์ ไหลท่วมทวีกุล', 'นักวิชาการโสตทัศนศึกษา', 'arm_gondola@hotmail.com', '087-814-8046'),
('20008', 'นางสาวสุรี ม่วงศรี', 'นักจัดการงานทั่วไป (งานสารบรรณ)', 'sureesa@g.swu.ac.th', '092-393-9039'),
('20009', 'นาวสาวจิตภาพร เกษประดิษฐ์', 'นักวิชาการเงินและบัญชี', 'Keep_2011@hotmail.com', '085-939-0155'),
('20010', 'นายสาวิทย์ ปัญญาสิทธิ', 'นักวิชาการพัสดุ', 'sawit_pinyasitti@hotmail.com', '089-482-2328'),
('20011', 'นางสาวอุบลวรรณ บุญบำรุง', 'นักจัดการงานทั่วไป (เลขานุการ)', 'gift.Dspace2@gmail.com', '082-220-1882'),
('20012', 'นางสาวเพียงออ ศรแก้ว', 'นักวิชาการศึกษา (งานกิจการนิสิต)', 'piang-or@g.swu.ac.th', '086-055-7880'),
('20013', 'นายปัญญา คำมี', 'นักวิชาการพัสดุ', 'punya@g.swu.ac.th', '086-800-9294'),
('20014', 'นางสาวฉันธพิชญ์ สุขสมบัติ', 'นักวิชาการการเงิน และบัญชี', 'chantapitchs@gmail.com', '099-421-1429'),
('20015', 'นายอลงกรณ์ อัมมวงศ์จิตต์', 'นักสื่อสารองค์กร', 'alongkon@g.swu.ac.th', '092-553-8206'),
('20016', 'นางสาววิลาวัลย์ ม่วงพลับ', 'นักทรัพยากรบุคคล', 'wilawan.swu@gmail.com', '086-410-6788'),
('20017', 'นายจิรพันธ์ บุญภา', 'พนักงานบริการ ', 'mansam777999@gmail.com', '062-814-8886'),
('20018', 'นางสาวสิรินภา ชาวกัณหา', 'พนักงานบริการ ', 'sirinapa.cosci.swu@gmail.com', '082-610-0160'),
('20019', 'นายสุทธิรักษ์ พรรณโภชน์', 'นักวิชาการพัสดุ', 'ruk_sutthiruk_altosax@hotmail.com', '086-394-3361'),
('20020', 'นางสาวยลรวี ฉัตรศิริเวช', 'นักวิชาการศึกษา (งานวิชาการ และบัณฑิตศึกษา)', 'yolawee@gmail.com', '089-738-5745'),
('20021', 'นางสาวปวีณา ศิลาสุวรรณ', 'นักจัดการงานทั่วไป (งานแผน)', 'pavee.03@hotmail.com', '081-356-6382'),
('20022', 'นายนิธิธัช จุลมกร', 'นักวิชาการคอมพิวเตอร์', 'gun.024580185@gmail.com', '085-048-8813'),
('20023', 'นายสมิทธ์ แย้มสำราญ', 'นักจัดการงานทั่วไป (งานบริการวิชาการแก่ชุมชน)', 'smith.yamsamran@gmail.com', '085-611-5619'),
('20024', 'นายเอนก สังสระน้อย', 'นักวิชาการศึกษา (งานกิจการนิสิต)', 'anaks2532@gmail.com', '063-765-5307'),
('20025', 'นางสาวธนธรณ์ ประสิทธิเกตุ', 'นักจัดการงานทั่วไป  (งานทรัพยากรบุคคล) ', 'tanatorn.tong@g.swu.ac.th', '087-511-9364'),
('20026', 'นายธีรพงษ์ บุตรวงศ์', 'นักจัดการงานทั่วไป (งานโสตทัศนูปกรณ์)', 'teerapong17-7@hotmail.com', '098-259-6591'),
('20027', 'นางสาวมีน เจริญรัศมี', 'นักวิชาการศึกษา', 'Meen.ratsami@gmail.com', '094-497-4450'),
('20028', 'นางสาวปทิตา มุทิตาภรณ์', 'นักจัดการงานทั่วไป', 'fair1@windowslive.com', '081-487-7246'),
('20029', 'นายณัฐพนธ์ อิทธินิรันดร', 'นักจัดการงานทั่วไป (งานคอมพิวเตอร์)', 'Nuttapol.nuth@gmail.com', '085-383-7778');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `stu_id` varchar(20) NOT NULL DEFAULT '',
  `stu_name` varchar(255) NOT NULL DEFAULT '',
  `stu_en_name` varchar(255) NOT NULL DEFAULT '',
  `stu_group` varchar(50) NOT NULL DEFAULT '',
  `stu_year_admission` int(11) DEFAULT NULL,
  `stu_major` char(10) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`stu_id`, `stu_name`, `stu_en_name`, `stu_group`, `stu_year_admission`, `stu_major`) VALUES
('40130010111', 'นาย ตัวอย่าง ตัวอย่าง', 'M', 'IC13', 2540, '003'),
('59099910999', 'ตัวอย่าง ชื่อนิสิต', 'MISS STUDENT', 'IC', 2559, '003'),
('59130010270', 'นางสาวชญานันท์ ศรีนิธิกีรติสาธร', 'MISSCHAYANAN SRINITHIKEERATISATORN', 'IC43', 2559, '003'),
('59130010274', 'นางสาวณริฎฐา อัศวสุนทรางกูร', 'MISSNARITTHA ASTSAWASUNGTARANGKOON', 'IC43', 2559, '003'),
('59130010276', 'นางสาวณัฐกฤตา ตาสุยะ', 'MISSNATTAKRITTA TASUYA', 'IC43', 2559, '003'),
('59130010279', 'นางสาวณัฐพร ประทุมสูตร', 'MISSNATTAPORN PRATHUMSOOTR', 'IC43', 2559, '003'),
('59130010295', 'นางสาวมินตรา บุญชู', 'MISSMINTRA BOONCHU', 'IC43', 2559, '003'),
('59130010407', 'นางสาวศุทธินี สัจจมาศ', 'MISSSUTTHINEE SATCHAMAT', 'IC4IA', 2559, '001'),
('60130010005', 'นางสาวจิราพัชร เต็งชัยศรี', 'MISSJIRAPAT TENGCHAISRI', 'IC31', 2560, '001'),
('60130010006', 'นางสาวชญานี จันทร์อินทร์', 'MISSCHAYANEE CHAN-IN', 'IC31', 2560, '001'),
('60130010008', 'นางสาวชัญญา งามสินจำรัส', 'MISSCHANYA NGAMSINJAMRAS', 'IC31', 2560, '001'),
('60130010009', 'นางสาวชัญญา เฉลิมธนาชัยกุล', 'MISSCHANYA CHALERMTANACHAIKUL', 'IC31', 2560, '001'),
('60130010011', 'นางสาวฐิตินันท์ คงเชื้อ', 'MISSTHITINUN KHONGCHUA', 'IC31', 2560, '001'),
('60130010013', 'นางสาวณัฏฐธิดา คล่องคณิตสรณ์', 'MISSNATTATIDA KLONGKANITSORN', 'IC31', 2560, '001'),
('60130010017', 'นางสาวณิชากร อ้องแสนคำ', 'MISSNICHAKORN ONGSANKOM', 'IC31', 2560, '001'),
('60130010018', 'นางสาวตรงตรอง ยามี', 'MISSTHRONGTRONG YAMEE', 'IC31', 2560, '001'),
('60130010024', 'นางสาวธัญดา ชญานนท์วิกุล', 'MISSTHANDA CHAYANONWIKUN', 'IC31', 2560, '001'),
('60130010031', 'นางสาวปัญญาใจ คเณวัน', 'MISSPUNYACHAI KANEWAN', 'IC31', 2560, '001'),
('60130010045', 'นางสาวภูฟ้า กล้วยไม้ ณ อยุธยา', 'MISSPHUFA KLUYMAI NA AYUDHYA', 'IC31', 2560, '001'),
('60130010048', 'นางสาวรักษ์พิรัช รักชิด', 'MISSRAKPIRACH RAKCHID', 'IC31', 2560, '001'),
('60130010049', 'นางสาวรัตตา ศรีส่ง', 'MISSRATTA SRISONG', 'IC31', 2560, '001'),
('60130010050', 'นางสาวรัตมา ใจเพียรทอง', 'MISSRATTAMA CHAIPIANTHONG', 'IC31', 2560, '001'),
('60130010063', 'นางสาวอลิษา นาคปาน', 'MISSALISA NAKPAN', 'IC31', 2560, '001'),
('60130010067', 'นายบูชา บูรณะชัยทวี', 'MISTERBUCHA BURANACHAITAWEE', 'IC32', 2560, '002'),
('60130010069', 'นายพัชรพล อินทรมาศ', 'MISTERPATCHARAPOL INTHARAMAS', 'IC32', 2560, '002'),
('60130010070', 'นางสาวมิลคาห์ รักษาแก้ว', 'MISSMILCHA RAKSAKAEW', 'IC32', 2560, '002'),
('60130010071', 'นายวงศ์วรัญ ชูสงค์', 'MISTERWONGWARAN CHUSONG', 'IC32', 2560, '002'),
('60130010347', 'นางสาวจีรัชฌา เพชรแดง', 'MISS JEERATCHA PHETDANG', 'IC33', 2560, '003'),
('60130010358', 'นางสาวกัณญาภัค ทิพยเสม', 'MISSKANYAPHAK TIPPAYASEM', 'IC32', 2560, '002'),
('60130010378', 'นางสาวบุญจิรา เทพประสาท', 'MISSBOONJIRA THEPPRASARD', 'IC32', 2560, '002'),
('60130010388', 'นายพีรวัส พิมลศิริ', 'MISTERPEERAWAT PIMOLSIRI', 'IC32', 2560, '002'),
('60130010389', 'นายภูสิทธิ ชัยผาติกุล', 'MISTERPHUSIT CHAIPHATIKUL', 'IC32', 2560, '002'),
('60130010392', 'นายรัชชานนท์ ภู่อินทร์', 'MISTERRATCHANON POOIN', 'IC32', 2560, '002'),
('60130010393', 'นายวรธน จิรอักษรกุล', 'MISTERVORATANA JIRAAUKSORNKUL', 'IC32', 2560, '002'),
('60130010396', 'นางสาวศศิภา โพธิ์งาม', 'MISSSASIPA PONGAM', 'IC32', 2560, '002'),
('60130010405', 'นางสาวอารียา ลิมปนวัสส์', 'MISSAREEYA LIMPANAVAS', 'IC32', 2560, '002'),
('60130010407', 'นายกรวิชญ์ ไทยสุริยะ', 'MISTER KORRAWICH THAISURIYA', 'IC33', 2560, '003'),
('60130010409', 'นางสาวกุนธี อุดมกาญจนชัย', 'MISS KUNNATEE UDOMKANCHANACHAI', 'IC33', 2560, '003'),
('60130010413', 'นายเจษฎา เวสา', 'MISTER JEDSADA WESA', 'IC33', 2560, '003'),
('60130010415', 'นางสาวชรินทิพย์ ตรีสิทธิมากุล', 'MISS CHARINTHIP TRISITTHIMAKUL', 'IC33', 2560, '003'),
('60130010418', 'นายฐิติโชติ อินทะรังษี', 'MISTER TITICHOT INTARUNGSEE', 'IC33', 2560, '003'),
('60130010421', 'นางสาวณัฏฐาเนตร ฟักไพโรจน์', 'MISS NATTANET FAKPAIROJ', 'IC33', 2560, '003'),
('60130010431', 'นายธราธร ละอองทิพรส', 'MISTER THARATHORN LAONGTIPAROS', 'IC33', 2560, '003'),
('60130010432', 'นางสาวธันยา ชินราช', 'MISS TANYA CHINNARAT', 'IC33', 2560, '003'),
('60130010433', 'นางสาวนภาพร พิมพ์ประโพธ', 'MISS NAPAPORN PIMPRAPOTE', 'IC33', 2560, '003'),
('60130010439', 'นายพิพัฒน์ อมรกิจธำรง', 'MISTER PIPAT AMORNKITTUMRONH', 'IC33', 2560, '003'),
('60130010448', 'นางสาวรวิพร กอวีรสกุลชัย', 'MISS RAVIPORN KORVERASAKULCHAI', 'IC33', 2560, '003'),
('60130010450', 'นายลัทธพล พุ่มมาก', 'MISTER LATTAPHON PHUMMAK', 'IC33', 2560, '003'),
('60130010455', 'นางสาวศุภรัตน์ วิทยสุจินต์', 'MISS SUPARAT VITHAYASUJIN', 'IC33', 2560, '003'),
('60130010458', 'นายสาธิต แน่งน้อย', 'MISTER SATIT NANGNOI', 'IC33', 2560, '003'),
('60130010461', 'นางสาวเสาวภาคย์ สุวรรณไตยรัตน์', 'MISS SAOWAPAK SUWANTAIRAT', 'IC33', 2560, '003'),
('60130010465', 'นางสาวอุษณิษา สาลีสาย', 'MISS UDSANISA SALEESAI', 'IC33', 2560, '003'),
('61130010030', 'นายณัฐปคัลภ์  ขุนจันทร์', 'MISTER NATTHAPHAKHAN  KHUNCHAN', 'IC23', 2561, '003'),
('61130010031', 'นางสาวณัฐวดี  หอมรสสุคนธ์', 'MISS NATTAVADEE  HOMROSSUKHON', 'IC23', 2561, '003'),
('61130010035', 'นายรชพล  บุรินทร์วัฒนา', 'MISTER RACHAPOL  BURINWATTHANA', 'IC23', 2561, '003'),
('61130010039', 'นางสาวกมลพัช  แผ่นทอง', 'MISS KAMONLAPAT  PHAENTHONG', 'IC23', 2561, '003'),
('61130010180', 'นายทินกฤต  จตุพรพงศกร', 'MISTER TINNAKRIT  JATUPORNPONGSAKORN', 'IC23', 2561, '003'),
('61130010186', 'นายภาณุพัฒน์  ศรีพยัคฆเศวต', 'MISTER PANUPAT  SRIPHAYAKSWET', 'IC23', 2561, '003'),
('61130010187', 'นายรวิศุทธ์  อ่อนน้อม', 'MISTER RAVISUIT  ONNOM', 'IC23', 2561, '003'),
('61130010188', 'นางสาวรวิสรา  เลิศจันทร์เพ็ญ', 'MISS RAWISARA  LERDCHANPEN', 'IC23', 2561, '003'),
('61130010189', 'นายรัตนโชติ  พูลสวัสดิ์', 'MISTER RATTANACHORT  POONSAWAD', 'IC23', 2561, '003'),
('61130010304', 'นายคณาพงษ์  วังรุ่งเรืองกิจ', 'MISTER KANAPONG  WANGRUNGRUANGKIT', 'IC23', 2561, '003'),
('61130010305', 'นายจิรัฏฐ์  เสถียรพงศ์', 'MISTER JIRAD  SATHIENPONG', 'IC23', 2561, '003'),
('61130010306', 'นางสาวญาธิดา  ปัญจพัฒน์ทวี', 'MISS YATHIDA  PANJAPATTHAVEE', 'IC23', 2561, '003'),
('61130010307', 'นายณวี  วิจิตรรัตน์', 'MISTER NAVEE  VIJITRAT', 'IC23', 2561, '003'),
('61130010308', 'นายณัฐพงษ์  วงษ์แสงไพบูลย์', 'MISTER NATTAPONG  WONGSANGPAIBOON', 'IC23', 2561, '003'),
('61130010309', 'นายณัฐพนธ์  ปิ่นณรงค์', 'MISTER NUTTAPON  PINNARONG', 'IC23', 2561, '003'),
('61130010311', 'นายพงศธร  โทกูดะ', 'MISTER PHONGSATHORN  TOKUDA', 'IC23', 2561, '003'),
('61130010312', 'นายภควัต  ทิพย์โส', 'MISTER PAKAWAT  TIPSO', 'IC23', 2561, '003'),
('61130010313', 'นายภาณุพงศ์  วิมานรัมย์', 'MISTER PANUPONG  WIMANRUM', 'IC23', 2561, '003'),
('61130010314', 'นางสาววรรณวิมล  เจนอัศวเมธี', 'MISS WANWIMOL  JAENASAVAMETHEE', 'IC23', 2561, '003'),
('61130010317', 'นางสาวศุภกานต์  เลี้ยงรัตนานนท์', 'MISS SUPAHKARN  LIANGRATTANANONT', 'IC23', 2561, '003'),
('61130010318', 'นางสาวสรัญญา  นาคงาม', 'MISS SARANYA  NAKNGAM', 'IC23', 2561, '003'),
('61130010320', 'นายอานนท์  พัฒนศิริ', 'MISTER ARNON  PHATTANASIRI', 'IC23', 2561, '003'),
('61130010394', 'นายโชคชัย  สวัสดิ์พานิชย์', 'MISTER CHOKCHAI  SAWATPANIT', 'IC23', 2561, '003'),
('61130010400', 'นางสาวธิติกานต์  แก้วทิพย์เนตร', 'MISS THITIKARN  KAEWTIPPANET', 'IC23', 2561, '003'),
('61130010401', 'นายพชร  น้อยสันติ', 'MISTER PACHARA  NOISANTI', 'IC23', 2561, '003'),
('61130010424', 'นายพัชรพล  พัชรากิตติ', 'MISTER PHATCHARAPHON  PATCHARAKITTI', 'IC23', 2561, '003'),
('61130010425', 'นางสาวรักษาสิริ  ศรีโพธิ์ชัย', 'MISS RUKSASIRI  SRIPHOCHAI', 'IC23', 2561, '003');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `sub_id` varchar(100) NOT NULL DEFAULT '',
  `sub_th_name` varchar(255) NOT NULL DEFAULT '',
  `sub_en_name` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`sub_id`, `sub_th_name`, `sub_en_name`) VALUES
('CDM111', 'ความรู้เบื้องต้นเกี่ยวกับภาพยนตร์และสื่อดิจิทัล', 'Introduction to Cinema and Digital Media'),
('CDM112', 'การวิเคราะห์บท', 'Script Analysis'),
('CDM121', 'การถ่ายภาพดิจิทัล', 'Digital Photography'),
('CDM122', 'ความรู้เบื้องต้นเกี่ยวกับเทคโนโลยีในการผลิตภาพยนตร์', 'Introduction for Cinema Production Technology'),
('CDM123', 'งานผลิตภาพยนตร์และสื่อดิจิทัล 1', 'Cinema and Digital Media Production I'),
('CDM131', 'การแสดงเพื่องานภาพยนตร์ 1', 'Acting for Cinema 1'),
('CDM132', 'การกํากับการแสดงภาพยนตร์ 1', 'Directing for Cinema 1'),
('CDM133', 'เทคนิคการออกเสียง', 'Vocal Technique'),
('CDM141', 'สเก็ตซ์และการวาดภาพ', 'Sketch and Drawing'),
('CDM142', 'ประวัติศาสตร์และสไตล์ของเครื่องแต่งกาย', 'History and Style of Costume'),
('CDM143', 'เทคนิควาดระบายสีในสื่อดิจิทัล', 'Rendering Technique in Digital Media'),
('CDM211', 'ประวัติศาสตร์ภาพยนตร์', 'History of Cinema'),
('CDM212', 'ความคิดรวบยอดและสไตล์', 'Concept and Style'),
('CDM213', 'สุนทรียะและการวิจารณ์ในงานภาพยนตร์', 'Cinema Aesthetics and Criticism'),
('CDM214', 'จรรยาบรรณและกฎหมายด้านสื่อดิจิทัล', 'Ethics and Law in Digital Media'),
('CDM221', 'งานผลิตภาพยนตร์และสื่อดิจิทัล 2', 'Cinema and Digital Media Production II'),
('CDM222', 'การตัดต่อ', 'Editing'),
('CDM223', 'การบริหารการผลิต', 'Production Management'),
('CDM224', 'การผลิตงานเพื่อความบันเทิง', 'Entertainment Production'),
('CDM231', 'การเขียนบทเพื่องานภาพยนตร์', 'Script Writing for Cinema'),
('CDM232', 'การแสดงเพื่องานภาพยนตร์ 2', 'Acting for Cinema 2'),
('CDM233', 'ความรู้เบื้องต้นเกี่ยวกับการผลิตภาพยนตร์', 'Introduction to Cinema Production'),
('CDM234', 'การกํากับการแสดงภาพยนตร์ 2', 'Directing for Cinema 2'),
('CDM241', 'การแต่งหน้าเพื่องานภาพยนตร์', 'Makeup for Cinema'),
('CDM242', 'การออกแบบฉากเพื่องานภาพยนตร์', 'Set Design for Cinema'),
('CDM243', 'ยุคสมัยและสไตล์', 'Period and Style'),
('CDM244', 'การออกแบบเครื่องแต่งกายเพื่องานภาพยนตร์', 'Costume Design for Cinema'),
('CDM311', 'งานวิจัยและการประยุกต์ใช้ความรู้เพื่องานภาพยนตร์', 'Research and Knowledge Application for Cinema'),
('CDM321', 'การผลิตภาพยนตร์สารคดี', 'Documentary Production'),
('CDM322', 'ชาติพันธุ์และการนําเสนอประเด็นในงานภาพยนตร์และสื่อดิจิทัล', 'Ethnicity and Representation in Cinema and Digital Media'),
('CDM323', 'เทคนิคพิเศษเพื่องานภาพยนตร์', 'Special Effects for Cinema'),
('CDM324', 'การถ่ายทำภาพยนตร์ระบบดิจิทัล', 'Digital Cinematography'),
('CDM325', 'แสงและสื่อร่วมสมัย', 'Lighting and Contemporary Media'),
('CDM331', 'กระบวนการและการคัดเลือกนักแสดง', 'Casting and Audition'),
('CDM332', 'การเขียนบทสร้างสรรค์', 'Creative Script Writing'),
('CDM333', 'การแสดงเพื่องานภาพยนตร์ 3', 'Acting for Cinema 3'),
('CDM341', 'การออกแบบเพื่องานภาพยนตร์', 'Production Design'),
('CDM342', 'การสร้างอุปกรณ์การแสดงเพื่องานภาพยนตร์', 'Hand Craft for Cinema'),
('CDM351', 'โครงงานผลิตภาพยนตร์', 'Cinema Production Project'),
('CDM421', 'การออกแบบเสียงในสื่อดิจิทัล', 'Sound Design in Digital Media'),
('CDM422', 'สตอรี่บอร์ด', 'Storyboard'),
('CDM431', 'การบริหารจัดการศิลปิน', 'Artists Management'),
('CDM441', 'การออกแบบและจัดสร้างเครื่องแต่งกาย', 'Costume Design and Construction'),
('CDM442', 'เทคนิคพิเศษในการแต่งหน้าเพื่องานภาพยนตร์', 'Special Effects Makeup for Cinema'),
('CDM443', 'การออกแบบแสงเพื่องานภาพยนตร์', 'Lighting Design for Cinema'),
('CDM451', 'การฝึกงานทางวิชาชีพ', 'Professional Practice'),
('CDM452', 'การศึกษาเฉพาะเรื่อง', 'Independent Study'),
('CDM453', 'ภาพยนตร์นิพนธ์', 'Cinema Thesis'),
('COS101', 'เทคนิคการเล่าเรื่องในงานภาพยนตร์และสื่อดิจิทัล', 'Narrative Techniques in Cinema and Digital Media'),
('COS102', 'ความรู้เบื้องต้นด้านสื่อสารมวลชนและสื่อดิจิทัล', 'Introduction to Mass Communication and Digital Media'),
('COS103', 'สุนทรียศาสตร์ร่วมสมัย', 'Contemporary Aesthetics'),
('COS104', 'สื่อศึกษา', 'Media Studies'),
('COS105', 'เทคโนโลยีสารสนเทศและการสื่อสาร', 'Information and Communication Technology'),
('COS201', 'ทักษะการสื่อสารสําหรับการผลิตสื่อ', 'Communication Skills for Media Production'),
('COS202', 'ภูมิปัญญาไทยและเอเชีย', 'Thai and Asian Wisdom'),
('COS203', 'แนวคิดและนวัตกรรมการออกแบบ', 'Concept and Design Innovation'),
('COS204', 'ความรู้เบื้องต้นเกี่ยวกับการสื่อสารเพื่อการพัฒนา', 'Introduction to Development Communication'),
('COS205', 'นวัตกรรมการสื่อสาร', 'Communication Innovation'),
('COS301', 'การจัดการอุตสาหกรรมสร้างสรรค์', 'Creative Industry Management'),
('COS302', 'พฤติกรรมผู้บริโภค', 'Consumer Behavior'),
('COS401', 'กระแสกับธุรกิจ', 'Trends and Business'),
('CSC111', 'การออกแบบกราฟิกเบื้องต้นเพื่อสื่อปฏิสัมพันธ์', 'Introduction to Graphics Design for Interactive Media'),
('CSC112', 'การร่างภาพและทักษะการวาดเส้น', 'Sketching and Drawing Skills'),
('CSC113', 'หลักการสร้างภาพเคลื่อนไหว', 'Principle of Animation'),
('CSC114', 'การออกแบบสื่อปฏิสัมพันธ์เพื่องานมัลติมีเดีย', 'Interactive Design for Multimedia'),
('CSC131', 'หลักการตลาด', 'Principles of Marketing'),
('CSC132', 'ธุรกิจอิเล็กทรอนิกส์เบื้องต้น', 'Introduction to E-Business'),
('CSC133', 'ระบบสารสนเทศเพื่อการจัดการ', 'Management Information System'),
('CSC141', 'การสื่อสารทางธุรกิจ', 'Business Communication'),
('CSC151', 'เทคโนโลยีอินเตอร์เน็ต', 'Internet Technology'),
('CSC152', 'โครงสร้างข้อมูลและขั้นตอนวิธี', 'Data Structure and Algorithms'),
('CSC153', 'การเขียนโปรแกรมคอมพิวเตอร์', 'Computer Programming'),
('CSC161', 'คณิตศาสตร์สําหรับคอมพิวเตอร์เพื่อการสื่อสาร', 'Mathematics for Computers Communication'),
('CSC211', 'ประวัติศาสตร์ศิลป์และการออกแบบ', 'Art and Design History'),
('CSC221', 'สตอรี่บอร์ดและการลําดับภาพ', 'Storyboard and Editing'),
('CSC222', 'โครงเรื่องและตัวละคร', 'Plot and Character'),
('CSC223', 'การออกแบบภาพเคลื่อนไหวสามมิติ', '3D Modeling and Rendering'),
('CSC224', 'เทคนิคพิเศษทางภาพในการออกแบบสื่อดิจิทัล', 'Visual Effect for Digital Media Design'),
('CSC225', 'การวาดภาพและการลงสีเพื่องานภาพเคลื่อนไหวในระบบดิจิทัล', 'Digital Drawing and Painting for Animation'),
('CSC226', 'การผลิตวีดิทัศน์', 'Video Production'),
('CSC232', 'การออกแบบสื่อดิจิทัล', 'Digital Media Design'),
('CSC241', 'การชําระเงินทางอิเล็กทรอนิกส์', 'E-Payment'),
('CSC242', 'กลยุทธ์ธุรกิจอิเล็กทรอนิกส์', 'E-Business Strategies'),
('CSC251', 'ระบบการจัดการฐานข้อมูล', 'Database Management Systems'),
('CSC252', 'การวิเคราะห์และออกแบบระบบ', 'System Analysis and Design'),
('CSC261', 'การเขียนโปรแกรมเชิงวัตถุ', 'Object Oriented Programming'),
('CSC262', 'ปฏิสัมพันธ์ระหว่างคอมพิวเตอร์และมนุษย์', 'Human Computer Interaction'),
('CSC263', 'เครือข่ายคอมพิวเตอร์', 'Computer Network'),
('CSC264', 'การพัฒนาสื่อปฏิสัมพันธ์บนเว็บเพจ', 'Interactive Web Page Development'),
('CSC271', 'จริยธรรมและประเด็นทางกฎหมายเทคโนโลยีสารสนเทศ', 'Ethic and Issues in Information Technology Laws'),
('CSC321', 'ภาพเคลื่อนไหวสามมิติ', '3D Animation'),
('CSC322', 'โมชั่นกราฟิกเพื่องานมัลติมีเดีย', 'Motion Graphic for Multimedia'),
('CSC323', 'การสร้างแบรนด์และการออกแบบอัตลักษณ์', 'Branding and Identity Design'),
('CSC324', 'การออกแบบสื่อสิ่งพิมพ์ในระบบดิจิทัล', 'Digital Publishing Design'),
('CSC325', 'การออกแบบสื่อปฏิสัมพันธ์บนเว็บเพจ', 'Interactive Web Page Design'),
('CSC326', 'การศึกษาเฉพาะเรื่องสำหรับการออกแบบสื่อปฏิสัมพันธ์และมัลติมีเดีย', 'Independent Study for Interactive and Multimedia Design'),
('CSC331', 'การบัญชีและการเงิน', 'Accounting and Finance'),
('CSC341', 'การจัดการธุรกิจระหว่างประเทศ', 'International Business Management'),
('CSC342', 'การบริหารความเสี่ยงในธุรกิจอิเล็กทรอนิกส์', 'Risk Management in E-Business'),
('CSC343', 'การตลาดในระบบดิจิทัล', 'Digital Marketing'),
('CSC344', 'การจัดการนำเข้าและส่งออกเพื่อธุรกิจอิเล็กทรอนิกส์', 'Import and Export Management for E-Business'),
('CSC345', 'การวิเคราะห์ข้อมูลขนาดใหญ่', 'Big Data Analytics'),
('CSC346', 'การวางแผนช่องทางการเข้าถึงลูกค้า', 'Customer Touchpoint Planning'),
('CSC347', 'การสร้างสรรค์แคมเปญออนไลน์', 'Online Creative Campaign'),
('CSC348', 'การศึกษาเฉพาะเรื่องสำหรับการจัดการธุรกิจไซเบอร์', 'Independent Study for Cyber Business Management'),
('CSC361', 'การเขียนโปรแกรมบนเว็บ', 'Web Programming'),
('CSC362', 'การบริหารโครงการเทคโนโลยีสารสนเทศ', 'Information Technology Project Management'),
('CSC363', 'เทคโนโลยีการประมวลแบบกลุ่มเมฆ', 'Cloud Computing Technology'),
('CSC364', 'การศึกษาเฉพาะเรื่องสำหรับคอมพิวเตอร์เพื่อการสื่อสาร', 'Independent Study for Computer Communication'),
('CSC371', 'การวิจัยและการประยุกต์ใช้ความรู้สำหรับนวัตกรรมสื่อสารสังคม', 'Research and Knowledge Application for Social Communication Innovation'),
('CSC421', 'การออกแบบเกมอิเล็กทรอนิกส์', 'E-Game Design'),
('CSC422', 'การผลิตภาพเคลื่อนไหว', 'Animation Production'),
('CSC441', 'นวัตกรรมและธุรกิจใหม่เพื่อผู้ประกอบการ', 'Innovation and Startup for Entrepreneurs'),
('CSC442', 'การสร้างความผูกพันและภักดีต่อแบรนด์ผ่านสื่อดิจิทัล', 'Digital Brand Engagement and Loyalty'),
('CSC443', 'ระบบสารสนเทศด้านทรัพยากรบุคคล', 'Human Resources Information System'),
('CSC461', 'การพัฒนาโปรแกรมประยุกต์สำหรับอุปกรณ์สื่อสารเคลื่อนที่แบบพกพา', 'Mobile Application Development'),
('CSC462', 'การออกแบบกราฟิก 2 มิติและ 3 มิติเบื้องต้น', 'Introduction to 2D and 3D Graphic Design'),
('CSC463', 'การจำลองสภาพแวดล้อมแบบเสมือนสำหรับคอมพิวเตอร์เพื่อการสื่อสาร', 'Virtual and Augmented Reality for Computer Communication'),
('CSC464', 'คลังข้อมูลและการทําเหมืองข้อมูล', 'Data Warehousing and Data Mining'),
('CSC465', 'การประกันคุณภาพซอฟต์แวร์', 'Software Quality Assurance'),
('CSC471', 'การฝึกงานทางวิชาชีพสำหรับนวัตกรรมสื่อสารสังคม', 'Professional Practice for Social Communication Innovation'),
('CSC472', 'นวัตกรรมสื่อสารสังคมนิพนธ์', 'Social Communication Innovation Thesis'),
('DB501', 'วิจัยและพัฒนาเพื่อการออกแบบ', 'Research and Development in Design'),
('DB502', 'สัมมนาวิจัยและพัฒนาในการออกแบบเพื่อธุรกิจ', 'Seminar in Research and Development in Design for Business'),
('DB511', 'นวัตกรรมและเทคโนโลยีในการออกแบบเพื่อธุรกิจ', 'Innovation and Technology in Design for Business'),
('DB512', 'อัตลักษณ์ไทยและการออกแบบเพื่อธุรกิจ', 'Thai Identity and Design for Business'),
('DB513', 'ปฏิบัติการออกแบบเพื่อธุรกิจ', 'Design Studio for Business'),
('DB514', 'สัมมนาปฏิบัติการด้านการออกแบบเพื่อธุรกิจ', 'Seminar in Design Studio for Business'),
('DB515', 'ประเด็นปัจจุบันในการออกแบบเพื่อธุรกิจ', 'Current Issue in Design for Business'),
('DB521', 'สัมมนาพฤติกรรมผู้บริโภค', 'Seminar in Consumer Insight'),
('DB522', 'แนวคิดเชิงธุรกิจ', 'Business Perspective'),
('DB523', 'กลยุทธ์การสร้างแบรนด์', 'Brand Strategy'),
('DB524', 'การโปรโมทงานส่ือดิจิทัล', 'Digital Media Promotion'),
('DB525', 'ความรับผิดชอบขององค์กรที่มีต่อสังคม', 'Corporate Social Responsibility'),
('DB531', 'ปริญญานิพนธ์', 'Thesis'),
('GRT691', 'ปริญญานิพนธ์ระดับปริญญาโท', 'Master’s Thesis'),
('INC111', 'ทฤษฎีและพฤติกรรมการสื่อสาร', 'Theory and Communication Behavior'),
('INC112', 'การรู้เท่าทันสื่อด้านการจัดการนวัตกรรม', 'Media Literacy in Innovation Management'),
('INC124', 'หลักการท่องเที่ยว', 'Principles of Tourism'),
('INC131', 'หลักการสื่อสารสุขภาพ', 'Principles of Health Communication'),
('INC141', 'การแพร่กระจายนวัตกรรมเบื้องต้น', 'Introduction to Diffusion of Innovation'),
('INC151', 'การถ่ายภาพเพื่อการสื่อสาร', 'Photography for Communication'),
('INC152', 'การคิดสร้างสรรค์เพื่อนวัตกรรมการสื่อสาร', 'Creative Thinking for Communication Innovation'),
('INC153', 'การผลิตสื่อเบื้องต้น', 'Introduction to Media Production'),
('INC211', 'สื่อและการเล่าเรื่อง', 'Media and Storytelling'),
('INC212', 'วารสารศาสตร์ในยุคดิจิทัล', 'Journalism in Digital Age'),
('INC222', 'การสร้างตราสินค้าเพื่อการท่องเที่ยว', 'Branding for Tourism'),
('INC223', 'การจัดการทรัพยากรการท่องเที่ยวเพื่อการท่องเที่ยวอย่างยั่งยืน', 'Tourism Resources Management for Sustainable Tourism'),
('INC224', 'การวิเคราะห์พฤติกรรมนักท่องเที่ยว', 'Tourist Behavior Analysis'),
('INC225', 'ความรับผิดชอบต่อสังคมกับอุตสาหกรรมการท่องเที่ยว', 'Social Responsibility and Tourism Industry'),
('INC231', 'คําศัพท์ทางการแพทย์', 'Medical Terminology'),
('INC233', 'หลักการสาธารณสุขและโภชนาการ', 'Principles of Public Health and Nutrition'),
('INC234', 'สุขภาพและความงาม', 'Health and Beauty'),
('INC236', 'สุขภาวะตลอดชีวิต', 'Lifelong Health and Wellness'),
('INC237', 'กายวิภาคศาสตร์ สรีรวิทยาพื้นฐานของมนุษย์ และวิทยาศาสตร์ชีวการแพทย์เบื้องต้น', 'Introduction to Human Anatomy, Physiology, and Biomedical Sciencesน Basic Human Anatomy and Physiology'),
('INC241', 'การจัดการนวัตกรรมเบื้องต้น', 'Introduction to Innovation Management'),
('INC242', 'กลยุทธ์ทางการจัดการเทคโนโลยีและนวัตกรรม', 'Strategic of Technological and Innovation Management'),
('INC251', 'การถ่ายภาพเพื่อการสื่อสารสุขภาพ', 'Photography for Health Communication'),
('INC252', 'การถ่ายภาพเพื่อการท่องเที่ยว', 'Photography for Tourism'),
('INC253', 'การคิดสร้างสรรค์เพื่อการออกแบบการสื่อสาร', 'Creative Thinking for Communication Design'),
('INC254', 'พื้นฐานการผลิตสื่อ', 'Basic for Media Production'),
('INC255', 'การประยุกต์ใช้คอมพิวเตอร์ในงานสื่อสาร', 'Computer Applications in Communication Work'),
('INC259', 'การออกแบบและผลิตสื่อสิ่งพิมพ์เพื่อการท่องเที่ยว', 'Printing Media Design and Production for Tourism'),
('INC261', 'การวางแผนกลยุทธ์เพื่อการประชาสัมพันธ์', 'Strategic Planning for Public Relations'),
('INC262', 'การเขียนเชิงสร้างสรรค์เพื่อสื่อมวลชน', 'Creative Writing for Mass Media'),
('INC263', 'การเขียนเพื่อการสื่อสารการท่องเที่ยว', 'Writing for Tourism Communication'),
('INC264', 'การเขียนเพอื่การสื่อสารสุขภาพ', 'Writing for Health Communication'),
('INC265', 'หลักการสื่อสารการตลาด', 'Principles of Marketing Communication'),
('INC311', 'การวิจัยทางการสื่อสาร', 'Communication Research'),
('INC312', 'การโน้มน้าวใจและการรณรงค์เพื่อการจัดการนวัตกรรม', 'Persuasion and Campaign for Innovation Management'),
('INC313', 'การบริหารตราสินค้า', 'Brand Management'),
('INC321', 'การพูดเพื่อการสื่อสารการท่องเที่ยว', 'Speech for Tourism Communication'),
('INC322', 'การสื่ออสารเพื่อการจัดการงานประชุม การสังสรรค์และการจัดนิทรรศการในการท่องเที่ยว', 'Communication for Meetings, Incentive Travels, Conferences and Events for Tourism'),
('INC323', 'สื่อโฆษณาประชาสัมพันธ์เพื่อการท่องเที่ยว', 'Advertising and Public Relations Media for Tourism'),
('INC324', 'สื่อแบบบูรณาการเพื่อการจัดการท่องเที่ยวอย่างยั่งยืน', 'Integrated Media for Sustainable Tourism'),
('INC325', 'อัตลักษณ์ชุมชนเพื่อการสื่อสารการท่องเที่ยว', 'Community Identity for Tourism Communication'),
('INC331', 'ปัญหาสุขภาพและระบาดวิทยา', 'Health Problems and Epidemiology'),
('INC352', 'การผลิตสื่อสาระบันเทิงเพื่อการท่องเที่ยว', 'Edutainment Media Production for Tourism'),
('INC353', 'การผลิตสื่อเพื่อการสื่อสารสุขภาพ', 'Media Production for Health Communication'),
('INC354', 'การผลิตสื่อสาระบันเทิงเพื่อสุขภาพ', 'Edutainment Production for Health'),
('INC355', 'การจัดทําสื่อสิ่งพิมพ์และสื่ออิเล็กทรอนิกส์', 'Print and E-media Production'),
('INC356', 'ปฏิบัติการออกแบบนวัตกรรม', 'Innovation Design Studio'),
('INC361', 'การตลาดเพื่อสังคม', 'Social Marketing'),
('INC362', 'กลยุทธ์และการวางแผนสื่อเพื่อการท่องเที่ยว', 'Strategies and Media Planning for Tourism'),
('INC363', 'การรณรงค์การสื่อสารสุขภาพ', 'Health Communication Campaign'),
('INC364', 'การสื่อสารการตลาดเชิงบูรณาการเพื่อการท่องเที่ยว', 'Integrated Marketing Communication for Tourism'),
('INC366', 'การบริหารงานโฆษณาเชิงกลยุทธ์', 'Strategic Advertising Management'),
('INC367', 'การสื่อสารการตลาดเชิงบูรณาการเพื่อการจัดการนวัตกรรม', 'Integrated Marketing Communication for Innovation Management'),
('INC371', 'การฝึกงานทางวิชาชีพ', 'Professional Practice'),
('INC411', 'การสื่อสารเชิงสัญญะเพื่อการจัดการนวัตกรรม', 'Semiotic Communication for Innovation Management'),
('INC421', 'การสื่อสารเพื่อการท่องเที่ยวในภาวะวิกฤต', 'Communication for Tourism in Crisis Situations'),
('INC431', 'การสื่อสารเพื่อสุขภาพในภาวะเสี่ยง', 'Communication for Health in Risk'),
('INC432', 'สื่อกับนโยบายสาธารณะด้านสุขภาพ', 'Media and Health Public Policy'),
('INC433', 'จรรยาบรรณและกฎหมายด้านการสื่อสารสุขภาพ', 'Ethics and Law in Health Communication'),
('INC434', 'การจัดการการสื่อสารสำหรับสุขภาพและโภชนาการเพื่อคุณภาพชีวิต', 'Communication Management of Health and Nutrition for Life Quality'),
('INC441', 'การพัฒนานวัตกรรมเชิงธุรกิจ', 'Business Innovation Development'),
('INC442', 'การบริหารโครงการนวัตกรรม', 'Innovation Project Management'),
('INC443', 'กฎหมายทรัพย์สินทางปัญญา', 'Intellectual Property Law'),
('INC461', 'การวางแผนและบริหารโครงการสื่อสารสุขภาพเชิงกลยุท ธ์', 'Strategic Planning and Management of Health Communication Projects'),
('INC471', 'โครงงานนวัตกรรมการสื่อสาร', 'Communication Innovation Senior Project'),
('INC472', 'สัมมนางานสื่อสารเพื่อการท่องเที่ยว', 'Tourism Communication Seminar'),
('INC473', 'สัมมนางานสื่อสารเพื่อสุขภาพ', 'Health Communication Seminar'),
('INC474', 'สัมมนางานสื่อสารเพื่อการจัดการนวัตกรรม', 'Innovation Management Communication Seminar'),
('INC475', 'การศึกษาเฉพาะเรื่อง', 'Independent Study'),
('MCI501', 'การวิจัยสื่อและนวัตกรรมสื่อสาร', 'Research in Media and Communication Innovation'),
('MCI502', 'ปรัชญาและแนวคิดรวบยอดทางการสื่อสาร', 'Philosophy and Concept in Communication'),
('MCI503', 'แนวคิดสร้างสรรค์เพื่อสื่อและนวัตกรรมสื่อสาร', 'Creative Thinking for Media and Communication Innovation'),
('MCI511', 'การวางแผนกลยุทธ์การสื่อสารสุขภาพ', 'Strategic Planning for Health Communication'),
('MCI512', 'สื่อบูรณาการเพื่อการสื่อสารสุขภาพ', 'Integrated Media for Health Communication'),
('MCI521', 'แนวโน้มและแนวคิดด้านสื่อสุขภาพ', 'Trends and Concepts in Health'),
('MCI522', 'แนวโน้มและแนวคิดด้านอาหารและโภชนาการ', 'Trends and Concepts in Food and Nutrition'),
('MCI523', 'แนวโน้มนวัตกรรมสื่อสุขภาพและความงาม', 'Trends and Innovation for Health and Beauty'),
('MCI524', 'การเขียนเพื่อการสื่อสารสุขภาพขั้นสูง', 'Advanced Writing for Health Communication'),
('MCI531', 'ภาพยนตร์โลกและการวิพากษ์', 'Global Cinema and Criticism'),
('MCI532', 'ปฏิบัติการภาพยนตร์และสื่อดิจิทัล', 'Cinema and Digital Media Production Studio'),
('MCI541', 'ภาพยนตร์ไทยศึกษาและการพัฒนา', 'Thai Cinema Study and Development'),
('MCI542', 'ผลกระทบต่อผู้ชมและสื่อ', 'Audience and Media Effects'),
('MCI543', 'เทคนิคการเล่าเรื่องและการเขียนเพื่องานภาพยนตร์และสื่อดิจิทัล', 'Narrative Technique and Writing for Cinema and Digital Media'),
('MCI551', 'การวิพากษ์สื่อและบริบททางสังคม', 'Media Criticism and Social Context'),
('MCI552', 'กลยุทธ์สื่อและการจัดการการสื่อสาร', 'Media Strategies and Communication Management'),
('MCI561', 'กลยุทธ์การสร้างแบรนด์และการสื่อสารการตลาดเชิงบูรณาการ', 'Branding Strategies and Integrated Marketing Communication'),
('MCI562', 'จิตวิทยาในสื่อร่วมสมัย', 'Psychology in Contemporary Media'),
('MCI563', 'การเล่าเรื่องข้ามสื่อ', 'Transmedia Storytelling'),
('MCI611', 'สัมมนาการสื่อสารสุขภาพ', 'Seminar in Health Communication'),
('MCI621', 'การสื่อสารการตลาดเพื่อสุขภาพและความงาม', 'Marketing Communication for Health and Beauty'),
('MCI622', 'โครงงานบูรณาการการสื่อสารสุขภาพ', 'Integrated Projects for Health Communication'),
('MCI631', 'สัมมนาภาพยนตร์และสื่อดิจิทัล', 'Seminar in Cinema and Digital Media'),
('MCI641', 'การกํากับภาพยนตร์ขั้นสูง', 'Advanced Directing for Cinema Production'),
('MCI642', 'อุตสาหกรรมภาพยนตร์และการจัดการ', 'Film Industry and Management'),
('MCI651', 'สัมมนาการสื่อสารร่วมสมัย', 'Seminar in Contemporary Communication'),
('MCI661', 'การวางแผนโครงการและการประเมินผลทางการสื่อสาร', 'Communication Project Planning and Evaluation'),
('MCI662', 'สัมมนาการจัดการเนื้อหาสื่อในยุคดิจิทัล', 'Seminar in Media Content Management in Digital Age'),
('MCI671', 'การศึกษาเฉพาะเรื่องในสื่อและนวัตกรรมสื่อสาร', 'Selected Topics in Media and Communication Innovation'),
('SCE501', 'วิทยาศาสตร์บูรณาการ', 'Integrated Science'),
('SCE502', 'วิทยาศาสตร์เทคโนโลยีและสังคม', 'Science Technology and Society'),
('SHC501', 'การวิจัยเพื่อการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Research in Science and Health Communication'),
('SHC502', 'จรรยาบรรณและกฎหมายทางการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Ethics and Law in Science and Health Communication'),
('SHC503', 'สื่อบูรณาการเพื่อการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Integrated Media for Science and Health Communication'),
('SHC511', 'การวางแผนกลยุทธ์การสื่อสารวิทยาศาสตร์และสุขภาพ', 'Strategic Planning for Science and Health Communication'),
('SHC512', 'โครงงานบูรณาการการสื่อสาระวิทยาศาสตร์และสุขภาพ', 'Integrated Projects for Science and Health Communication'),
('SHC513', 'สัมมนาการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Seminar in Science and Health Communication'),
('SHC521', 'การเขียนเพื่อการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Writing for Science and Health Communication'),
('SHC522', 'ความคิดรวบยอดทางการสื่อสาร', 'Communication Concept'),
('SHC523', 'แนวโน้มและแนวคิดในวิทยาศาสตร์และสุขภาพ', 'Trends and Concepts in Science and Health'),
('SHC524', 'ประเด็นแนวโน้มด้านอาหารและโภชนาการ', 'Trends in Food and Nutrition'),
('SHC525', 'การสื่อสารวิทยาศาสตร์เพื่อเยาวชน', 'Science Communication for Youth'),
('SHC526', 'การสื่อสารการตลาดเพื่อสุขภาพและความงาม', 'Marketing Communication for Health and Beauty'),
('SHC527', 'การอ่านและแปลผลงานด้านวิทยาศาสตร์และสุขภาพ', 'Reading and Interpreting Science and Health Literature'),
('SHC528', 'การสื่อสารวิทยาศาสตร์เพื่อชุมชน', 'Science Communication for Community'),
('SHC529', 'สื่อเพื่อพิพิธภัณฑ์วิทยาศาสตร์', 'Media for Science Museum'),
('SHC539', 'ปริญญานิพนธ์', 'Thesis');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `sub_id` varchar(100) NOT NULL DEFAULT '',
  `sub_th_name` varchar(255) NOT NULL DEFAULT '',
  `sub_name` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`sub_id`, `sub_th_name`, `sub_name`) VALUES
('CDM111', 'ความรู้เบื้องต้นเกี่ยวกับภาพยนตร์และสื่อดิจิทัล', 'Introduction to Cinema and Digital Media'),
('CDM112', 'การวิเคราะห์บท', 'Script Analysis'),
('CDM121', 'การถ่ายภาพดิจิทัล', 'Digital Photography'),
('CDM122', 'ความรู้เบื้องต้นเกี่ยวกับเทคโนโลยีในการผลิตภาพยนตร์', 'Introduction for Cinema Production Technology'),
('CDM123', 'งานผลิตภาพยนตร์และสื่อดิจิทัล 1', 'Cinema and Digital Media Production I'),
('CDM131', 'การแสดงเพื่องานภาพยนตร์ 1', 'Acting for Cinema 1'),
('CDM132', 'การกํากับการแสดงภาพยนตร์ 1', 'Directing for Cinema 1'),
('CDM133', 'เทคนิคการออกเสียง', 'Vocal Technique'),
('CDM141', 'สเก็ตซ์และการวาดภาพ', 'Sketch and Drawing'),
('CDM142', 'ประวัติศาสตร์และสไตล์ของเครื่องแต่งกาย', 'History and Style of Costume'),
('CDM143', 'เทคนิควาดระบายสีในสื่อดิจิทัล', 'Rendering Technique in Digital Media'),
('CDM211', 'ประวัติศาสตร์ภาพยนตร์', 'History of Cinema'),
('CDM212', 'ความคิดรวบยอดและสไตล์', 'Concept and Style'),
('CDM213', 'สุนทรียะและการวิจารณ์ในงานภาพยนตร์', 'Cinema Aesthetics and Criticism'),
('CDM214', 'จรรยาบรรณและกฎหมายด้านสื่อดิจิทัล', 'Ethics and Law in Digital Media'),
('CDM221', 'งานผลิตภาพยนตร์และสื่อดิจิทัล 2', 'Cinema and Digital Media Production II'),
('CDM222', 'การตัดต่อ', 'Editing'),
('CDM223', 'การบริหารการผลิต', 'Production Management'),
('CDM224', 'การผลิตงานเพื่อความบันเทิง', 'Entertainment Production'),
('CDM231', 'การเขียนบทเพื่องานภาพยนตร์', 'Script Writing for Cinema'),
('CDM232', 'การแสดงเพื่องานภาพยนตร์ 2', 'Acting for Cinema 2'),
('CDM233', 'ความรู้เบื้องต้นเกี่ยวกับการผลิตภาพยนตร์', 'Introduction to Cinema Production'),
('CDM234', 'การกํากับการแสดงภาพยนตร์ 2', 'Directing for Cinema 2'),
('CDM241', 'การแต่งหน้าเพื่องานภาพยนตร์', 'Makeup for Cinema'),
('CDM242', 'การออกแบบฉากเพื่องานภาพยนตร์', 'Set Design for Cinema'),
('CDM243', 'ยุคสมัยและสไตล์', 'Period and Style'),
('CDM244', 'การออกแบบเครื่องแต่งกายเพื่องานภาพยนตร์', 'Costume Design for Cinema'),
('CDM311', 'งานวิจัยและการประยุกต์ใช้ความรู้เพื่องานภาพยนตร์', 'Research and Knowledge Application for Cinema'),
('CDM321', 'การผลิตภาพยนตร์สารคดี', 'Documentary Production'),
('CDM322', 'ชาติพันธุ์และการนําเสนอประเด็นในงานภาพยนตร์และสื่อดิจิทัล', 'Ethnicity and Representation in Cinema and Digital Media'),
('CDM323', 'เทคนิคพิเศษเพื่องานภาพยนตร์', 'Special Effects for Cinema'),
('CDM324', 'การถ่ายทำภาพยนตร์ระบบดิจิทัล', 'Digital Cinematography'),
('CDM325', 'แสงและสื่อร่วมสมัย', 'Lighting and Contemporary Media'),
('CDM331', 'กระบวนการและการคัดเลือกนักแสดง', 'Casting and Audition'),
('CDM332', 'การเขียนบทสร้างสรรค์', 'Creative Script Writing'),
('CDM333', 'การแสดงเพื่องานภาพยนตร์ 3', 'Acting for Cinema 3'),
('CDM341', 'การออกแบบเพื่องานภาพยนตร์', 'Production Design'),
('CDM342', 'การสร้างอุปกรณ์การแสดงเพื่องานภาพยนตร์', 'Hand Craft for Cinema'),
('CDM351', 'โครงงานผลิตภาพยนตร์', 'Cinema Production Project'),
('CDM421', 'การออกแบบเสียงในสื่อดิจิทัล', 'Sound Design in Digital Media'),
('CDM422', 'สตอรี่บอร์ด', 'Storyboard'),
('CDM431', 'การบริหารจัดการศิลปิน', 'Artists Management'),
('CDM441', 'การออกแบบและจัดสร้างเครื่องแต่งกาย', 'Costume Design and Construction'),
('CDM442', 'เทคนิคพิเศษในการแต่งหน้าเพื่องานภาพยนตร์', 'Special Effects Makeup for Cinema'),
('CDM443', 'การออกแบบแสงเพื่องานภาพยนตร์', 'Lighting Design for Cinema'),
('CDM451', 'การฝึกงานทางวิชาชีพ', 'Professional Practice'),
('CDM452', 'การศึกษาเฉพาะเรื่อง', 'Independent Study'),
('CDM453', 'ภาพยนตร์นิพนธ์', 'Cinema Thesis'),
('COS101', 'เทคนิคการเล่าเรื่องในงานภาพยนตร์และสื่อดิจิทัล', 'Narrative Techniques in Cinema and Digital Media'),
('COS102', 'ความรู้เบื้องต้นด้านสื่อสารมวลชนและสื่อดิจิทัล', 'Introduction to Mass Communication and Digital Media'),
('COS103', 'สุนทรียศาสตร์ร่วมสมัย', 'Contemporary Aesthetics'),
('COS104', 'สื่อศึกษา', 'Media Studies'),
('COS105', 'เทคโนโลยีสารสนเทศและการสื่อสาร', 'Information and Communication Technology'),
('COS201', 'ทักษะการสื่อสารสําหรับการผลิตสื่อ', 'Communication Skills for Media Production'),
('COS202', 'ภูมิปัญญาไทยและเอเชีย', 'Thai and Asian Wisdom'),
('COS203', 'แนวคิดและนวัตกรรมการออกแบบ', 'Concept and Design Innovation'),
('COS204', 'ความรู้เบื้องต้นเกี่ยวกับการสื่อสารเพื่อการพัฒนา', 'Introduction to Development Communication'),
('COS205', 'นวัตกรรมการสื่อสาร', 'Communication Innovation'),
('COS301', 'การจัดการอุตสาหกรรมสร้างสรรค์', 'Creative Industry Management'),
('COS302', 'พฤติกรรมผู้บริโภค', 'Consumer Behavior'),
('COS401', 'กระแสกับธุรกิจ', 'Trends and Business'),
('CSC111', 'การออกแบบกราฟิกเบื้องต้นเพื่อสื่อปฏิสัมพันธ์', 'Introduction to Graphics Design for Interactive Media'),
('CSC112', 'การร่างภาพและทักษะการวาดเส้น', 'Sketching and Drawing Skills'),
('CSC113', 'หลักการสร้างภาพเคลื่อนไหว', 'Principle of Animation'),
('CSC114', 'การออกแบบสื่อปฏิสัมพันธ์เพื่องานมัลติมีเดีย', 'Interactive Design for Multimedia'),
('CSC131', 'หลักการตลาด', 'Principles of Marketing'),
('CSC132', 'ธุรกิจอิเล็กทรอนิกส์เบื้องต้น', 'Introduction to E-Business'),
('CSC133', 'ระบบสารสนเทศเพื่อการจัดการ', 'Management Information System'),
('CSC141', 'การสื่อสารทางธุรกิจ', 'Business Communication'),
('CSC151', 'เทคโนโลยีอินเตอร์เน็ต', 'Internet Technology'),
('CSC152', 'โครงสร้างข้อมูลและขั้นตอนวิธี', 'Data Structure and Algorithms'),
('CSC153', 'การเขียนโปรแกรมคอมพิวเตอร์', 'Computer Programming'),
('CSC161', 'คณิตศาสตร์สําหรับคอมพิวเตอร์เพื่อการสื่อสาร', 'Mathematics for Computers Communication'),
('CSC211', 'ประวัติศาสตร์ศิลป์และการออกแบบ', 'Art and Design History'),
('CSC221', 'สตอรี่บอร์ดและการลําดับภาพ', 'Storyboard and Editing'),
('CSC222', 'โครงเรื่องและตัวละคร', 'Plot and Character'),
('CSC223', 'การออกแบบภาพเคลื่อนไหวสามมิติ', '3D Modeling and Rendering'),
('CSC224', 'เทคนิคพิเศษทางภาพในการออกแบบสื่อดิจิทัล', 'Visual Effect for Digital Media Design'),
('CSC225', 'การวาดภาพและการลงสีเพื่องานภาพเคลื่อนไหวในระบบดิจิทัล', 'Digital Drawing and Painting for Animation'),
('CSC226', 'การผลิตวีดิทัศน์', 'Video Production'),
('CSC232', 'การออกแบบสื่อดิจิทัล', 'Digital Media Design'),
('CSC241', 'การชําระเงินทางอิเล็กทรอนิกส์', 'E-Payment'),
('CSC242', 'กลยุทธ์ธุรกิจอิเล็กทรอนิกส์', 'E-Business Strategies'),
('CSC251', 'ระบบการจัดการฐานข้อมูล', 'Database Management Systems'),
('CSC252', 'การวิเคราะห์และออกแบบระบบ', 'System Analysis and Design'),
('CSC261', 'การเขียนโปรแกรมเชิงวัตถุ', 'Object Oriented Programming'),
('CSC262', 'ปฏิสัมพันธ์ระหว่างคอมพิวเตอร์และมนุษย์', 'Human Computer Interaction'),
('CSC263', 'เครือข่ายคอมพิวเตอร์', 'Computer Network'),
('CSC264', 'การพัฒนาสื่อปฏิสัมพันธ์บนเว็บเพจ', 'Interactive Web Page Development'),
('CSC271', 'จริยธรรมและประเด็นทางกฎหมายเทคโนโลยีสารสนเทศ', 'Ethic and Issues in Information Technology Laws'),
('CSC321', 'ภาพเคลื่อนไหวสามมิติ', '3D Animation'),
('CSC322', 'โมชั่นกราฟิกเพื่องานมัลติมีเดีย', 'Motion Graphic for Multimedia'),
('CSC323', 'การสร้างแบรนด์และการออกแบบอัตลักษณ์', 'Branding and Identity Design'),
('CSC324', 'การออกแบบสื่อสิ่งพิมพ์ในระบบดิจิทัล', 'Digital Publishing Design'),
('CSC325', 'การออกแบบสื่อปฏิสัมพันธ์บนเว็บเพจ', 'Interactive Web Page Design'),
('CSC326', 'การศึกษาเฉพาะเรื่องสำหรับการออกแบบสื่อปฏิสัมพันธ์และมัลติมีเดีย', 'Independent Study for Interactive and Multimedia Design'),
('CSC331', 'การบัญชีและการเงิน', 'Accounting and Finance'),
('CSC341', 'การจัดการธุรกิจระหว่างประเทศ', 'International Business Management'),
('CSC342', 'การบริหารความเสี่ยงในธุรกิจอิเล็กทรอนิกส์', 'Risk Management in E-Business'),
('CSC343', 'การตลาดในระบบดิจิทัล', 'Digital Marketing'),
('CSC344', 'การจัดการนำเข้าและส่งออกเพื่อธุรกิจอิเล็กทรอนิกส์', 'Import and Export Management for E-Business'),
('CSC345', 'การวิเคราะห์ข้อมูลขนาดใหญ่', 'Big Data Analytics'),
('CSC346', 'การวางแผนช่องทางการเข้าถึงลูกค้า', 'Customer Touchpoint Planning'),
('CSC347', 'การสร้างสรรค์แคมเปญออนไลน์', 'Online Creative Campaign'),
('CSC348', 'การศึกษาเฉพาะเรื่องสำหรับการจัดการธุรกิจไซเบอร์', 'Independent Study for Cyber Business Management'),
('CSC361', 'การเขียนโปรแกรมบนเว็บ', 'Web Programming'),
('CSC362', 'การบริหารโครงการเทคโนโลยีสารสนเทศ', 'Information Technology Project Management'),
('CSC363', 'เทคโนโลยีการประมวลแบบกลุ่มเมฆ', 'Cloud Computing Technology'),
('CSC364', 'การศึกษาเฉพาะเรื่องสำหรับคอมพิวเตอร์เพื่อการสื่อสาร', 'Independent Study for Computer Communication'),
('CSC371', 'การวิจัยและการประยุกต์ใช้ความรู้สำหรับนวัตกรรมสื่อสารสังคม', 'Research and Knowledge Application for Social Communication Innovation'),
('CSC421', 'การออกแบบเกมอิเล็กทรอนิกส์', 'E-Game Design'),
('CSC422', 'การผลิตภาพเคลื่อนไหว', 'Animation Production'),
('CSC441', 'นวัตกรรมและธุรกิจใหม่เพื่อผู้ประกอบการ', 'Innovation and Startup for Entrepreneurs'),
('CSC442', 'การสร้างความผูกพันและภักดีต่อแบรนด์ผ่านสื่อดิจิทัล', 'Digital Brand Engagement and Loyalty'),
('CSC443', 'ระบบสารสนเทศด้านทรัพยากรบุคคล', 'Human Resources Information System'),
('CSC461', 'การพัฒนาโปรแกรมประยุกต์สำหรับอุปกรณ์สื่อสารเคลื่อนที่แบบพกพา', 'Mobile Application Development'),
('CSC462', 'การออกแบบกราฟิก 2 มิติและ 3 มิติเบื้องต้น', 'Introduction to 2D and 3D Graphic Design'),
('CSC463', 'การจำลองสภาพแวดล้อมแบบเสมือนสำหรับคอมพิวเตอร์เพื่อการสื่อสาร', 'Virtual and Augmented Reality for Computer Communication'),
('CSC464', 'คลังข้อมูลและการทําเหมืองข้อมูล', 'Data Warehousing and Data Mining'),
('CSC465', 'การประกันคุณภาพซอฟต์แวร์', 'Software Quality Assurance'),
('CSC471', 'การฝึกงานทางวิชาชีพสำหรับนวัตกรรมสื่อสารสังคม', 'Professional Practice for Social Communication Innovation'),
('CSC472', 'นวัตกรรมสื่อสารสังคมนิพนธ์', 'Social Communication Innovation Thesis'),
('DB501', 'วิจัยและพัฒนาเพื่อการออกแบบ', 'Research and Development in Design'),
('DB502', 'สัมมนาวิจัยและพัฒนาในการออกแบบเพื่อธุรกิจ', 'Seminar in Research and Development in Design for Business'),
('DB511', 'นวัตกรรมและเทคโนโลยีในการออกแบบเพื่อธุรกิจ', 'Innovation and Technology in Design for Business'),
('DB512', 'อัตลักษณ์ไทยและการออกแบบเพื่อธุรกิจ', 'Thai Identity and Design for Business'),
('DB513', 'ปฏิบัติการออกแบบเพื่อธุรกิจ', 'Design Studio for Business'),
('DB514', 'สัมมนาปฏิบัติการด้านการออกแบบเพื่อธุรกิจ', 'Seminar in Design Studio for Business'),
('DB515', 'ประเด็นปัจจุบันในการออกแบบเพื่อธุรกิจ', 'Current Issue in Design for Business'),
('DB521', 'สัมมนาพฤติกรรมผู้บริโภค', 'Seminar in Consumer Insight'),
('DB522', 'แนวคิดเชิงธุรกิจ', 'Business Perspective'),
('DB523', 'กลยุทธ์การสร้างแบรนด์', 'Brand Strategy'),
('DB524', 'การโปรโมทงานส่ือดิจิทัล', 'Digital Media Promotion'),
('DB525', 'ความรับผิดชอบขององค์กรที่มีต่อสังคม', 'Corporate Social Responsibility'),
('DB531', 'ปริญญานิพนธ์', 'Thesis'),
('GRT691', 'ปริญญานิพนธ์ระดับปริญญาโท', 'Master’s Thesis'),
('INC111', 'ทฤษฎีและพฤติกรรมการสื่อสาร', 'Theory and Communication Behavior'),
('INC112', 'การรู้เท่าทันสื่อด้านการจัดการนวัตกรรม', 'Media Literacy in Innovation Management'),
('INC124', 'หลักการท่องเที่ยว', 'Principles of Tourism'),
('INC131', 'หลักการสื่อสารสุขภาพ', 'Principles of Health Communication'),
('INC141', 'การแพร่กระจายนวัตกรรมเบื้องต้น', 'Introduction to Diffusion of Innovation'),
('INC151', 'การถ่ายภาพเพื่อการสื่อสาร', 'Photography for Communication'),
('INC152', 'การคิดสร้างสรรค์เพื่อนวัตกรรมการสื่อสาร', 'Creative Thinking for Communication Innovation'),
('INC153', 'การผลิตสื่อเบื้องต้น', 'Introduction to Media Production'),
('INC211', 'สื่อและการเล่าเรื่อง', 'Media and Storytelling'),
('INC212', 'วารสารศาสตร์ในยุคดิจิทัล', 'Journalism in Digital Age'),
('INC222', 'การสร้างตราสินค้าเพื่อการท่องเที่ยว', 'Branding for Tourism'),
('INC223', 'การจัดการทรัพยากรการท่องเที่ยวเพื่อการท่องเที่ยวอย่างยั่งยืน', 'Tourism Resources Management for Sustainable Tourism'),
('INC224', 'การวิเคราะห์พฤติกรรมนักท่องเที่ยว', 'Tourist Behavior Analysis'),
('INC225', 'ความรับผิดชอบต่อสังคมกับอุตสาหกรรมการท่องเที่ยว', 'Social Responsibility and Tourism Industry'),
('INC231', 'คําศัพท์ทางการแพทย์', 'Medical Terminology'),
('INC233', 'หลักการสาธารณสุขและโภชนาการ', 'Principles of Public Health and Nutrition'),
('INC234', 'สุขภาพและความงาม', 'Health and Beauty'),
('INC236', 'สุขภาวะตลอดชีวิต', 'Lifelong Health and Wellness'),
('INC237', 'กายวิภาคศาสตร์ สรีรวิทยาพื้นฐานของมนุษย์ และวิทยาศาสตร์ชีวการแพทย์เบื้องต้น', 'Introduction to Human Anatomy, Physiology, and Biomedical Sciencesน Basic Human Anatomy and Physiology'),
('INC241', 'การจัดการนวัตกรรมเบื้องต้น', 'Introduction to Innovation Management'),
('INC242', 'กลยุทธ์ทางการจัดการเทคโนโลยีและนวัตกรรม', 'Strategic of Technological and Innovation Management'),
('INC251', 'การถ่ายภาพเพื่อการสื่อสารสุขภาพ', 'Photography for Health Communication'),
('INC252', 'การถ่ายภาพเพื่อการท่องเที่ยว', 'Photography for Tourism'),
('INC253', 'การคิดสร้างสรรค์เพื่อการออกแบบการสื่อสาร', 'Creative Thinking for Communication Design'),
('INC254', 'พื้นฐานการผลิตสื่อ', 'Basic for Media Production'),
('INC255', 'การประยุกต์ใช้คอมพิวเตอร์ในงานสื่อสาร', 'Computer Applications in Communication Work'),
('INC259', 'การออกแบบและผลิตสื่อสิ่งพิมพ์เพื่อการท่องเที่ยว', 'Printing Media Design and Production for Tourism'),
('INC261', 'การวางแผนกลยุทธ์เพื่อการประชาสัมพันธ์', 'Strategic Planning for Public Relations'),
('INC262', 'การเขียนเชิงสร้างสรรค์เพื่อสื่อมวลชน', 'Creative Writing for Mass Media'),
('INC263', 'การเขียนเพื่อการสื่อสารการท่องเที่ยว', 'Writing for Tourism Communication'),
('INC264', 'การเขียนเพอื่การสื่อสารสุขภาพ', 'Writing for Health Communication'),
('INC265', 'หลักการสื่อสารการตลาด', 'Principles of Marketing Communication'),
('INC311', 'การวิจัยทางการสื่อสาร', 'Communication Research'),
('INC312', 'การโน้มน้าวใจและการรณรงค์เพื่อการจัดการนวัตกรรม', 'Persuasion and Campaign for Innovation Management'),
('INC313', 'การบริหารตราสินค้า', 'Brand Management'),
('INC321', 'การพูดเพื่อการสื่อสารการท่องเที่ยว', 'Speech for Tourism Communication'),
('INC322', 'การสื่ออสารเพื่อการจัดการงานประชุม การสังสรรค์และการจัดนิทรรศการในการท่องเที่ยว', 'Communication for Meetings, Incentive Travels, Conferences and Events for Tourism'),
('INC323', 'สื่อโฆษณาประชาสัมพันธ์เพื่อการท่องเที่ยว', 'Advertising and Public Relations Media for Tourism'),
('INC324', 'สื่อแบบบูรณาการเพื่อการจัดการท่องเที่ยวอย่างยั่งยืน', 'Integrated Media for Sustainable Tourism'),
('INC325', 'อัตลักษณ์ชุมชนเพื่อการสื่อสารการท่องเที่ยว', 'Community Identity for Tourism Communication'),
('INC331', 'ปัญหาสุขภาพและระบาดวิทยา', 'Health Problems and Epidemiology'),
('INC352', 'การผลิตสื่อสาระบันเทิงเพื่อการท่องเที่ยว', 'Edutainment Media Production for Tourism'),
('INC353', 'การผลิตสื่อเพื่อการสื่อสารสุขภาพ', 'Media Production for Health Communication'),
('INC354', 'การผลิตสื่อสาระบันเทิงเพื่อสุขภาพ', 'Edutainment Production for Health'),
('INC355', 'การจัดทําสื่อสิ่งพิมพ์และสื่ออิเล็กทรอนิกส์', 'Print and E-media Production'),
('INC356', 'ปฏิบัติการออกแบบนวัตกรรม', 'Innovation Design Studio'),
('INC361', 'การตลาดเพื่อสังคม', 'Social Marketing'),
('INC362', 'กลยุทธ์และการวางแผนสื่อเพื่อการท่องเที่ยว', 'Strategies and Media Planning for Tourism'),
('INC363', 'การรณรงค์การสื่อสารสุขภาพ', 'Health Communication Campaign'),
('INC364', 'การสื่อสารการตลาดเชิงบูรณาการเพื่อการท่องเที่ยว', 'Integrated Marketing Communication for Tourism'),
('INC366', 'การบริหารงานโฆษณาเชิงกลยุทธ์', 'Strategic Advertising Management'),
('INC367', 'การสื่อสารการตลาดเชิงบูรณาการเพื่อการจัดการนวัตกรรม', 'Integrated Marketing Communication for Innovation Management'),
('INC371', 'การฝึกงานทางวิชาชีพ', 'Professional Practice'),
('INC411', 'การสื่อสารเชิงสัญญะเพื่อการจัดการนวัตกรรม', 'Semiotic Communication for Innovation Management'),
('INC421', 'การสื่อสารเพื่อการท่องเที่ยวในภาวะวิกฤต', 'Communication for Tourism in Crisis Situations'),
('INC431', 'การสื่อสารเพื่อสุขภาพในภาวะเสี่ยง', 'Communication for Health in Risk'),
('INC432', 'สื่อกับนโยบายสาธารณะด้านสุขภาพ', 'Media and Health Public Policy'),
('INC433', 'จรรยาบรรณและกฎหมายด้านการสื่อสารสุขภาพ', 'Ethics and Law in Health Communication'),
('INC434', 'การจัดการการสื่อสารสำหรับสุขภาพและโภชนาการเพื่อคุณภาพชีวิต', 'Communication Management of Health and Nutrition for Life Quality'),
('INC441', 'การพัฒนานวัตกรรมเชิงธุรกิจ', 'Business Innovation Development'),
('INC442', 'การบริหารโครงการนวัตกรรม', 'Innovation Project Management'),
('INC443', 'กฎหมายทรัพย์สินทางปัญญา', 'Intellectual Property Law'),
('INC461', 'การวางแผนและบริหารโครงการสื่อสารสุขภาพเชิงกลยุท ธ์', 'Strategic Planning and Management of Health Communication Projects'),
('INC471', 'โครงงานนวัตกรรมการสื่อสาร', 'Communication Innovation Senior Project'),
('INC472', 'สัมมนางานสื่อสารเพื่อการท่องเที่ยว', 'Tourism Communication Seminar'),
('INC473', 'สัมมนางานสื่อสารเพื่อสุขภาพ', 'Health Communication Seminar'),
('INC474', 'สัมมนางานสื่อสารเพื่อการจัดการนวัตกรรม', 'Innovation Management Communication Seminar'),
('INC475', 'การศึกษาเฉพาะเรื่อง', 'Independent Study'),
('MCI501', 'การวิจัยสื่อและนวัตกรรมสื่อสาร', 'Research in Media and Communication Innovation'),
('MCI502', 'ปรัชญาและแนวคิดรวบยอดทางการสื่อสาร', 'Philosophy and Concept in Communication'),
('MCI503', 'แนวคิดสร้างสรรค์เพื่อสื่อและนวัตกรรมสื่อสาร', 'Creative Thinking for Media and Communication Innovation'),
('MCI511', 'การวางแผนกลยุทธ์การสื่อสารสุขภาพ', 'Strategic Planning for Health Communication'),
('MCI512', 'สื่อบูรณาการเพื่อการสื่อสารสุขภาพ', 'Integrated Media for Health Communication'),
('MCI521', 'แนวโน้มและแนวคิดด้านสื่อสุขภาพ', 'Trends and Concepts in Health'),
('MCI522', 'แนวโน้มและแนวคิดด้านอาหารและโภชนาการ', 'Trends and Concepts in Food and Nutrition'),
('MCI523', 'แนวโน้มนวัตกรรมสื่อสุขภาพและความงาม', 'Trends and Innovation for Health and Beauty'),
('MCI524', 'การเขียนเพื่อการสื่อสารสุขภาพขั้นสูง', 'Advanced Writing for Health Communication'),
('MCI531', 'ภาพยนตร์โลกและการวิพากษ์', 'Global Cinema and Criticism'),
('MCI532', 'ปฏิบัติการภาพยนตร์และสื่อดิจิทัล', 'Cinema and Digital Media Production Studio'),
('MCI541', 'ภาพยนตร์ไทยศึกษาและการพัฒนา', 'Thai Cinema Study and Development'),
('MCI542', 'ผลกระทบต่อผู้ชมและสื่อ', 'Audience and Media Effects'),
('MCI543', 'เทคนิคการเล่าเรื่องและการเขียนเพื่องานภาพยนตร์และสื่อดิจิทัล', 'Narrative Technique and Writing for Cinema and Digital Media'),
('MCI551', 'การวิพากษ์สื่อและบริบททางสังคม', 'Media Criticism and Social Context'),
('MCI552', 'กลยุทธ์สื่อและการจัดการการสื่อสาร', 'Media Strategies and Communication Management'),
('MCI561', 'กลยุทธ์การสร้างแบรนด์และการสื่อสารการตลาดเชิงบูรณาการ', 'Branding Strategies and Integrated Marketing Communication'),
('MCI562', 'จิตวิทยาในสื่อร่วมสมัย', 'Psychology in Contemporary Media'),
('MCI563', 'การเล่าเรื่องข้ามสื่อ', 'Transmedia Storytelling'),
('MCI611', 'สัมมนาการสื่อสารสุขภาพ', 'Seminar in Health Communication'),
('MCI621', 'การสื่อสารการตลาดเพื่อสุขภาพและความงาม', 'Marketing Communication for Health and Beauty'),
('MCI622', 'โครงงานบูรณาการการสื่อสารสุขภาพ', 'Integrated Projects for Health Communication'),
('MCI631', 'สัมมนาภาพยนตร์และสื่อดิจิทัล', 'Seminar in Cinema and Digital Media'),
('MCI641', 'การกํากับภาพยนตร์ขั้นสูง', 'Advanced Directing for Cinema Production'),
('MCI642', 'อุตสาหกรรมภาพยนตร์และการจัดการ', 'Film Industry and Management'),
('MCI651', 'สัมมนาการสื่อสารร่วมสมัย', 'Seminar in Contemporary Communication'),
('MCI661', 'การวางแผนโครงการและการประเมินผลทางการสื่อสาร', 'Communication Project Planning and Evaluation'),
('MCI662', 'สัมมนาการจัดการเนื้อหาสื่อในยุคดิจิทัล', 'Seminar in Media Content Management in Digital Age'),
('MCI671', 'การศึกษาเฉพาะเรื่องในสื่อและนวัตกรรมสื่อสาร', 'Selected Topics in Media and Communication Innovation'),
('SCE501', 'วิทยาศาสตร์บูรณาการ', 'Integrated Science'),
('SCE502', 'วิทยาศาสตร์เทคโนโลยีและสังคม', 'Science Technology and Society'),
('SHC501', 'การวิจัยเพื่อการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Research in Science and Health Communication'),
('SHC502', 'จรรยาบรรณและกฎหมายทางการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Ethics and Law in Science and Health Communication'),
('SHC503', 'สื่อบูรณาการเพื่อการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Integrated Media for Science and Health Communication'),
('SHC511', 'การวางแผนกลยุทธ์การสื่อสารวิทยาศาสตร์และสุขภาพ', 'Strategic Planning for Science and Health Communication'),
('SHC512', 'โครงงานบูรณาการการสื่อสาระวิทยาศาสตร์และสุขภาพ', 'Integrated Projects for Science and Health Communication'),
('SHC513', 'สัมมนาการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Seminar in Science and Health Communication'),
('SHC521', 'การเขียนเพื่อการสื่อสารวิทยาศาสตร์และสุขภาพ', 'Writing for Science and Health Communication'),
('SHC522', 'ความคิดรวบยอดทางการสื่อสาร', 'Communication Concept'),
('SHC523', 'แนวโน้มและแนวคิดในวิทยาศาสตร์และสุขภาพ', 'Trends and Concepts in Science and Health'),
('SHC524', 'ประเด็นแนวโน้มด้านอาหารและโภชนาการ', 'Trends in Food and Nutrition'),
('SHC525', 'การสื่อสารวิทยาศาสตร์เพื่อเยาวชน', 'Science Communication for Youth'),
('SHC526', 'การสื่อสารการตลาดเพื่อสุขภาพและความงาม', 'Marketing Communication for Health and Beauty'),
('SHC527', 'การอ่านและแปลผลงานด้านวิทยาศาสตร์และสุขภาพ', 'Reading and Interpreting Science and Health Literature'),
('SHC528', 'การสื่อสารวิทยาศาสตร์เพื่อชุมชน', 'Science Communication for Community'),
('SHC529', 'สื่อเพื่อพิพิธภัณฑ์วิทยาศาสตร์', 'Media for Science Museum'),
('SHC539', 'ปริญญานิพนธ์', 'Thesis');

-- --------------------------------------------------------

--
-- Table structure for table `subject_term`
--

CREATE TABLE `subject_term` (
  `sub_id` varchar(100) NOT NULL DEFAULT '',
  `sub_section` varchar(50) NOT NULL DEFAULT '',
  `sub_term` char(10) NOT NULL DEFAULT '',
  `sub_year` char(20) NOT NULL DEFAULT '',
  `sub_professor` varchar(255) NOT NULL DEFAULT '',
  `sub_group` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject_term`
--

INSERT INTO `subject_term` (`sub_id`, `sub_section`, `sub_term`, `sub_year`, `sub_professor`, `sub_group`) VALUES
('COS101', 'B01', '2', '2562', 'อ.อุสุมา สุขสวัสดิ์', 'IC14A(1-15) IC15A(1-14) IC16A(1-15)'),
('COS101', 'B02', '2', '2562', 'อ.อุสุมา สุขสวัสดิ์', 'IC14A(16-30) IC15A(14-28) IC16A(16-30)'),
('COS102', 'B01', '2', '2562', 'อ.ชัชฎา อัครศรีวร นากาโอคะ', 'IC11'),
('COS102', 'B02', '2', '2562', 'อ.ชัชฎา อัครศรีวร นากาโอคะ', 'IC21'),
('COS102', 'B03', '2', '2562', 'ผศ.ศรีรัฐ ภักดีรณชิต', 'IC23'),
('COS103', 'B01', '2', '2562', 'ผศ.สามมิติ สุขบรรจง', 'IC32'),
('COS103', 'B02', '2', '2562', 'ผศ.ปรวัน แพทยานนท์', 'IC14A(1-15) IC15A(1-14) IC16A(1-15)'),
('COS103', 'B03', '2', '2562', 'ผศ.ปรวัน แพทยานนท์', 'IC14A(16-30) IC15A(15-28) IC16A(16-30)'),
('COS103', 'B04', '2', '2562', 'ผศ.สามมิติ สุขบรรจง', 'IC19'),
('COS104', 'B01', '2', '2562', 'อ.MARTIN BRIAN HOLLAND', 'IC12'),
('COS104', 'B02', '2', '2562', 'Mr.Michael Balvay', 'IC17'),
('COS104', 'B03', '2', '2562', 'Mr.Michael Balvay', 'IC18'),
('COS105', 'B01', '2', '2562', 'อ.เบญจวรรณ อารักษ์การุณ', 'IC11'),
('COS105', 'B02', '2', '2562', 'อ.อรรถศิษฐ์ พัฒนะศิริ', 'IC13'),
('COS201', 'B01', '2', '2562', 'อ.MARTIN BRIAN HOLLAND', 'IC31'),
('COS201', 'B02', '2', '2562', 'อ.MARTIN BRIAN HOLLAND', 'IC22'),
('COS202', 'B01', '2', '2562', 'อ.อลีสญาฌ์ ทอย', 'IC13'),
('COS202', 'B02', '2', '2562', 'อ.ปิลันลน์ ปุณญประภา', 'IC17'),
('COS202', 'B03', '2', '2562', 'อ.ปิลันลน์ ปุณญประภา', 'IC18'),
('COS202', 'B04', '2', '2562', 'อ.นันทนุช อุดมละมุล', 'IC19'),
('COS203', 'B01', '2', '2562', 'อ.วรรณยศ บุญเพิ่ม', 'IC21'),
('COS203', 'B02', '2', '2562', 'อ.วรรณยศ บุญเพิ่ม', 'IC22'),
('COS203', 'B03', '2', '2562', 'อ.วรรณยศ บุญเพิ่ม', 'IC24A(1-14) IC25A(1-14) IC26A(1-14)'),
('COS203', 'B04', '2', '2562', 'อ.วรรณยศ บุญเพิ่ม', 'IC24A(15-27) IC25A(15-29) IC26A(15-27)'),
('COS203', 'B05', '2', '2562', 'อ.ศรัณย์ ศิริสุนทร', 'IC29'),
('COS204', 'B01', '2', '2562', 'อ.อภิรพี เศรษฐรักษ์ ตันเจริญวงศ์', 'IC27'),
('COS205', 'B01', '2', '2562', 'อ.ชัชฎา อัครศรีวร นากาโอคะ', 'IC29'),
('COS301', 'B01', '2', '2562', 'อ.ฐิศิรักน์ โปตะวณิช', 'IC27'),
('COS301', 'B02', '2', '2562', 'อ.ปรัชญา เตียวเจริญ', 'IC23'),
('COS301', 'B03', '2', '2562', 'อ.ฐิศิรักน์ โปตะวณิช', 'IC28'),
('COS302', 'B01', '2', '2562', 'อ.มยุรี ศรีกุลวงศ์', 'IC12'),
('COS302', 'B02', '2', '2562', 'อ.เบญจวรรณ อารักษ์การุณ', 'IC34A(1-15) IC35A(1-16) IC36A(1-16)'),
('COS302', 'B03', '2', '2562', 'อ.เบญจวรรณ อารักษ์การุณ', 'IC34A(16-30) IC35A(17-33) IC36A(17-32)'),
('COS401', 'B01', '2', '2562', 'อ.ฐิศิรักน์ โปตะวณิช', 'IC33');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `mem_username` varchar(255) NOT NULL,
  `borArr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `train_id` varchar(100) NOT NULL DEFAULT '',
  `train_step` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`train_id`, `train_step`) VALUES
('0', 'naver'),
('1', 'beginner'),
('2', 'intermediate'),
('3', 'excellent');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`bor_id`);

--
-- Indexes for table `borrow_data`
--
ALTER TABLE `borrow_data`
  ADD PRIMARY KEY (`bor_data_id`);

--
-- Indexes for table `borrow_data_detail`
--
ALTER TABLE `borrow_data_detail`
  ADD PRIMARY KEY (`equip_id`,`bor_data_id`);

--
-- Indexes for table `borrow_temp`
--
ALTER TABLE `borrow_temp`
  ADD PRIMARY KEY (`bor_equip_id`);

--
-- Indexes for table `calendar_holiday`
--
ALTER TABLE `calendar_holiday`
  ADD PRIMARY KEY (`holiday_date`);

--
-- Indexes for table `color_calendar`
--
ALTER TABLE `color_calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color_code`
--
ALTER TABLE `color_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`cou_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equip_id`);

--
-- Indexes for table `equipment_borrow`
--
ALTER TABLE `equipment_borrow`
  ADD PRIMARY KEY (`equip_id`);

--
-- Indexes for table `equipment_color`
--
ALTER TABLE `equipment_color`
  ADD PRIMARY KEY (`id_equip`);

--
-- Indexes for table `equipment_set`
--
ALTER TABLE `equipment_set`
  ADD PRIMARY KEY (`set_id`);

--
-- Indexes for table `equipment_type`
--
ALTER TABLE `equipment_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`dates`,`times`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`maj_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mem_id`);

--
-- Indexes for table `satisfaction_assessment_form`
--
ALTER TABLE `satisfaction_assessment_form`
  ADD PRIMARY KEY (`saf_bor_id`);

--
-- Indexes for table `set`
--
ALTER TABLE `set`
  ADD PRIMARY KEY (`set_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`stu_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`sub_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`sub_id`);

--
-- Indexes for table `subject_term`
--
ALTER TABLE `subject_term`
  ADD PRIMARY KEY (`sub_id`,`sub_section`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`mem_username`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`train_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `color_code`
--
ALTER TABLE `color_code`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
