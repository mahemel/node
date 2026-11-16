import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routerHandler from "./routes/routes";
import config from "./config";

const port = config.port;

const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        routerHandler(req, res);
    },
);

server.listen(port, () => {
    console.log(`Server is running on port ${port} succesfully!!`);
});
