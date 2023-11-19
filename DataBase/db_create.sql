create table Customers(
    customer_id varchar(20) primary key not null ,
    first_name varchar(20) NOT NULL,
    last_name varchar(30) not null ,
    password varchar(32) not null,
    tel_number int(9) not null unique
);

create table Manufacturers(
    manufacturer_id int primary key auto_increment not null,
    name varchar(20) not null unique,
    country varchar(20) not null
);

create table Categories(
    category_id int primary key auto_increment not null,
    name varchar(25) not null unique ,
    description varchar(50)
);

create table Statuses(
    status_id int primary key not null auto_increment,
    description varchar(50) not null
);

create table Orders(
    order_id int primary key not null auto_increment,
    customer_id varchar(20),
    status_id int,
    foreign key (customer_id) references Customers(customer_id),
    foreign key (status_id) references Statuses(status_id),
    order_date timestamp default current_timestamp
);

create table Products(
    product_id int primary key not null auto_increment,
    manufacturer_id int,
    category_id int,
    foreign key (manufacturer_id) references Manufacturers(manufacturer_id),
    foreign key (category_id) references Categories(category_id),
    name varchar(50) not null,
    price int not null ,
    quantity text not null
);

create table Product_images(
    image_id int primary key auto_increment not null,
    product_id int not null,
    foreign key (product_id) references Products(product_id),
    path varchar(100)not null
);

create table Order_details(
    order_detail_id int primary key not null,
    order_id int,
    product_id int,
    foreign key (order_id) references Orders(order_id),
    foreign key (product_id) references Products(product_id),
    quality int not null
);