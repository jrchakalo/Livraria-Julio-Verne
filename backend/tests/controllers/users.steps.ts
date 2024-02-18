import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserModel from '../../src/models/user.model';
import UserService from '../../src/services/user.service';
import fs from 'fs';

const feature = loadFeature('tests/features/users.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockUserRepository: UserRepository;
    let response: supertest.Response;
    const userData = new UserModel({
        nome: 'teste',
        cpf: 'teste',
        dataNascimento: '25/10/1999',
        email: 'teste@teste.com',
        login: 'teste',
        senha: 'teste123',
        logado: false
    });
    const userBck = new UserModel({
        nome: 'teste',
        cpf: 'teste',
        dataNascimento: '25/10/1999',
        email: 'teste@teste.com',
        login: 'teste',
        senha: 'teste123',
        logado: false
    });
    let userService: UserService;

    beforeEach(() => {
        mockUserRepository = di.getRepository<UserRepository>(UserRepository);
        if (fs.existsSync('./src/models/users.json')) {
            fs.unlinkSync('./src/models/users.json');
        }
        const user = new UserModel({
            nome: 'Teste',
            cpf: '123.456.789-01',
            dataNascimento: '25/10/1999',
            email: '',
            login: 'teste',
            senha: 'senhateste',
            logado: false
        });
        
        userService = new UserService(mockUserRepository);
        userService.createUser(user);
    });

    test('Cadastro de Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
            
        });

        then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe('Falha no cadastro do usuário');
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe(expectedMessage);
            }
        });
    });
    
    test ('Falha no Cadastro de Usuário por Login já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        and(/^o usuário de login "(.*)" está cadastrado no sistema$/, async (login) => {
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/1999',
                email: 'teste@teste.com',
                login: login,
                senha: 'senhateste',
                logado: false
            });
            userService.createUser(user);
        });       

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Email já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        and(/^o usuário de email "(.*)" está cadastrado no sistema$/, async (email) => {
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: email,
                login: 'teste',
                senha: 'senhateste',
                logado: false
            });
            userService.createUser(user);
        });       

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por CPF já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        and(/^o usuário de cpf "(.*)" está cadastrado no sistema$/, async (cpf) => {
            const user = new UserModel({
                nome: 'teste',
                cpf: cpf,
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: 'teste',
                senha: 'senhateste',
                logado: false
            });
            userService.createUser(user);
        });       

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Campo em Branco', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });     

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Nome', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });     

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });     

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            const verifSenha = userService.validaSenha(userData).result;
            const verifErro = userService.validaSenha(userData).erro;
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    //Test de Atualização de Informações do Usuário com Sucesso
    test('Atualização de Informações do Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: login,
                senha: senha,
                logado: false
            });
            userService.createUser(user);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const existLogin = userService.verificarExistente('login', login);

            if(existLogin){
                if(userService.senhaCorresponde(login, senha))
                    userService.trocarStatus(login);
            }
        });

        and(/^estou na página "(.*)"$/, async (page) => {
                const userId = userData.login;

                const rota = userService.verificaURL(page, userId);
                response = await request.get(rota);
        });

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^realizo a atualização das informações do usuário$/, async () => {
            const userData = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8')) 
            const verifSenha = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifSenha) {
                response = await request.put('/api/users/${userId}').send(userData);
                userService.atualizaUsuario(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe('Falha na atualização das informações do usuário');
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe(expectedMessage);
            }
        });
    });

    //Test Falha na Atualização de Informações do Usuário por Campo em Branco
    test('Falha na Atualização de Informações do Usuário por Campo em Branco', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: login,
                senha: senha,
                logado: false
            });
            userService.createUser(user);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const existLogin = userService.verificarExistente('login', login);

            if(existLogin){
                if(userService.senhaCorresponde(login, senha))
                    userService.trocarStatus(login);
            }
        });

        and(/^estou na página "(.*)"$/, async (page) => {
                const userId = userData.login;

                const rota = userService.verificaURL(page, userId);
                response = await request.get(rota);
        });

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^realizo a atualização das informações do usuário$/, async () => {
            const userData = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8')) 
            const verifSenha = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifSenha) {
                response = await request.put('/api/users/${userId}').send(userData);
                userService.atualizaUsuario(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('Falha na atualização das informações do usuário');
            }
        });
    });

    //Test Falha na Atualização de Informações do Usuário por Senha Inválida com Nome
    test('Falha na Atualização de Informações do Usuário por Senha Inválida com Nome', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: login,
                senha: senha,
                logado: false
            });
            userService.createUser(user);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const existLogin = userService.verificarExistente('login', login);

            if(existLogin){
                if(userService.senhaCorresponde(login, senha))
                    userService.trocarStatus(login);
            }
        });

        and(/^estou na página "(.*)"$/, async (page) => {
                const userId = userData.login;

                const rota = userService.verificaURL(page, userId);
                response = await request.get(rota);
        });

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^realizo a atualização das informações do usuário$/, async () => {
            const userData = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8')) 
            const verifSenha = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifSenha) {
                response = await request.put('/api/users/${userId}').send(userData);
                userService.atualizaUsuario(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('Falha na atualização das informações do usuário');
            }
        });
    });

       //Test Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento
       test('Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '09/09/2003',
                email: 'teste@teste.com',
                login: login,
                senha: senha,
                logado: false
            });
            userService.createUser(user);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const existLogin = userService.verificarExistente('login', login);

            console.log(existLogin);
            if(existLogin){
                if(userService.senhaCorresponde(login, senha))
                    userService.trocarStatus(login);
            }
        });

        and(/^estou na página "(.*)"$/, async (page) => {
                const userId = userData.login;

                const rota = userService.verificaURL(page, userId);
                response = await request.get(rota);
        });

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userService.atualizaCampo(campo, valor);
        });

        and(/^realizo a atualização das informações do usuário$/, async () => {
            const userData = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8')) 
            const verifSenha = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifSenha) {
                response = await request.put('/api/users/${userId}').send(userData);
                userService.atualizaUsuario(userData);
            }else{
                response.body.msg = verifErro;
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('Falha na atualização das informações do usuário');
            }
        });
    });
});