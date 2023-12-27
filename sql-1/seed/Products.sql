-- seed/Products.sql
\copy Products FROM '../data/products.csv' DELIMITER ',' CSV HEADER;
