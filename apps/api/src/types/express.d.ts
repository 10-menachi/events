declare global {
  namespace Express {
    interface Request {
      requestId: string;
      log: typeof import("../lib/logger").default;
      auth: {
        userId: string;
        sessionId: string;
      };
    }
  }
}

export {};
