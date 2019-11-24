# drone-service

A company has a number of drones flying around the country. You have been tasked to build a system to track the location of every drone in real-time. The system's dashboard will only display the last location of the drones, so the backend doesn't need to worry about the history. You can store the state of the application in-memory for simplicity reasons.

Each drone should be associated with a unique identifier, and should report its geo-location coordinates to the central server in real-time through a cellular modem connection. Cellular modem connections are expensive, therefore you need to make sure the drones report back their location using as little data as possible. You are in charge of deciding the protocol and frequency that the drones will use to communicate with the backend. You are welcome to code a small drone simulation if that helps with testing, but its not mandatory.

The dashboard should be a simple web application displaying the list of active drones as a table, by their unique identifiers, along with their current speed. You should visually highlight the drones that have not been moving for more than 10 seconds (the drone sent updates, but didn't move more that 1 meter).

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
