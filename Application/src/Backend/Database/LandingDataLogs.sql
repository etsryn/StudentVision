create database StudentVisionDB;
use StudentVisionDB;

create table user_logs (
    id int auto_increment primary key,
    ip varchar(50),
    location varchar(255),
    timezone varchar(100),
    browser varchar(100),
    os varchar(100),
    screen_size varchar(50),
    geolocation varchar(255),
    device_type varchar(50),
    connection_type varchar(50),
    referrer text,
    language varchar(50),
    time_format varchar(100),
    ad_blocker varchar(50),
    cpu_info varchar(255),
    gpu_info varchar(255),
    battery varchar(50),
    ram varchar(50),
    storage varchar(100),
    audio_devices text,
    media_devices text,
    fonts text,
    webgl_renderer varchar(255),
    touch_support varchar(50),
    user_agent text,
    created_at timestamp default current_timestamp
);