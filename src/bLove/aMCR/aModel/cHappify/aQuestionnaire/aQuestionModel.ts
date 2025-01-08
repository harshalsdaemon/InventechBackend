import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../../cUtility/bDefaultSchemaUtility';


export type QuestionModelType = DefaultSchemaUtilityType & {
  cBaseOneToOne: {};
  cBaseOneToMany: {}[];
  cBaseManyToOne: {};
  cBaseManyToMany: {}[];
};

const schema = new mongoose.Schema<QuestionModelType>({
  ...DefaultSchemaUtility.schema.obj,

} as mongoose.SchemaDefinition<QuestionModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const QuestionModel = mongoose.model<QuestionModelType>("QuestionModel", schema);
