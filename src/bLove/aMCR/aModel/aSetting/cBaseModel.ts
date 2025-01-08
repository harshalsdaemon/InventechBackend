import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type BaseModelType = DefaultSchemaUtilityType & {
  cBaseOneToOne: {};
  cBaseOneToMany: {}[];
  cBaseManyToOne: {};
  cBaseManyToMany: {}[];
};

const schema = new mongoose.Schema<BaseModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cBaseOneToOne  :  { type: mongoose.Schema.Types.ObjectId, ref: 'BaseOneToOneModel',   unique: true } ,
  cBaseOneToMany : [{ type: mongoose.Schema.Types.ObjectId, ref: 'BaseOneToManyModel'                }],
  cBaseManyToOne :  { type: mongoose.Schema.Types.ObjectId, ref: 'BaseManyToOneModel'                } ,
  cBaseManyToMany: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BaseManyToManyModel'               }],

} as mongoose.SchemaDefinition<BaseModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const BaseModel = mongoose.model<BaseModelType>("BaseModel", schema);
