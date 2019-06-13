## Node Server within apollo server

* Apollo Server
* Graph QL
* Postgresql

### Create database
```psql postgres
  CREATE ROLE graphql WITH LOGIN PASSWORD 'graphql';
  ALTER ROLE graphql CREATEDB;
  To get out of the psql terminal \q
  psql postgres -U graphql
  \du
  CREATE DATABASE graphql;
  \l
```

### Links
* https://www.robinwieruch.de/graphql-apollo-server-tutorial/
