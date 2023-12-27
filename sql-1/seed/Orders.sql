-- seed/Orders.sql
\copy Orders FROM '../data/orders.csv' DELIMITER ',' CSV HEADER;
