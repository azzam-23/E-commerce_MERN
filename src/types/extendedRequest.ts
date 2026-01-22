import type { Request } from "express";

export interface ExtendRequset extends  Request {
  user?: any;
}
