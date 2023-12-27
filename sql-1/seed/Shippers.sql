-- seed/Shippers.sql

\copy Shippers FROM '../data/shippers.csv' DELIMITER ',' CSV HEADER;
