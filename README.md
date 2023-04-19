# Hack Pod April 19 2023

## Introduction

Lets go build! You are tasked deploy a containerized version of [Program Equity Amplify app](https://github.com/ProgramEquity/amplify) in AWS with GitHub Actions, designed as turn-key solution to accelerate cloud adoption. We will use AWS services such as [Amazon ECS](https://aws.amazon.com/ecs/) and [Amazon ECR](https://aws.amazon.com/ecr/). we will also use [AWS CloudFormation](https://aws.amazon.com/cloudformation/) as the infrastructure as code tool. 

The solution should embrace security and agility in the software development lifecycle. Here are the features / quality that we want to include in the solution:

* Secure credentials, no hard-coded secrets, use dynamic credentials, time-bound, temporary.
* Infrastructure as code (IaaC) to speed up deployment.
* Linting, policy validation and security best practice checks for IaaC
* Container image scans
* Automated deployment
* Detective and proactive guardrails

## Goals
**The most important thing we want folks to walk away is exposure to GitHub Actions and AWS. We want you to learn.**

By the end of the hackpod, we want you to:
1. Use branches and commit your code. If you've unfinished work, that's ok! The repos themselves will stay around after the hackpod. The AWS Credentials that you will receive will be valid for 72 hours.
2. Document your progress in the [Program Equity Amplify Repo Issues](https://github.com/ProgramEquity/amplify/issues).
3. Fill out the [survey](https://forms.gle/3vKuGjHqdswCYhAv5).

## Find your group

The activities should be done as part of a group. The facilitator should have formed a group for you, if not, feel free to form your own group.

We will provide an **Event engine Team Hash**, you will use it to gain access to AWS account as part of this hackpod. 

## Join the Event Engine

First you need an AWS account. For this purpose, we will use AWS provided Event Engine. This account will run for 72 hours before it will self-destruct. 

**IMPORTANT**: Do not use the account to store any personal / important data, remember your access are limited to 72 hours.

* Go to: https://dashboard.eventengine.run/login
* Use the **Event Engine Team Hash** provided by the mentor
* Login using your email address
* Use the **AWS Console** link to login to the AWS
* Save the provided environment variables for AWS credentials. You will copy-paste it to your CodeSpace later.

## Getting Started

Nominate someone  as the maintainer: The maintainer can add the remaining people access to the forked repository for collaborations. The maintainer will then follow these instructions...

- The maintainer will go here:
[https://github.com/abirismyname/actions-hackpod-template](https://github.com/abirismyname/actions-hackpod-template).
- Click "Use This Template" and then "Create a new repository". We recommend creating it as a public repo.
- Once created, go to the Repo Settings and click on "Collaborators".
- Add your teammates
- Add your AWS Credentials to the Codespace:
   - Create a folder `~/.aws/`. `~` represents the user's home folder.
   - Create a file in `~/.aws/` called `credentials` (no file extension). Full path to file: `~/.aws/credentials`
   - Set the contents of the `credentials` file like below. Substitute `<<AWS_ACCESS_KEY_ID>>`,`<<AWS_SECRET_ACCESS_KEY>>`,`<<AWS_SESSION_TOKEN>>` with the variables you receieved from the Event Engine instructions above for
```ini 
   [default]
   aws_access_key_id = <<AWS_ACCESS_KEY_ID>>
   aws_secret_access_key = <<AWS_SECRET_ACCESS_KEY>>
   aws_session_token = <<AWS_SESSION_TOKEN>>
   region = us-east-1   
```

## Bootstrap 

Next, someone will be responsible for bootstrapping up the AWS environment. The following steps will create a CloudFormation Stack containing:  
- A new IAM OIDC provider and role
- A new ECR Repository
- A new VPCStack

**IMPORTANT**: Only one personneed to perform the bootstrap.

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

Configure GitHub vars and secrets as follows:

Secrets: 
* `ROLE_TO_ASSUME` = the output value of `RoleGithubActionsARN` from CloudFormation output

Vars: 
* `AWS_REGION` = the output value of 'AWSRegion' from CloudFormation output
* `ECR_REPO_NAME` =  the output value of `ECRRepositoryName` from CloudFormation output
* `VPC_STACK_NAME` =  the output value of `VPCStackName` from CloudFormation output
* `ECS_CLUSTER_NAME` =  enter name of ECS cluster to be created
* `APP_NAME` = enter name of the app to be shown in ECS cluster

## Next step

Here are a couple pointers on the next steps:
1. We created a starter kit AWS CloudFormation template for the [ECS cluster](templates/cluster.yaml). You can use it to deploy the supporting ECS infrastructure.
2. Check out the existing [GitHub workflows files](.github/workflows) the different steps you need to perform in the comments.
3. Start coding!

## Instructions by group
These tasks are meant to be done sequentially. Group 1 needs to finish before Groups 2 and 3 can get started. Groups 2 and 3 can be work in parallel.
### Group 1 Core
- [ ] Pick a team member who will be the “maintainer”
- [ ] [Create Repo from Template](https://github.com/abirismyname/actions-hackpod-template#getting-started)
- [ ] Add teammates to repo
- [ ] [Bootstrap AWS Environment](https://github.com/abirismyname/actions-hackpod-template#bootstrap)
- [ ] Add remaining Secrets and Variables
  - [ ] Secret: ROLE_TO_ASSUME 
  - [ ] Variable: APP_NAME
  - [ ] Variable: AWS_REGION (hardcode to `us-east-1`)
  - [ ] Variable: ECR_REPO_NAME (From [Bootstrap command output](https://github.com/abirismyname/amplify-ecs-fargate#bootstrap))
  - [ ] Variable: ECS_CLUSTER_NAME 
  - [ ] Variable: VPC_STACK_NAME (From [Bootstrap command output](https://github.com/abirismyname/amplify-ecs-fargate#bootstrap))
- [ ] Validate configuration
- [ ] Review and merge PR’s from other groups
Bonus Points
- [ ] Add branch protection rules

### Group 2 CI
- [ ] Configure AWS using OIDC, check out the action: [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
- [ ] Checkout Amplify Repo (we do this so that you can start to build the Amplify app from this repo)
- [ ] Build the Amplify app
- [ ] Create a docker image (Use this [Dockerfile](https://github.com/abirismyname/actions-hackpod-template/blob/main/Dockerfile) )
- [ ] Upload to ECR
Bonus Points
- [ ] Lint the CloudFormation template (templates/), check out the action: [scottbrenner/cfn-lint-action](https://github.com/scottbrenner/cfn-lint-action)
- [ ] Perform static analysis against the CloudFormation template, check out the action: [stelligent/cfn_nag@master](https://github.com/stelligent/cfn_nag)
- [ ] Scan the docker image in ECR, check out the action: [alexjurkiewicz/ecr-scan-image](https://github.com/alexjurkiewicz/ecr-scan-image) for inspiration
- [ ] Create build summary output from scans

[Completed CI Workflow Example](https://github.com/abirismyname/amplify-ecs-fargate/blob/main/.github/workflows/ci.yml)

### Group 3 CD
- [ ] Configure AWS using OIDC, check out the [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) action. This should mirror what Group 2 did.
- [ ] Deploy the ECS cluster using the pre-build template (templates/cluster), check this action for inspiration: [aws-actions/aws-cloudformation-github-deploy](https://github.com/aws-actions/aws-cloudformation-github-deploy)
- [ ] Update ECS task definition with the new image id / tag, check this action for idea: [aws-actions/amazon-ecs-render-task-definition](https://github.com/aws-actions/amazon-ecs-render-task-definition)
- [ ] Deploy the new ECS task based on the new ECS task definition, check this action for idea: [aws-actions/amazon-ecs-deploy-task-definition](https://github.com/aws-actions/amazon-ecs-deploy-task-definition)
- [ ] Get the Amplify app URL via ECS service elastic load balancer via AWS UI
- [ ] Go to the URL in your browser (Should be something like [http://ampli-publi-1qwmkqsu76tvx-1285928569.us-east-1.elb.amazonaws.com/](http://ampli-publi-1qwmkqsu76tvx-1285928569.us-east-1.elb.amazonaws.com/))

Bonus Points
- [ ] Create summary output in GitHub Action that shows the URL
- [ ] Deploy additional guardrails, such as [AWS Security Hub](https://aws.amazon.com/security-hub/) and the [conformance pack](https://docs.aws.amazon.com/config/latest/developerguide/conformancepack-sample-templates.html) 
- [ ] Deploy web application firewalls and [AWS Managed rules](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups.html)

[Completed CD Workflow Example](https://github.com/abirismyname/amplify-ecs-fargate/blob/main/.github/workflows/cd.yml)
