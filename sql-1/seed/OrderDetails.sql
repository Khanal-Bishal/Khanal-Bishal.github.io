-- seed/OrderDetails.sql

\copy orderdetails FROM '../data/orderdetails.csv' DELIMITER ',' CSV HEADER;
