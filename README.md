## Setup

Run this command to initialize a new project in a new working directory.

```
npm install && cd client && npm install
```

## Usage

**Deploy**

```
$ npm run deploy
```

**Build Client**

After deployment copy AWS Lambda endpoint URL and insert it in the ./client/App.tsx file line:21 
Run `npm run build` command in the client directory to build client app
To deploy client app use this command in root directory:

```
$ npm run deploy:client
```

**Local testing**

Run `cd client && npm run` it will open browser localhost:3000 with React app
To invoke Lambda and API Gateway locally run `npm run local` and don't forget to replace local endpoint URL in the ./client/App.tsx file line:21 

