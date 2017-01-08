# Overview
momkid is a project for trying to learn aws features(as new aws developer). Sample application is a interaction between 2 ios apps through aws infrastructure.If you are familiar with aws and its infrastructure this may not be useful and may seem not much in this sample.

momkid is application which help connecting mom and his/her kid. At present the only option is communicating regarding their afterschool food options.

# What you need to use this sample
* Mac computer to do ios application ( this is optional and used only as client to RestApi hosted in aws)
* If you want to download this sample on a ios device then you need a ios developer account which will cost you $100 per year ( you can use simulator from XCode for major functionality except push notifications does not work in simulator)
* aws account which you can signup for free for a year ( you may incur some costs based on your experimentation as you may cross some free limits. for example [CodePipeline](https://aws.amazon.com/codepipeline/) is free for one pipeline and each additional one costs a $1 per month and not knowing this I had $10 cost at one time :) )
* For Node.js IDE you can use [Clould 9](https://c9.io) 
 
# Goals
* As a new to aws enviornment, experiment with aws and get a sample application from end to end ( from source code check-in to application deployment)
* Use less code and more aws features
* No authentication and not much error handle ( aws default handler is pretty good with and can log good information [CloudWatch] (https://aws.amazon.com/cloudwatch/) logs

# Technology
* swift 3.0 for ios development
* javascript (node.js) for server development

# Application
## architecture
[[https://github.com/sairamaj/momkid/blob/master/archtecturediagram.png|alt=architecture]]
 

# ios apps
### momapp
momapp has the options of adding and removing menu items available for his/her kid. Also orders send by the kid can be  viewed. Adding and removing menu items from this app will be notified to kidapp through ios push notifications.

### kidapp
kidapp has the option of viewing the menu items and ordering a particular item which will be notified to momapp through push notifications.

# aws 
following aws features were used
### [api gateway](https://aws.amazon.com/api-gateway/)
### [lambda](https://aws.amazon.com/lambda/)
### [dynamodb](https://aws.amazon.com/dynamodb/)
### [cloudformation](https://aws.amazon.com/cloudformation/)
### [codepipeline](https://aws.amazon.com/codepipeline/)
### [simple notification service](https://aws.amazon.com/sns/)
### [clouldwatch](https://aws.amazon.com/sns/)

# Hardware
 Used Mac for IOS development ( don't have choice here)
 Used both windows and [clould 9](https://c9.io/) for server side development (Node.js)

# Software
* XCode for ios with Swift 3.0
* [clould 9](https://c9.io) 
* [Visual code editor](https://code.visualstudio.com/)

# Tools
*  [node.js] (https://nodejs.org/en/)
*  [mocha for javascript testing] (https://www.npmjs.com/package/mocha)
*  [should for test assertions](https://www.npmjs.com/package/should)
*  aws-sdk
*  [standard for javascript standards] (https://www.npmjs.com/package/standard)
*  aws cli
*  aws console

# source code
         /
         /src                    source root
         /src/server             server side code  (Javascript)
         /src/client             client side code root
         /src/client/ios         ios app code root
         /src/client/ios/momapp  momapp source code (swift)
         /src/client/ios/kidapp  kidapp source code (swift)
         /test                   integration test (javascript mocha test cases)
         /test/manual            manual testing of Rest Api
# Development
## Server 
### Dynamo Db
[dynamodb](https://aws.amazon.com/dynamodb/) is NoSQL database in aws. 
following tables were used in this app.
<table>   
   <tr>
      <td>menuitem</td>
   </tr>
   </tr>
      <td></td>
      <td>name</td>
      <td>menu item name</td>
      <td>key</td>
   </tr>
   <tr>
      <td>order</td>
   </tr>
   <tr>
      <td></td>
      <td>confirmationId</td>
      <td>order confirmation id</td>
      <td>key</td>
   </tr>

   <tr>
      <td></td>
      <td>menuitem</td>
      <td>menu item ordered</td>
      <td></td>
   </tr>

   <tr>
      <td></td>
      <td>date</td>
      <td>date and time ordered</td>
      <td></td>
   </tr>

</table>
dynamodb can be tested [locally]
  (https://aws.amazon.com/about-aws/whats-new/2013/09/12/amazon-dynamodb-local/) (without aws account) and when everything is ready one can point the url to aws cloud.
#####    steps:
*       develop locally using local test tool provided by aws   
*       if good then point url to cloud and now things should work in clould
*       automate these steps using [clouldformation](https://aws.amazon.com/cloudformation/) ( more on this below)  


### Lambda
[lambda](https://aws.amazon.com/lambda/) 
is code which will be run somewhere(you don't care and this is what makes serverless) following functions were used in this app
<table>
  <tr>
    <td>addMenuItem</td>
    <td>adds a menu item</td>
  </tr>
  <tr>
    <td>removeMenuItem</td>
    <td>removes a menu item</td>
  </tr>
  <tr>
    <td>getMenuItems</td>
    <td>gets menuitems</td>
  </tr>
  <tr>
    <td>addOrder</td>
    <td>adds a order</td>
  </tr>
  <tr>
    <td>getOrders</td>
    <td>gets existing orders</td>
  </tr>
     
</table>
				
these lambda functions will be attached to api gateway to be executed for REST api.
##### steps:
*          create manually functions in aws console
*          test through aws console
*          automate using [clouldformation](https://aws.amazon.com/cloudformation/) ( more on this below)  

### Api Gateway

[api gateway](https://aws.amazon.com/api-gateway/) is where Rest Apis will be created.
following are the RestApi used in this app.
<table>   
   <tr>
      <td>/menuitem</td>
      <td>GET</td>
      <td></td>
      <td>gets menu items</td>
   </tr>
   <tr>
      <td>/menuitem</td>
      <td>POST</td>
      <td>pay load: { "name": "Pasta"}</td>
      <td>adds menu items</td>
   </tr>
   <tr>
      <td>/menuitem</td>
      <td>DELETE</td>
      <td>/{menuItem}</td>
      <td>removes menu items</td>
   </tr>
   <tr>
      <td>/orders</td>
      <td>GET</td>
      <td></td>
      <td>gets current orders</td>
   </tr>
   <tr>
      <td>/orders</td>
      <td>POST</td>
      <td>pay load: {"menuitem": "Pasta"}</td>
      <td>adds a order with menu item</td>
   </tr>
   </tr>
</table>

while creating api Gateway choose as lambda in integration.
#####    steps:
*          create manually and connect lambda
*          test through console
*          deploy through console ( important as without this the url is not available outside)
*          test through the desktop (using curl or any other client tool)
*          automate these through [clouldformation](https://aws.amazon.com/cloudformation/) ( more on this below)  

### SNS

[simple notification service](https://aws.amazon.com/sns/faqs/) is notification service capable of pusing notifications(email, push notificaitons, sms)

2 topics( a topic is collection of endpoints(push notifications)) were created one for _momkid_ ios app push notification and another for _momkid_ push notification )

From lambda code (addMenuItem.js,removeMenuItem.js,addOrder.js) sns notifications sent using aws-sdk api.
<table>
    <tr>
        <td>addMenuItem</td>
        <td>notification to kidapp</td>
    </tr>
    <tr>
        <td>removeMenuItem</td>
        <td>notification to kidapp</td>
    </tr>
    <tr>
        <td>addOrder</td>
        <td>notification to momapp</td>
    </tr>
</table>

#####    steps:
* get device ids for both ios devices (2 devices used one for momapp and another one for kidapp). Device id for ios devices can be obtained by following [here](https://community.pushwoosh.com/questions/243/how-can-i-find-what-is-my-device-token)
* through console add application 
* through console add topic
* test from console
* currently these steps were not automated but can done easily by using clouldformation

### CloudFormation
   [clouldformation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-ug.pdf) from aws web site is: "AWS CloudFormation is a service that helps you model and set up your Amazon Web Services
resources so that you can spend less time managing those resources and more time focusing on your
applications that run in AWS. You create a template that describes all the AWS resources that you
want (like Amazon EC2 instances or Amazon RDS DB instances), and AWS CloudFormation takes
care of provisioning and configuring those resources for you. You don't need to individually create and
configure AWS resources and figure out what's dependent on what; AWS CloudFormation handles all
of that.

so far we have done things manually in console to setup dynamodb, lambda and api Gateway to get our Rest API working.
now we can automate these using [clouldformation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-ug.pdf).

with clouldformation you define a template about what you want and use and using one of the tools (console,awi-cli, aws-sdk, codepipeline)
apply this template. By applying this template all resources are created automatically and by deleting this template things wll be cleanedup completely.

The template can be defined in [json](http://www.json.org/) or [yaml](http://yaml.org/) format. I choose yaml format which is much simpler.
For serverless infrastrucutre the resource type used will be : AWS::Serverless.*

<table>
  <tr>
     <td>lambda with api gateway</td>
     <td>AWS::Serverless::Function</td>
  </tr>
  <tr>
    <td>creating table</td>
    <td>AWS::Serverless::SimpleTable</td>
  </tr>
</table>

#####    steps:
* author the app_spec.yaml with resource
* use aws command line tool to package (later we will use codepipeline to automate this steps also).
  * package creates the source in to  zip and uploads to s3 bucket and creates new template with newly updated source url (this is how source is uploaded)
  * command to package is "_aws cloudformation package --template-file app_spec.yaml --output-template-file new_app_spec.yaml --s3-bucket momkid_"
* use aws command to deploy and this creates a stack(this will be automated later using code pipeline) ( which you can monitor the progress in console )
  * deploy is the one which creates all the resources ( api gateway, lambda, database)
  * command to deploy using "_aws is: aws cloudformation deploy --template-file new_app_spec.yaml --stack-name momkid --capabilities CAPABILITY_IAM --parameter-overrides Stage=prod_"

once you applied this template everything is ready to go and one can test Rest Api using curl at this point.  

### Codepipeline

 [codepipeline](http://docs.aws.amazon.com/codepipeline/latest/userguide/codepipeline-user.pdf) is a continuous integration and continuous delivery service 

with momapp RestApi we have devidied in below steps
* source code step( github is the source)
* code build which runs clould formation package command to package the source in to s3 bucket
* deploy in to **cert** ( use clouldformation deploy in to **momapp_cert**) where api gateway, lamdba and dynamodb tables are suffixed with cert
* run integration test (run mocha on test directory to with cert urls to see cert deployment worked)
* manual approval ( at this stage a notification will be sent (SNS configured) to approver)
* once approved deploy to prod (use cloudformation deploy in to **momapp_prod**)

If any code is checked in github (https://github.com/momkid) within minutes codepipe line will be run and email is sent to approver.

#####    steps:
* building codepipe line is done manual (through console at this time ) but can be used clouldformation templates to automate these steps also.

## Client
### ios push notifications
iOS 9, push notifications can:
* Display a short text message
* Play a notification sound
* Set a badge number on the app�s icon
* Provide actions the user can take without opening the app
* Be silent, allowing the app to wake up in the background and perform a task

In order to do push notifications there are plenty of steps which are described [here](https://www.appcoda.com/push-notification-ios/).
aws makes all these steps very easy as simple as sending email (through aws sns) after initial setup with ios certificates.

#####    steps:
* download APN push certificate from apple developer site
* _openssl_ tool will allow to extract public and private key from the certificates which you need to setup in aws console
* in aws ssn console, create application which will ask for these private and public certificate
* add a end point( setting up ios device ) with device id where you want to send the notifications.[how to get device id of a device](https://community.pushwoosh.com/questions/243/how-can-i-find-what-is-my-device-token) 
* send a test message in console and you should see a notification in your ios app. 
* create a topic with the above application (you can send message directly to application but creating a topic and adding multiple subscriptions like email, sms, push notifications is good idea.)
* send a test message to this topic through console
* now you can use aws-sdk from your lambda java script code to send a message to this topic.
```javascript
 var payload = {
    default: data,
    APNS: {
      aps: {
        alert: data,
        sound: 'default',
        badge: 1
      }
    }
  }

  // first have to stringify the inner APNS object...
  payload.APNS = JSON.stringify(payload.APNS)
  // then have to stringify the entire message payload
  payload = JSON.stringify(payload)

  sns.publish({
    Message: payload,
    MessageStructure: 'json',
    TopicArn: topicArn
  }, callback)
```
### momapp
momapp used by mom to take care of his/her kid and it is simple Swift app with only 3 table views.
* main screen
  * view orders
    * current orders
  * menu
    * list of available menu items (can add/remove)
it uses the api gateway API to communicate to aws 

### kidapp
kidapp used by kid to view the menu items and then make a order. This app uses just one table view to display the menu items
* main screen
  * view ( and order a menuitem)
it uses the api gateway API to communicate to aws

# Some things I learned along the way
* start everything with aws console and then use aws cli tool to automate 
* test individual items (like lambda, gateway, dynamo db) in console as they have test feature 
* aws documentation is prety good
* aws free account is not really free as with experimentation you may cross free limits (enable alerts on billing to be notify)
* having worked on windows where things are case insensitive but in aws world where i used ubuntu for build I have to be careful using proper case.
* also on the same lines the backslash (\) and forward slash(/) work in windows but does not in aws world ( I have to use / for file paths)

# Resources
while learning found very useful blogs
* [Continuous Deployment for Serverless Applications] (https://aws.amazon.com/it/blogs/compute/category/amazon-api-gateway/?nc1=h_ls)
* [Introducing Simplified Serverless Application Deployment and Management] (https://aws.amazon.com/blogs/compute/introducing-simplified-serverless-application-deplyoment-and-management/)
* [Beginer's guid to push notifications in Swift](https://www.appcoda.com/push-notification-ios/)


