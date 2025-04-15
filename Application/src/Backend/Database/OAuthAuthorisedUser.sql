use studentvisiondb;

create table oauth_registered_user (
    id int auto_increment primary key,
    name varchar(255),
    givenname varchar(255),
    nickname varchar(255),
    familyname varchar(255),
    email varchar(255),
    isemailverified varchar(255),
    sub varchar(255) unique,
    picture varchar(255),
    updatedat varchar(255),
    registration_date varchar(255),
    registration_time varchar(255)
);

-- drop table oauth_registered_user;

select * from oauth_registered_user;

truncate oauth_registered_user;