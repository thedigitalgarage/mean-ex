MEAN Stack sample app on Digital Garage!
-----------------

The MEAN stack is a popular, open-source, full-stack JavaScript framework for building dynamic websites and web applications. By combining useful JavaScript modules such as MongoDB, Express.js, AngularJS, and Node.js. The MEAN Stack has achieved a high level of harmony between the client and server. In fact, the MEAN Stack is JavaScript from front to back which means that these applications are quick to put together, and represent the modern state of web application development.

In this brief tutorial we are going combine the MEAN Stack with best practices in both application architecture and deployment. Namely, Microservices and Linux Containers. We will bootstrap our MEAN Stack application on the popular PaaS provider, the Digital Garage. Digital Garage utilizes Red Hat Openshift, Google Kubernetes and Docker Containers to create an open and efficient way to incorporate these best practices into our project.

## Prerequisites

+ A Github account. If you do not already have a Github account, you can follow [this link](https://github.com/join?source=header-home) to sign up for free.
+ A Digital Garage Account. If you do not already have a Digital Garage account, you can sign up for free at [www.thedigitalgarage.io](http://cochera.thedigitalgarage.io/free-signup/mean).

## Bootstrapping the MEAN Stack

We will be:

+ Forking the MEAN seed project on the Digital Garage Github Organization to your private repository.
+ Creating a MEAN Stack application workspace on the Digital Garage platform.
+ Bootstrapping the MEAN Stack in your MEAN Stack Application workspace with MongoDB and Node.js containers from Docker Hub.
+ Building the AngularJS application from the source in the forked repository and deploying the application on the MEAN Stack.

After you have signed into your Github account, go to: [www.github.com/thdigitalgarage/mean-ex](www.github.com/thedigitalgarage/mean-ex) and fork the repository into your own account. This repository contains some files and a file structure that will give you a quick start on your MEAN application. I will go into more detail on the files and file structure a little further into the tutorial. For now, let's complete our setup by logging into your Digital Garage account and set up the MEAN stack.

After signing into your Digital Garage account, Choose the Add to Project link in the top menu bar to go to the template catalog.

![Add To Project](http://assets-digitalgarage-infra.apps.thedigitalgarage.io/images/screenshots/add_to_project.png)

In the add to project screen, choose the MEAN Stack Quickstart (qs-mean) from the catalog.

![Add To Project](http://assets-digitalgarage-infra.apps.thedigitalgarage.io/images/screenshots/choose_quickstart.png)

In the template configuration page for the MEAN Stack Quickstart change the Git Repository URL to point to the repository that was just forked into your account. `https://github.com/johnmccawley/mean-ex.git`. If you are running this tutorial in the free Hello World tier, you will want to set the `Memory Limit` for MongoDB to 128Mi rather than the default 192Mi. This will give your application enough room to build and deploy all of the containers it needs. For the rest of the parameters, you can simply accept the defaults for the remaining parameters and click "Create"

![Add To Project](http://assets-digitalgarage-infra.apps.thedigitalgarage.io/images/screenshots/quickstart-configure.png)

That's it. Digital Garage is now setting up your MEAN Stack. On the next page you'll be presented with some information about your new application. When you are ready, click "Continue to Overview". You will be taken to the Project Overview screen where you can watch Digital Garage do the setup work for you. In just a few minutes you'll have full MEAN stack running in containers and managed through Google Kubernetes. When MongoDB and Node.js are completely deployed, (the pod status circle is Green) simply click on the application URL in the upper right corner of the overview screen. You will be taken to a browser to see a simple "Hello World" message.

## File Structure

Now that we have the MEAN Example repository forked into your account, let's take a few minutes to review the file structure for the repository. There are many ways to structure a MEAN application. I have tried to take the best-practices from several tutorials and create a simple yet expandable file structure this example project. For further reading on file structures for the MEAN Stack, [Mean.io](http://mean.io) is a good boilerplate to see best practices and how to separate file structure. For now, though, we will just use the following structure adjust as we go.

```

mean-ex
  ├── app - files for node components (models, routes)
  ├── config - all our configuration will be here
  │   └── database.js
  ├── LICENSE
  ├── openshift
  │   └── templates
  │       └── qs-mean.json - example template for Kubernetes.
  ├── public - files for our front-end angular application
  │   ├── app.js
  │   └── index.html
  ├── package.json -npm configuration to install dependencies/modules
  ├── README.md
  ├── tests - files for basic test scripts
  └── server.js -Node configuration

```

Congratulations! You have deployed your first application on the MEAN Stack.

## Bootstrapping your application via the Command-Line-Interface (CLI)

You can create a new application using the web console or by running the `oc new-app` command from the CLI. With the  OpenShift CLI there are three ways to create a new application, by specifying either:

- [With source code](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-source-code)
- [Via templates](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-a-template)
- [DockerHub images](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-an-image)

### Create a new app from source code (method 1)

Pointing `oc new-app` at source code kicks off a chain of events, for our example run:

        $ oc new-app https://github.com/thedigitalgarage/mean-ex -l name=myapp

The tool will inspect the source code, locate an appropriate image on DockerHub, create an ImageStream for that image, and then create the right build configuration, deployment configuration and service definition.

(The -l flag will apply a label of "name=myapp" to all the resources created by new-app, for easy management later.)

### Create a new app from a template (method 2)

We can also [create new apps using template files](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-a-template). Clone the demo app source code from [GitHub repo](https://github.com/thedigitalgarage/mean-ex) (fork if you like).

        $ git clone https://github.com/thedigitalgarage/mean-ex

Looking at the repo, you'll notice one file in the openshift/templates directory:
```
mean-ex
  ├── app - files for node components (models, routes)
  ├── config - all our configuration will be here
  │   └── database.js
  ├── LICENSE
  ├── openshift
  │   └── templates
  │       └── qs-mean.json - example template for Kubernetes.
  ├── public - files for our front-end angular application
  │   ├── app.js
  │   └── index.html
  ├── package.json -npm configuration to install dependencies/modules
  ├── README.md
  ├── tests - files for basic test scripts
  └── server.js -Node configuration

```
We can create the the new app from the `qs-nodejs-mongo.json` template by using the `-f` flag and pointing the tool at a path to the template file:

        $ oc new-app -f /path/to/qs-nodejs-mongo.json

#### Build the app

`oc new-app` will kick off a build once all required dependencies are confirmed.

Check the status of your new nodejs app with the command:

        $ oc status

Which should return something like:

        In project my-project on server https://10.2.2.2:8443

        svc/mean-ex - 172.30.108.183:8080
          dc/mean-ex deploys istag/nodejs-ex:latest <-
            bc/mean-ex builds https://github.com/openshift/nodejs-ex with openshift/nodejs:0.10
              build #1 running for 7 seconds
            deployment #1 waiting on image or update

Note: You can follow along with the web console to see what new resources have been created and watch the progress of builds and deployments.

If the build is not yet started (you can check by running `oc get builds`), start one and stream the logs with:

        $ oc start-build mean-ex --follow

You can alternatively leave off `--follow` and use `oc logs build/mean-ex-n` where *n* is the number of the build to track the output of the build.

#### Deploy the app

Deployment happens automatically once the new application image is available.  To monitor its status either watch the web console or execute `oc get pods` to see when the pod is up.  Another helpful command is

        $ oc get svc

This will help indicate what IP address the service is running, the default port for it to deploy at is 8080. Output should look like:

        NAME        CLUSTER-IP       EXTERNAL-IP   PORT(S)    SELECTOR                                AGE
        mean-ex   172.30.249.251   <none>        8080/TCP   deploymentconfig=nodejs-ex,name=myapp   17m

#### Configure routing

An OpenShift route exposes a service at a host name, like www.example.com, so that external clients can reach it by name.

DNS resolution for a host name is handled separately from routing; you may wish to configure a cloud domain that will always correctly resolve to the OpenShift router, or if using an unrelated host name you may need to modify its DNS records independently to resolve to the router.

After logging into the web console with your account credentials, make sure you are in the correct project/workspace and then click `Create route`.

This could also be accomplished by running:

        $ oc expose svc/mean-ex --hostname=myapp-myproject.apps.thedigitalgarage.io

in the CLI.

Now navigate to the newly created MEAN web app at the hostname we just configured.

#### Setting environment variables

To take a look at environment variables set for each pod, run `oc env pods --all --list`.

#### Success

You should now have a MEAN welcome page rendered via AngularJS.

#### Pushing updates

Assuming you used the URL of your own forked repository, we can easily push changes and simply repeat the steps above which will trigger the newly built image to be deployed.
