## Node Server within apollo server

* Apollo Server
* Graph QL
* Postgresql

### Create on-premise database
```
psql postgres
CREATE ROLE graphql WITH LOGIN PASSWORD 'graphql';
ALTER ROLE graphql CREATEDB;
# To get out of the psql terminal 
\q
psql postgres -U graphql;
\du
CREATE DATABASE graphql;
\l
```

### Create database from docker
```
 npm run docker
 npm run docker:start
 npm run docker:stop
```

### Links
* https://www.robinwieruch.de/graphql-apollo-server-tutorial/
* https://docs.sequelizejs.com/manual/getting-started.html
