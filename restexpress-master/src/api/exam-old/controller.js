import Exam from "./model";
import {
  OK,
  NOT_FOUND,
  UNAUTHORIZED,
  NO_CONTENT,
  BAD_REQUEST,
  CREATED,
} from "http-status-codes";

import { errorHandler } from "../../services/response";

export const index = async (req, res, next) => {
  try {
    res.status(OK).json({ ok: "1" });
  } catch (error) {
    // errorHandler(res, error);
    res.status(BAD_REQUEST).json({ ok: "1" });
  }
};

export const show = async ({ params: { id }, method, user }, res, next) => {
  try {
    if (id) {
      const exam = await Exam.findById(id).populate("name");
      console.log(exam);
      if (!exam) {
        res
          .status(NOT_FOUND)
          .json({ valid: false, message: res.__("not-found") })
          .end();
      }
      res.status(OK).json(exam);
    } else {
      const exam = await Exam.find();
      res.status(OK).json(exam);
    }
  } catch (error) {}
};

export const create = async (req, res, next) => {
  console.log(req.body);
  try {
    const doc = await Exam.create({
      name: req.name,
      questionsById: req.questionsById,
    });
    res.status(CREATED).json(doc);
  } catch (error) {
    console.error("an error accurred");
    errorHandler(res, error);
  }
};
