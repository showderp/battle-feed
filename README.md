# showderp/battle-feed

This streams champ battles to Discord. Runs on AWS.

## How it works
1. [AWS Lambda](https://aws.amazon.com/lambda/): This performs all the necessary 4chan API requests to determine what the most recent battle post is.
2. [AWS CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html): This triggers the lambda every minute to pick up new posts, if any exist.
3. [AWS DynamoDB](https://aws.amazon.com/dynamodb/): This acts as a simple key-value store, keeping track of the time the last champ post was seen.

## Development
### Prerequisites
1. [Node.js](https://nodejs.org/)
2. [AWS CLI](https://aws.amazon.com/cli/)  (be sure to configure your AWS credentials)
3. [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
4. A Discord webhook: When deploying, you'll need your Webhook id and token.

### Scripts
#### NPM Scripts
- `npm run build`: Compiles all of the TypeScript files and places the compiled JavaScript files in `dist/`.
- `npm run lint`: Lints the TypeScript files for style
- `npm run lint-fix`: Lints the TypeScript files for style and fixes any issues that can be automatically fixed
- `npm run postinstall`: Simply runs `npm run build`. Stupid hack to get SAM to build properly

#### Useful SAM Commands
- `sam build`: Builds the SAM application
- `sam deploy`: Deploys the application to your AWS account.

## TODOs
- Add unit tests
- Add CI/CD