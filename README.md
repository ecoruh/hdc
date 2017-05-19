# hdc
## Home Data Centre
Keep your household data safe, protected by strong encryption and authentication. Access your data from anywhere in the world using any device or computer.

- [HDC Requirements](http://68-kb.blogspot.com.au/2017/04/home-data-centre-hdc.html)
- [HDC Technology Stack](http://68-kb.blogspot.com.au/2017/04/hdc-technology-stack.html)

## Best practices

- Sensitive meta data required by `hdc` should be kept in environment files and should not be checked in.
- Sensitive data should be encrypted and should not be checked in.

## Web hosting

- [Step 1 - Create an AWS account](http://68-kb.blogspot.com.au/2017/04/hdc-create-aws-account.html)
- [Step 2 - Register a domain name](http://68-kb.blogspot.com.au/2017/04/hdc-amazon-route-53.html)
- [Step 3 - Request a certificate](http://68-kb.blogspot.com.au/2017/04/hdc-aws-certficate-manager.html)
- [Step 4 - Create an ebs application](http://68-kb.blogspot.com.au/2017/04/step-4-create-application.html)

You need to follow aws elastic beanstalk documentation to secure your website with `https` access via properly signed certificate. You also need to disable `http`. This would mean you need to have a folder `.ebextensions` under the folder `deploy` with a file `securelistener.config`. 

[Configuring Your Elastic Beanstalk Environment's Load Balancer to Terminate HTTPS](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html)

## elastic

The command line tool `elastic` builds and zips `hdc` under the `deploy/.ebs` folder.

The command `elastic` will create a zip file from your web client and web server code and places it under the `deploy/.ebs` folder. From aws elastic beanstalk portal simply upload the zip file to your website.

```
> ./elastic 1.0.2
```

## debug

You can debug your app on `localhost`. 
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


