DROP TABLE IF EXISTS user;
create table user
(
	username varchar(255) not null
		primary key,
	name varchar(255) null,
	password varchar(255) null,
	introduce varchar(255) null,
	type varchar(255) null
)
;
DROP TABLE IF EXISTS user_role;
create table user_role
(
	uid varchar(255) not null,
	role varchar(255) not null
)
;
DROP TABLE IF EXISTS course;
create table course
(
	id bigint auto_increment
		primary key,
	teacherId varchar(255) not null,
	name varchar(255) not null,
	introduce varchar(255) not null,
	date datetime not null
)
;
DROP TABLE IF EXISTS course_student;
create table course_student
(
	courseId bigint not null,
	studentId varchar(255) not null
)
;
DROP TABLE IF EXISTS file;
create table file
(
	id bigint auto_increment
		primary key,
	courseId bigint not null,
	uploaderId varchar(255) not null,
	filename varchar(255) not null,
	path varchar(255) not null,
	size bigint not null,
	date datetime not null
)
;
DROP TABLE IF EXISTS lesson;
create table lesson
(
	id bigint auto_increment
		primary key,
	courseId bigint not null,
	introduce varchar(255) null,
	data datetime not null,
	state int(1) null
)
;
DROP TABLE IF EXISTS notice;
create table notice
(
	id bigint auto_increment
		primary key,
	courseId bigint not null,
	content varchar(255) not null,
	date datetime not null
)
;
DROP TABLE IF EXISTS sign;
create table sign
(
	courseId bigint not null,
	lessonId bigint not null,
	studentId varchar(255) not null
)
;


