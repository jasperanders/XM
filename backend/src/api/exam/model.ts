import mongoose, { Schema } from "mongoose";
import { paginate, filter, ownership } from "../../services/mongoose";

const examSchema = new Schema({
  name: String,
  questionsById: Array,
});

examSchema.plugin(filter, { rules });
examSchema.plugin(paginate, { rules, populateRules: { author: userAcl } });
examSchema.plugin(ownership);

const model = mongoose.model("Exam", examSchema);
//model.swaggerSchema = m2s(model)
export const schema = model.schema;
export default model;
