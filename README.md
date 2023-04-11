# Hack Pod April 19 2023

## Join the Event Engine

To deploy this sample application on AWS, you first need an AWS account. For this purpose, we will use AWS provided Event Engine.

* Go to: https://dashboard.eventengine.run/login
* Use the **team-hash** provided by the mentor
* Login using your email address
* Use the **AWS Console** link to login to the AWS
* Use the provided environment variables for AWS credentials and copy-paste it to your CodeSpaces

Now you have your CodeSpaces linked with the temporary AWS account that you will use to deploy your application. 

## Bootstrap 

**Prerequisites**:

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) 
* Install [jq](https://stedolan.github.io/jq/download/)
* AWS credentials configured in your AWS CLI or via environment variables.

**How to bootstrap your environment**

Populate the environment variables on your command line
```
GITHUB_ORG=<enter the GitHub Org Name>
GITHUB_REPO=<enter the GitHub repository name>
ROLE_NAME=<name of the IAM role for AWS configure credentials action that will be created. It must not be an exising IAM role.>
ECR_REPO=<enter the ECR repository name. It will be created if it doesn't already exist.>
AWS_REGION=us-east-1
AVAILABILITY_ZONES=us-east-1a,us-east-1b,us-east-1c
ECS_CLUSTER_NAME=<enter the ECS cluster name>
```

Bootstrap the AWS account using the following command
```
aws cloudformation deploy --template-file ./templates/bootstrap-minimal.yaml --stack-name amplify-bootstrap --parameter-overrides GitHubOrganization=$GITHUB_ORG RepositoryName=$GITHUB_REPO RoleName=$ROLE_NAME ECRRepositoryName=$ECR_REPO AvailabilityZones=$AVAILABILITY_ZONES ECSClusterName=$ECS_CLUSTER_NAME --region $AWS_REGION --capabilities CAPABILITY_NAMED_IAM
```

Get the stacks outputs using the following command
```
aws cloudformation describe-stacks --stack-name amplify-bootstrap --region us-east-1 | jq ".Stacks[0].Outputs[]"
```
Example output
```json
{
  "OutputKey": "VPCStackName",
  "OutputValue": "bootstrap-VPCStack-XXXXXXXXXXXX",
  "Description": "VPC Stack Name for import"
}
{
  "OutputKey": "ECRRepositoryName",
  "OutputValue": "new-weather-app",
  "Description": "ECR Repository Name"
}
{
  "OutputKey": "RoleGithubActionsARN",
  "OutputValue": "arn:aws:iam::XXXXXXXXXXXX:role/new-oidc-user-role",
  "Description": "CICD Role for GitHub Actions"
}
{
  "OutputKey": "AWSRegion",
  "OutputValue": "us-east-1",
  "Description": "AWS Region for stack deployment"
}
{
  "OutputKey": "IdpGitHubOidc",
  "OutputValue": "arn:aws:iam::XXXXXXXXXXXX:oidc-provider/token.actions.githubusercontent.com",
  "Description": "ARN of Github OIDC Provider"
}
```

Configure GitHub vars and secrets as follow:

Secrets: 
* `ROLE_TO_ASSUME` = the output value of `RoleGithubActionsARN` from CloudFormation output

Vars: 
* `AWS_REGION` = the output value of 'AWSRegion' from CloudFormation output
* `ECR_REPO_NAME` =  the output value of `ECRRepositoryName` from CloudFormation output
* `VPC_STACK_NAME` =  the output value of `VPCStackName` from CloudFormation output
* `ECS_CLUSTER_NAME` =  enter name of ECS cluster to be created
* `APP_NAME` = enter name of the app to be shown in ECS cluster

## Next step

Lets go build! You are tasked to create a new architecture in AWS with GitHub Actions, designed as turn-key solution to accelerate cloud adoption. 

The solution should embrace security and agility in software development. Here are the features / quality that we look on the solution:

* Secure credentials, no hard-coded secrets, use dynamic credentials, time-bound, temporary.
* Infrastructure as code (IaaC) to speed up deployment.
* Linting, policy validation and security best practice checks for IaaC
* Container image scans
* Automated deployment
* Detective and proactive guardrails

Check out the existing GitHub workflows files for inspiration.