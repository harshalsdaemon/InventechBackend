import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../../cUtility/bDefaultSchemaUtility';


export type FactorModelType = DefaultSchemaUtilityType & {
  cBaseOneToOne: {};
  cBaseOneToMany: {}[];
  cBaseManyToOne: {};
  cBaseManyToMany: {}[];
};

const schema = new mongoose.Schema<FactorModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cBaseOneToOne  :  { type: mongoose.Schema.Types.ObjectId, ref: 'BaseOneToOneModel',   unique: true } ,
  cBaseOneToMany : [{ type: mongoose.Schema.Types.ObjectId, ref: 'BaseOneToManyModel'                }],
  cBaseManyToOne :  { type: mongoose.Schema.Types.ObjectId, ref: 'BaseManyToOneModel'                } ,
  cBaseManyToMany: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BaseManyToManyModel'               }],

} as mongoose.SchemaDefinition<FactorModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const FactorModel = mongoose.model<FactorModelType>("FactorModel", schema);
