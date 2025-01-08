import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type RoleModelType = DefaultSchemaUtilityType & {
  cMenu: {
    menu: mongoose.Types.ObjectId;
    access: {
      list: boolean;
      create: boolean;
      retrieve: boolean;
      update: boolean;
      delete: boolean;
    };
  }[];
};

const schema = new mongoose.Schema<RoleModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cMenu: {
    type: [{
      menu: { type: mongoose.Schema.Types.ObjectId, ref: "MenuModel", required: true },
      access: {
        list    : { type: Boolean, default: true, required: true },
        create  : { type: Boolean, default: true, required: true },
        retrieve: { type: Boolean, default: true, required: true },
        update  : { type: Boolean, default: true, required: true },
        delete  : { type: Boolean, default: true, required: true },
      }
    }],
    // required: true,
    // validate: {
    //   validator: function (value: any) {
    //     return value.length > 0; // Check if the array is not empty
    //   },
    //   message: 'cMenus must contain at least one item.' // Custom error message
    // }
  },
} as mongoose.SchemaDefinition<RoleModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const RoleModel = mongoose.model<RoleModelType>("RoleModel", schema);
