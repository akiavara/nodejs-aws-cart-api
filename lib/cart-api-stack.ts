import * as cdk from 'aws-cdk-lib';
//import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class CartApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const handler = new lambda.Function(this, 'CartApiLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'dist/src/mainlambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-build')),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'dev',
      },
    });

    // Create a new lambda function
    /*const handler = new DockerImageFunction(this, 'CartApiDockerHandler', {
      timeout: cdk.Duration.seconds(30),
      functionName: 'Nest Js Cart Lambda Handler (Docker)',
      code: DockerImageCode.fromImageAsset(path.join(__dirname, '../')), // Location of the Dockerfile
    });*/

    // API Gateway
    const api = new apigateway.RestApi(this, 'CartApi', {
      restApiName: 'Cart Service',
      description: 'Cart API service using Nest.js',
      deploy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Integrate API Gateway with Lambda
    const integration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
    });

    // Add proxy resource that forwards all requests to the Lambda function
    api.root.addProxy({
      defaultIntegration: integration,
      anyMethod: true,
    });

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });
  }
}
