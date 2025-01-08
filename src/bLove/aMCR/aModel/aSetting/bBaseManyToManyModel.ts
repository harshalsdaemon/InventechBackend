import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type BaseManyToManyModelType = DefaultSchemaUtilityType & {
  cBase: {}[];
};

const schema = new mongoose.Schema<BaseManyToManyModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cBase : [{ type: mongoose.Schema.Types.ObjectId, ref: 'BaseModel' }],

} as mongoose.SchemaDefinition<BaseManyToManyModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const BaseManyToManyModel = mongoose.model<BaseManyToManyModelType>("BaseManyToManyModel", schema);
