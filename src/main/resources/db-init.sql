INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel1', 'city1', 'adress1', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel2', 'city2', 'adress2', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel3', 'city3', 'adress3', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel4', 'city4', 'adress4', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel5', 'city5', 'adress5', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel6', 'city6', 'adress6', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel7', 'city7', 'adress7', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel8', 'city8', 'adress8', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel9', 'city9', 'adress9', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');
INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)
  VALUES('hotel10', 'city10', 'adress10', 'D. V. Kutsaniuk', 'email@gmail.com', '0963254585', '0963254585');

INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker1', 'post1', '1996-11-8', 'MALE', '10', 'previous_post1', '2010-12-5', 1);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker2', 'post2', '1996-11-8', 'MALE', '10', 'previous_post2', '2010-12-5', 1);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker3', 'post3', '1996-11-8', 'MALE', '10', 'previous_post3', '2010-12-5', 1);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker4', 'post4', '1996-11-8', 'MALE', '10', 'previous_post4', '2010-12-5', 7);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker5', 'post5', '1996-11-8', 'MALE', '10', 'previous_post5', '2010-12-5', 6);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker6', 'post6', '1996-11-8', 'MALE', '10', 'previous_post6', '2010-12-5', 1);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker7', 'post7', '1996-11-8', 'MALE', '10', 'previous_post7', '2010-12-5', 2);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker8', 'post8', '1996-11-8', 'MALE', '10', 'previous_post8', '2010-12-5', 3);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker9', 'post9', '1996-11-8', 'MALE', '10', 'previous_post9', '2010-12-5', 4);
INSERT INTO workers(full_worker_name, post, birthday, sex, experience, previous_post, date_of_employment, hotels_id)
  VALUES('worker10', 'post10', '1996-11-8', 'MALE', '10', 'previous_post10', '2010-12-5', 5);

INSERT INTO rooms(room_type, room_count, bed_type, breakfast, hotels_id)
  VALUES(1, 5, TRUE, TRUE , 1);
INSERT INTO rooms(room_type, room_count, bed_type, breakfast, hotels_id)
  VALUES(2, 5, FALSE , TRUE , 1);
INSERT INTO rooms(room_type, room_count, bed_type, breakfast, hotels_id)
  VALUES(0, 5, FALSE , TRUE , 2);
INSERT INTO rooms(room_type, room_count, bed_type, breakfast, hotels_id)
  VALUES(0, 5, TRUE, TRUE , 2);
