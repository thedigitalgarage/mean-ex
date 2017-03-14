MEAN Stack sample app on Digital Garage!
-----------------

This example will serve a welcome page.

### Creating a project/workspace on Digital Garage

If you do not already have an account you can sign up for free [here](www.thedigitalgarage.io). After you sign into your account you can create a project/workspace.

### Creating new apps

You can create a new application using the web console or by running the `oc new-app` command from the CLI. With the  OpenShift CLI there are three ways to create a new application, by specifying either:

- [With source code](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-source-code)
- [Via templates](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-a-template)
- [DockerHub images](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-an-image)

#### Create a new app from source code (method 1)

Pointing `oc new-app` at source code kicks off a chain of events, for our example run:

        $ oc new-app https://github.com/thedigitalgarage/mean-ex -l name=myapp

The tool will inspect the source code, locate an appropriate image on DockerHub, create an ImageStream for that image, and then create the right build configuration, deployment configuration and service definition.

(The -l flag will apply a label of "name=myapp" to all the resources created by new-app, for easy management later.)

#### Create a new app from a template (method 2)

We can also [create new apps using template files](http://docs.thedigitalgarage.io/dev_guide/new_app.html#specifying-a-template). Clone the demo app source code from [GitHub repo](https://github.com/thedigitalgarage/mean-ex) (fork if you like).

        $ git clone https://github.com/thedigitalgarage/mean-ex

Looking at the repo, you'll notice one file in the openshift/templates directory:

mean-ex
  ├── app
  ├── config
  │   └── database.js
  ├── LICENSE
	├── openshift
	│   └── templates
	│       └── qs-nodejs-mongo.json
  ├── public
	│   ├── app.js
  │   └── index.html
	├── package.json
  ├── README.md
	└── server.js

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
