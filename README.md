# HDC
## Home Data Centre
Keep your household data safe, protected by strong encryption and authentication. Access your data from anywhere in the world using any device or computer.

- [HDC Requirements](http://68-kb.blogspot.com.au/2017/04/home-data-centre-hdc.html)
- [HDC Technology Stack](http://68-kb.blogspot.com.au/2017/04/hdc-technology-stack.html)

# HDC Technology Stack 

HDC uses an AWS Elastic Beanstalk (EBS) environment. EBS provides a seamless environment to deploy and manage your app. 

> EBS is great and the HDC app I shared in this repository is a fully functioning version, so you can go ahead and adopt it in your EBS environment. But beware of the costs. EBS is probably an overkill for a simple app like HDC, which has a very low hit rate. HDC would cost around $30 (45 AUD) a month even with the leanest EC2 option. You may want to consider using technologies with much lower cost, such as serverless (AWS Lambda).

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

## Deployment

### Step 1. Create your .env file

The `server/crypto/.env` file shall contain sensitive parameters required to deploy and operate your app securely.

The `server/crypto/.env` should never be checked in under source control.

Contents of `server/crypto/.env` file are given below.

*  SECRET1 and SECRET2 are random seeds. Make them as long and as randomly formed possible.
*  CLRFILE is a tab delimited clear file that holds name value pairs like `My bank password\t1234567890`.
* ENCFILE is the encrypted binary file with *.enc extension. This file is the encrypted version of the CLRFILE. ENCFILE shall be deployed to the cloud via `elastic` script.

```
SECRET1=1234567890qwertyuiop1234567890qwertyuiop
SECRET2=qwertyuiop1234567890qwertyuiop1234567890
CLRFILE=foo.tab
ENCFILE=foo.enc
```

### Step 2. Generate hash from password

The crypto tool allows generation of hash code from a login password and contents of the `.env` file. This password shall be used to login to the application. The following command shall ask for the new login password, it will encrypt the clear data file and make it ready for deployment. 

```
> cd server/crypto
> node app
```

### Step 2. Create application zip file with command `elastic`

The command line tool `elastic` builds and zips `hdc` application under the `deploy/.ebs` folder.

The command `elastic` will create a zip file from your web client and web server code and places it under the `deploy/.ebs` folder. From aws elastic beanstalk portal simply upload the zip file to your website.

```
> ./elastic 1.0.2
```

### Debug

You can debug `hdc` app on your `localhost:3000`. 
1. Build and start express web server
```
> ./express
```
2. Start front-end
```
> open http://localhost:3000
```
