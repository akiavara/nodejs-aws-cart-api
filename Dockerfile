FROM amazon/aws-lambda-nodejs

COPY . .
RUN npm install
RUN npm run build

CMD ["dist/src/main.lambda.handler"]