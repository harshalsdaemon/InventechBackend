import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


const schema = new mongoose.Schema<DefaultSchemaUtilityType>({
  ...DefaultSchemaUtility.schema.obj,
})

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const MenuModel = mongoose.model<DefaultSchemaUtilityType>("MenuModel", schema);
