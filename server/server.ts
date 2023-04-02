import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import connect from './config/connection.js';
import { authMiddleware } from './utils/auth.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const app: Application = express();

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
  .catch((error: Error) => {
    console.log(`Error connecting to database: ${error}`);
  });
