import type { Request } from "express";
import type { Iuser } from "../models/userModels.ts";

export interface ExtendRequset extends Request {
  user?: Iuser | null;
}
