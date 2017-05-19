# HDC
## Home Data Centre
Keep your household data safe, protected by strong encryption and authentication. Access your data from anywhere in the world using any device or computer.

- [HDC Requirements](http://68-kb.blogspot.com.au/2017/04/home-data-centre-hdc.html)
- [HDC Technology Stack](http://68-kb.blogspot.com.au/2017/04/hdc-technology-stack.html)

## Best practices

- Plain passwords must not be stored anywhere.
- Sensitive data should be kept in environment files.
- Sensitive data should be encrypted.
- Sensitive data should not be checked in under source control.

## Web hosting

- [Step 1 - Create an AWS account](http://68-kb.blogspot.com.au/2017/04/hdc-create-aws-account.html)
- [Step 2 - Register a domain name](http://68-kb.blogspot.com.au/2017/04/hdc-amazon-route-53.html)
- [Step 3 - Request a certificate](http://68-kb.blogspot.com.au/2017/04/hdc-aws-certficate-manager.html)
- [Step 4 - Create an ebs application](http://68-kb.blogspot.com.au/2017/04/step-4-create-application.html)

## Web Client
The Web Client is a single page app built with React. The React project was created with these commands:

```
npm install -g create-react-app
create-react-app my-app
```

The Web Client source code is stored under the `src` folder.

- [React Hello World](https://facebook.github.io/react/docs/hello-world.html)
- [React Tutorial](https://facebook.github.io/react/tutorial/tutorial.html)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Web Server
The Web Server is an Express server running on Node.js runtime. 

The Web Server source code is stored under the `server` folder.

- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Authenticate Node.js API with JWT](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)

## Single page app
The single page app is stored under the `public` folder.

## Tools

### The command `elastic`

The command line tool `elastic` builds and zips `hdc` under the `deploy/.ebs` folder.

The command `elastic` will create a zip file from your web client and web server code and places it under the `deploy/.ebs` folder. From aws elastic beanstalk portal simply upload the zip file to your website.

```
> ./elastic 1.0.2
```

### Debug

You can debug `hdc` app on your `localhost`. 
1. Build React front-end
```
> npm run build
```
2. Start express web server
```
> ./express
```
3. Start front-end
```
> open http://localhost:3000
```


