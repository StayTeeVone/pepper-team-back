-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 15 2023 г., 15:01
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `pepper_DB`
--

-- --------------------------------------------------------

--
-- Структура таблицы `friend_request`
--

CREATE TABLE `friend_request` (
  `id_friend_request` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_friend` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `friend_request`
--

INSERT INTO `friend_request` (`id_friend_request`, `id_user`, `id_friend`, `status`) VALUES
(16, 1, 2, 0),
(17, 1, 4, 0),
(18, 1, 7, 0),
(19, 11, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id_messages` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_friend` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `messageDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id_messages`, `message`, `id_user`, `id_friend`, `status`, `messageDate`) VALUES
(2, 'hello!!!!!', 1, 11, 0, '2023-03-13 21:42:06'),
(3, 'asdasd', 1, 11, 0, '2023-03-13 21:53:31'),
(4, '123213', 11, 1, 0, '2023-03-13 22:00:52');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(35) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `password` varchar(255) NOT NULL,
  `photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id_user`, `name`, `email`, `phone`, `role`, `password`, `photo`) VALUES
(1, 'Олег Грушкевич', 'oleh2002@gmail.com', '+38 097 943 16 70', 1, '$2a$10$j8pg/tupJ.Vxezm2J8Dy4Ohe4ZnxjU2aWVoyuucHCNp7MbJ5JzQ6G', 'default.jpg'),
(2, 'Анатолий Почечун', 'tolik@gmail.com', '0681597823', 1, '$2a$10$1jaI9uwG2bl1alCQm2pG9O1g.ii0DMYJdqsM.w.1JM0Yf9CkKkPQ2', 'default.jpg'),
(3, 'Ярослав Ярмола', 'adam@postage.tk', '4689498', 1, '$2a$10$1jaI9uwG2bl1alCQm2pG9OxkaMUrvyB10gdOXgO0kkiyPEs49Rmhu', 'default.jpg'),
(4, 'Петр Исмаилов', '0787@sellerfolders.com', '096-789-26-49', 1, '$2a$10$G5jUrUwd2bhhHWS6W.s3G.X4ZPJXcOTSkTne3uaOj7I2ORbCKhkM6', 'default.jpg'),
(5, 'Сергей Ярмоленко', 'greatones@postage.tk', '066-751-79-23', 1, '$2a$10$G5jUrUwd2bhhHWS6W.s3G.Ifogs4RCy/FHBnhgZC5TDXRGyLm0a4y', 'default.jpg'),
(6, 'Катерина Куляковская', 'yarik123@gmail.com', '0927489213', 1, '$2a$10$OgMPpwNeBpawDmrzsAW3wuaYCIlNFNqSLim1JpWjFlyeNPPz4qDae', 'default.jpg'),
(7, 'Анастасия Белова', '0788@sellerfolders.com', '097-947-26-51', 1, '$2a$10$T9igV5hIOQ6ySYcIgGxgXO2tmFdgV9Al0Dpqw79FJxYYIPpuI6d..', 'default.jpg'),
(8, 'serhey', 'asgduay@gmail.com', '4689498', 1, '$2a$10$aFJMN32LdNCyEDjbgP4LhuB7MNZSC5OrLzhxI3yAepmBXKTzKzkeS', 'default.jpg'),
(9, 'Кирилл Безсонов', 'kiril20@gmail.com', '+380 98 431 23 85', 1, '$2a$10$j8pg/tupJ.Vxezm2J8Dy4OgUFGZ4HrDNNy/LlPKw3JNzdj5MZt4fW', 'default.jpg'),
(10, 'Олег', 'olehsyd81@gmail.com', '380 97 688 22 95', 1, '$2a$10$2iyNxc09CMElv3OSltSCrurElvHMLaM/ipEORc9oGiFGimNWJj5z.', 'default.jpg'),
(11, 'opasdsa', 'sagduyas@gmail.com', '123321321', 1, '$2a$10$cI4fBtHuhwtCqkeIWjsBEeD5Gp9.fA2ecXG7m6D6efWYUyHURRh5a', 'default.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `id_user_role` int(11) NOT NULL,
  `role_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`id_user_role`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `friend_request`
--
ALTER TABLE `friend_request`
  ADD PRIMARY KEY (`id_friend_request`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_messages`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `role` (`role`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id_user_role`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `friend_request`
--
ALTER TABLE `friend_request`
  MODIFY `id_friend_request` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id_messages` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id_user_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `friend_request`
--
ALTER TABLE `friend_request`
  ADD CONSTRAINT `friend_request_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role`) REFERENCES `user_roles` (`id_user_role`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
