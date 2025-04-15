create database StudentVisionDB;

use StudentVisionDB;

create table landing_data_logs (
    id int auto_increment primary key,
    ip varchar(255),
    location varchar(255),
    timezone varchar(255),
    browser varchar(255),
    os varchar(255),
    screensize varchar(255),
    geolocation varchar(255),
    devicetype varchar(255),
    connectiontype varchar(255),
    referrer varchar(255),
    language varchar(255),
    timeformat varchar(255),
    adblocker varchar(255),
    cpuinfo varchar(255),
    gpuinfo varchar(255),
    battery varchar(255),
    ram varchar(255),
    storage varchar(255),
    audiodevices varchar(255),
    mediadevices varchar(255),
    fonts varchar(255),
    webglrenderer varchar(255),
    touchsupport varchar(255),
    useragent text,
    log_date varchar(255),
    log_time varchar(255)
);

-- drop table landing_data_logs;

select * from landing_data_logs;
select log_date, log_time from landing_data_logs;

truncate landing_data_logs;