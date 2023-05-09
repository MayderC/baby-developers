CREATE LOGIN babydev WITH PASSWORD = 'Password123.';
CREATE DATABASE babydevdb;
USE babydevdb;
CREATE USER babydevuser FOR LOGIN babydev;
EXEC sp_addrolemember 'db_owner', 'babydevuser';