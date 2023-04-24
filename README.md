# Do not include sensitive information in React environment variables

This React project is a simple #newsapp created to demonstrate the associated
risk of exposure with any sensitive information, like an API Key of a third-party
API, stored in React environment variables.

It has been built as part of a YouTube video that discusses the same and suggests a safer way for a React app to communicate with a third-party API. Here is the link if you are interested: [This is why sensitive information (like API Key) SHOULD NOT be added to React environment variables](https://youtu.be/40R9c0dctnE).

For demonstration purposes, the chosen third-party API is [News API](https://newsapi.org/). The app has React fron-end and Express.js back-end, where having a back-end is
the safer way to talk to third-party APIs using an API key for authenticating/authorizing requests.

## React Front-End

It has the components, NewsFeed, NewsFeedItem to make the request for data, be it
directly to News API end-point (unsafe way) or Express.js server end-point (safe way),
get the news data and display it.

The heavy lifting of making the request and extracting data is done by NewsFeed component and the NewsFeedItem component is purely presentational without anu managed state.

Also, committed code to NewsFeed component talks to Express.js server, which is the preferred way and the lines of code that directly make the request to News API (unsafe) have been commented out.

If you would like to try out the code do fork the repo and if you would like to know
which lines of code to comment and uncomment, do check out the referred YouTube video
at the top.

Below are the terminal commands to create a production build and start a front-end instance of the same:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `serve -s build`

Runs the app through the created production build.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Express Back-End

The express back-end has the code to set-up the Express server and handle requests from the React front-end in server.js. The server is set to listen for requests on port 3001 and required packages: axios (make requests to News API end-point), cors (enable cross-origin request handling), dotenv (extract News API key from environment variable) have been installed and imported.

Appropriate request handling logic has been implemented to send successful JSON news data response (status 200) to front-end, when request to News API succeeds and an unsuccessful JSON response (status 500) with an error message.

Below is the command to start the express server, whose start script is mapped in the package.json file:

### `npm start`

Runs the nodemon server on port 3001 of localhost - http://localhost:3001