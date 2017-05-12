# hdc
## home data centre
Keep your household data safe, protected by strong encryption and authentication. Access your data from anywhere in the world using any device or computer.

## technology stack

- elastic beanstalk
- node.js
- react.js
- express

## hidden stuff

Secret stuff are kept in environment files and should not be checked in.

## prerequisites

You need to follow aws elastic beanstalk documentation to secure your website with `https` access via properly signed certificate. You also need to disable `http`. This would mean you need to have a folder `.ebextensions` under the folder `deploy` with a file `securelistener.config`. This file should contain something similar to this:

```
option_settings:
  aws:elb:listener:443:
    SSLCertificateId: arn:********************
    ListenerProtocol: HTTPS
    InstancePort: 80
```

## build tool

The command line tool `elastic` builds and zips the **hdc** app under the `deploy` folder.

### usage

This will create a zip file `dist.1.0.2` from your source code and places it under the `deploy` folder. From aws elastic beanstalk environment simply upload the zip file to your website.

```
> ./elastic 1.0.2
```

