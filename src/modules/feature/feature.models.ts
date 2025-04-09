import { model, Model, Schema } from "mongoose";
import IFeatureInterfces from "./feature.interfaces";

const FeatureSchema = new Schema<IFeatureInterfces>({
  featureName: { type: String, default: null },
});

const Feature: Model<IFeatureInterfces> = model<IFeatureInterfces>("Feature", FeatureSchema);

export default Feature;
