import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
  }
};
