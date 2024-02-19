import { Express, Router } from 'express';
import { Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import EmailController from '../controllers/email.controller';
import EmailService from '../services/email.service';

const router = Router();
const prefix = '/api';
const spamEmails = [
  {
    from: 'spam1@hotmail.com',
    subject: 'Spam Subject 1',
    content: 'Isso é um email de spam 1.'
  },
  {
    from: 'spam2@hotmail.com',
    subject: 'Spam Subject 2',
    content: 'Isso é um email de spam 2.'
  }
];

export default (app: Express) => {
  app.get('/helloworld', (req, res) => { 
    res.send('Hello World');
  });

  app.use(
    prefix,
    new UserController(router, di.getService(UserService)).router
  );

  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );

  app.use(
    prefix,
    new EmailController(router, di.getService(EmailService)).router
  );

  app.get('/spam', (req: Request, res: Response) => {
    // Processar os e-mails marcados como spam conforme necessário
    res.status(200).json({ spamFolder: spamEmails });
});
};
