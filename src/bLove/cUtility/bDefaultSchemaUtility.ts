import mongoose from 'mongoose';
import timezone from 'moment-timezone';

export type DefaultSchemaUtilityType = mongoose.Document & {
  aImage?: object;
  aTitle?: string;
  aSubtitle?: string;
  aDescription?: string;
  aDetail?: string;
  aStatus: boolean;
  aSlug?: string;
  
  bCreatedAt: Date;
  bUpdatedAt?: Date;
  bCreatedBy?: mongoose.Types.ObjectId;
  bUpdatedBy?: mongoose.Types.ObjectId;
};

const schema = new mongoose.Schema<DefaultSchemaUtilityType>({
  aImage: { type: Object, trim: true },
  aTitle: { type: String, trim: true },
  aSubtitle: { type: String, trim: true },
  aDescription: { type: String, trim: true },
  aDetail: { type: String, trim: true },
  aStatus: { type: Boolean, default: true },
  aSlug: { type: String, trim: true },

  bCreatedAt: { type: Date, default: timezone(Date.now()).tz("Asia/Kolkata") },
  bUpdatedAt: { type: Date },
  bCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  bUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  // bCreatedBy: { type: String },
  // bUpdatedBy: { type: String }
})

export const DefaultSchemaUtility = mongoose.model<DefaultSchemaUtilityType>("DefaultSchemaUtility", schema);
