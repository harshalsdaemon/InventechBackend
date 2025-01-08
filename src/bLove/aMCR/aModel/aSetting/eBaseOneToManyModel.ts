import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type BaseOneToManyModelType = DefaultSchemaUtilityType & {
  cBase: {};
};

const schema = new mongoose.Schema<BaseOneToManyModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cBase: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseModel' } ,

} as mongoose.SchemaDefinition<BaseOneToManyModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const BaseOneToManyModel = mongoose.model<BaseOneToManyModelType>("BaseOneToManyModel", schema);
