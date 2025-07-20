import type { Express } from "express";
import type { Server as HttpServer } from "http";
import { Server as SocketIoServer } from "socket.io";

export const useIo = (httpServer: HttpServer, api: Express): SocketIoServer => {
  const io = new SocketIoServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });
  // Attach the io instance to the app for use in routes or middleware
  api.set("io", io);
  return io;
};
