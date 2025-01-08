import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../../cUtility/bDefaultSchemaUtility';


export type OptionModelType = DefaultSchemaUtilityType & {
  cProduct: {};
  
  dWhatAreThose: {}[];
};

const schema = new mongoose.Schema<OptionModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' } ,
  
  dWhatAreThose: [{
    name: { type: String, required: true }, 
    values: [{ type: String, required: true }], 
  }],

} as mongoose.SchemaDefinition<OptionModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const OptionModel = mongoose.model<OptionModelType>("OptionModel", schema);
