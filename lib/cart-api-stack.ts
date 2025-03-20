import * as cdk from 'aws-cdk-lib';
//import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dotenv from 'dotenv';

dotenv.config();

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
        NODE_ENV: 'production',
        DB_HOST: process.env.DB_HOST || '',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_NAME: process.env.DB_NAME || '',
        DB_USERNAME: process.env.DB_USERNAME || '',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        AWS_REGION: this.region,
      },
    });

    // Grant permissions to access RDS
    handler.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['rds-db:connect', 'rds:DescribeDBInstances'],
        resources: ['*'], // You might want to restrict this to specific RDS ARN
      }),
    );

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
