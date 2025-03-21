FROM amazon/aws-lambda-nodejs

COPY . .
RUN npm install --production
RUN npm run build

CMD ["dist/src/mainlambda.handler"]