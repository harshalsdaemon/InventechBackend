import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type BaseOneToOneModelType = DefaultSchemaUtilityType & {
  cBase: {};
};

const schema = new mongoose.Schema<BaseOneToOneModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cBase: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseModel' } ,

} as mongoose.SchemaDefinition<BaseOneToOneModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const BaseOneToOneModel = mongoose.model<BaseOneToOneModelType>("BaseOneToOneModel", schema);
