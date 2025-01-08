import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type BaseManyToOneModelType = DefaultSchemaUtilityType & {
  cBase: {}[];
};

const schema = new mongoose.Schema<BaseManyToOneModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cBase: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BaseModel' }],

} as mongoose.SchemaDefinition<BaseManyToOneModelType>)

// Pre Validate
schema.pre("validate", function (next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const BaseManyToOneModel = mongoose.model<BaseManyToOneModelType>("BaseManyToOneModel", schema);
