SET FOREIGN_KEY_CHECKS = 0; -- Désactive les vérifications des clés étrangères

-- Suppression des tables existantes
DROP TABLE IF EXISTS Bar_Drink;
DROP TABLE IF EXISTS Bar_Games;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Drink;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Bar;
DROP TABLE IF EXISTS Users;

SET FOREIGN_KEY_CHECKS = 1; -- Réactive les vérifications des clés étrangères

-- Table des utilisateurs
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_created DATETIME,
    user_name VARCHAR(100) UNIQUE,
    user_email VARCHAR(100) UNIQUE,
    user_role VARCHAR(50),
    user_pass VARCHAR(255) -- Note : remplacer par bcrypt/pbkdf2 pour production
);

-- Table des bars
CREATE TABLE Bar (
    id_bar INT AUTO_INCREMENT PRIMARY KEY,
    name_bar VARCHAR(30),
    address_bar VARCHAR(255),
    hours_bar TIME,
    size_bar INT
);

-- Table des boissons
CREATE TABLE Drink (
    id_drink INT AUTO_INCREMENT PRIMARY KEY,
    name_drink VARCHAR(30),
    price_production_drink INT,
    price_selling_drink INT,
    ingredient_drink VARCHAR(255),
    quantity_drink INT
);

-- Table des jeux de société
CREATE TABLE Games (
    id_game INT AUTO_INCREMENT PRIMARY KEY,
    name_game VARCHAR(30),
    price_game INT,
    time_game TIME,
    nb_people_min_game INT, -- Correction de la faute de frappe
    nb_people_max_game INT, -- Correction de la faute de frappe
    state_game VARCHAR(30)
);

-- Table des employés
CREATE TABLE Employee (
    id_employee INT AUTO_INCREMENT PRIMARY KEY,
    name_employee VARCHAR(30),
    age_employee INT,
    gender_employee VARCHAR(6),
    post_employee VARCHAR(30),
    salary_employee INT,
    id_bar INT,
    FOREIGN KEY (id_bar) REFERENCES Bar(id_bar)
);

-- Table pour associer les bars aux boissons
CREATE TABLE Bar_Drink (
    id_bar INT,
    id_drink INT,
    PRIMARY KEY (id_bar, id_drink),
    FOREIGN KEY (id_bar) REFERENCES Bar(id_bar),
    FOREIGN KEY (id_drink) REFERENCES Drink(id_drink)
);

-- Table pour associer les bars aux jeux
CREATE TABLE Bar_Games (
    id_bar INT,
    id_game INT,
    PRIMARY KEY (id_bar, id_game),
    FOREIGN KEY (id_bar) REFERENCES Bar(id_bar),
    FOREIGN KEY (id_game) REFERENCES Games(id_game)
);

-- Insertion des utilisateurs
INSERT INTO Users (user_created, user_name, user_email, user_role, user_pass)
VALUES
    (NOW(), 'admin', 'admin@example.com', 'ADMIN', SHA2('adminpass', 224)),
    (NOW(), 'john_doe', 'john@example.com', 'USER', SHA2('johnpass', 224)),
    (NOW(), 'jane_doe', 'jane@example.com', 'USER', SHA2('janepass', 224));

-- Insertion des bars
INSERT INTO Bar (id_bar, name_bar, address_bar, hours_bar, size_bar) VALUES
(1, 'The Cozy Pub', '123 Main St', '12:00:00', 100),
(2, 'The Night Owl', '456 Elm St', '18:00:00', 150),
(3, 'Sunny’s Tavern', '789 Oak St', '15:00:00', 120);

-- Insertion des boissons
INSERT INTO Drink (id_drink, name_drink, price_production_drink, price_selling_drink, ingredient_drink, quantity_drink) VALUES
(1, 'Beer', 50, 100, 'Hops, Water, Yeast', 200),
(2, 'Wine', 100, 200, 'Grapes, Yeast', 150),
(3, 'Whiskey', 150, 300, 'Grain, Water', 100),
(4, 'Soda', 20, 50, 'Carbonated Water, Sugar', 300);

-- Insertion des jeux
INSERT INTO Games (id_game, name_game, price_game, time_game, nb_people_min_game, nb_people_max_game, state_game) VALUES
(1, 'Pool', 500, '00:30:00', 2, 4, 'Available'),
(2, 'Darts', 300, '00:15:00', 2, 8, 'Available'),
(3, 'Foosball', 400, '00:20:00', 2, 4, 'Available'),
(4, 'Poker', 600, '01:00:00', 4, 10, 'Available'),
(5, 'Chess', 100, '01:00:00', 2, 2, 'Available');

-- Insertion des employés
INSERT INTO Employee (name_employee, age_employee, gender_employee, post_employee, salary_employee, id_bar) VALUES
('John Doe', 30, 'Male', 'Bartender', 2500, 1),
('Jane Smith', 28, 'Female', 'Waitress', 2200, 1),
('Bob Johnson', 35, 'Male', 'Manager', 3000, 1);

-- Associer les bars aux boissons
INSERT INTO Bar_Drink (id_bar, id_drink) VALUES
(1, 1), 
(1, 2), 
(2, 3),
(2, 4),
(3, 1), 
(3, 4); 

-- Associer les bars aux jeux
INSERT INTO Bar_Games (id_bar, id_game) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 3), 
(2, 4),
(3, 1), 
(3, 2),
(3, 5);
