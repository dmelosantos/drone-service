# drone-service

A company has a number of drones flying around the country. You have been tasked to build a system to track the location of every drone in real-time. The system's dashboard will only display the last location of the drones, so the backend doesn't need to worry about the history. You can store the state of the application in-memory for simplicity reasons.

Each drone should be associated with a unique identifier, and should report its geo-location coordinates to the central server in real-time through a cellular modem connection. Cellular modem connections are expensive, therefore you need to make sure the drones report back their location using as little data as possible. You are in charge of deciding the protocol and frequency that the drones will use to communicate with the backend. You are welcome to code a small drone simulation if that helps with testing, but its not mandatory.

The dashboard should be a simple web application displaying the list of active drones as a table, by their unique identifiers, along with their current speed. You should visually highlight the drones that have not been moving for more than 10 seconds (the drone sent updates, but didn't move more that 1 meter).

# Project Decisions

This project mixtures two protocols:

## Drone Communication
For DRONE communication with the backend we use Sockets on UDP

This allows the communication with the backend to be simple, unreliable, but with less overhead

The data package of the drone should be really small, containing only it's ID|LATTITUDE|LONGITUDE values

The speed and if it is moving or not is calculate in realtime on the server

## Realtime UI

For the dashboard of the UI we use Socket.IO on TCP

We receive an UDP package on the server and emit an message on Socket.IO which then transmits it to the why

This allows us to have fast messaging from the UDP diagrams from the Drones to the UI

The UI is built on VUE-JS on a separate project, this project has a built vue project distributed under public/ folder

## Technology stack
-NodeJS 12 + Express + SocketIO + Dgram + VueJS

# Running the project

## Without docker

1. Install node
2. Go to the project root folder

```shell script
npm install
```

3. Execute

```shell script
npm run start
```

## With docker

Install Docker on your machine

Go to project root folder and run the following command:

```shell script
docker build -t drone-service
```

Then:

```shell script
docker run -p 3000:3000 -p 33333:33333 -d drone-service
```

### Accessing the UI

After the application is working access the browse: http://localhost:3000

### Drone Script

To simulate the drone with UDP use the script below:

```shell script
node scripts/droneClient.js "D5|-35.131288|-44.885727"
```

The UDP package should be:
[DRONE_ID]|[LATITUDE]|[LONGITUDE]

### TODO
1. Unit test
2. Integration test
3. E2E Test
4. Lint
5. CI integration
6. Add Redis for fast In-Memory Cache
7. Docker Compose with Redis
